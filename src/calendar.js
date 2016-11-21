(function(window) {
    'use strict';

    if (typeof window.epepite == "undefined") {
        window.epepite = {};
    }

    if (typeof epepite.DatePicker == "undefined") {
        epepite.DatePicker = {};
    }

    epepite.DatePicker.Calendar = function(config, translator, templating, unavailabilities)
    {
        this.date       = null;
        this.oldDate    = null;
        this.cursorDate = null;
        this.container  = null;
        this.element    = null;
        this.templating = templating;
        this.translator = translator;
        this.events     = new Map();
        this.config     = {
            'container' : null,
            'locale'    : ((navigator) && (navigator.language)) ? navigator.language : 'en',
            'date'      : null,
            'min_date'  : null,
            'max_date'  : null,
            'format'    : 'dd/mm/YY',
            'template'  : 'material',
            'show'      : true
        };

        if (config) {
            for (var key in config) {
                if (this.config.hasOwnProperty(key)) {
                    this.config[key] = config[key];
                }
            }
        }

        if (this.config.date) {
            if (!(this.config.date instanceof Date)) {
                this.date = new Date(this.config.date);
            } else {
                this.date = this.config.date;
            }
        } else {
            this.date = new Date();
        }

        this.cursorDate = new Date(this.date.getTime());
        this.container  = (typeof this.config.container == "string") ? document.querySelector(this.config.container) : this.config.container;
        this.templating = templating || new epepite.DatePicker.Template();
        this.translator = translator || new epepite.DatePicker.Translator();

        this.translator.setCurrentLocale(this.config.locale);

        if (!this.container) {
            throw "Not found withouth datepicker container element \""+ this.config.container +"\"";
        }

        if (typeof epepite.DatePicker.TEMPLATES[this.config.template] == "undefined") {
            throw "Undefined template \""+ this.config.template +"\"";
        }

        this.renderElement();

        if (this.config.show) {
            this.show();
        }

        this.dispatch('load');
    };

    epepite.DatePicker.Calendar.prototype.show = function()
    {
        if (this.element) {
            this.element.classList.add(epepite.DatePicker.CONSTANTS.IS_VISIBLE);
        }

        this.dispatch('show');
    };

    epepite.DatePicker.Calendar.prototype.hide = function()
    {
        if (this.element) {
            this.element.classList.remove(epepite.DatePicker.CONSTANTS.IS_VISIBLE);
        }

        this.dispatch('hide');
    };

    epepite.DatePicker.Calendar.prototype.isVisible = function()
    {
        return (this.element) ? this.element.classList.contains(epepite.DatePicker.CONSTANTS.IS_VISIBLE) : false;
    };

    epepite.DatePicker.Calendar.prototype.refresh = function()
    {
        this.renderMetadata();

        if (!(this.oldDate) || (this.cursorDate.getFullYear() != this.oldDate.getFullYear()) || (this.cursorDate.getMonth() != this.oldDate.getMonth())) {
            var constants = epepite.DatePicker.CONSTANTS;

            this.renderGridMonth();
            this.oldDate = new Date(this.cursorDate.getTime());

            if (this.config.min_date) {
                if (this.cursorDate.getFullYear() <= this.config.min_date.getFullYear()) {
                    this.element.querySelector('.'+ constants.YEAR_PREV_CLASS).classList.remove(constants.IS_VISIBLE);

                    if (this.cursorDate.getMonth() <= this.config.min_date.getMonth()) {
                        this.element.querySelector('.'+ constants.MONTH_PREV_CLASS).classList.remove(constants.IS_VISIBLE);
                    } else {
                        this.element.querySelector('.'+ constants.MONTH_PREV_CLASS).classList.add(constants.IS_VISIBLE);
                    }
                } else {
                    this.element.querySelector('.'+ constants.YEAR_PREV_CLASS).classList.add(constants.IS_VISIBLE);
                }
            }

            if (this.config.max_date) {
                if (this.cursorDate.getFullYear() >= this.config.max_date.getFullYear()) {
                    this.element.querySelector('.'+ constants.YEAR_NEXT_CLASS).classList.remove(constants.IS_VISIBLE);

                    if (this.cursorDate.getMonth() >= this.config.max_date.getMonth()) {
                        this.element.querySelector('.'+ constants.MONTH_NEXT_CLASS).classList.remove(constants.IS_VISIBLE);
                    } else {
                        this.element.querySelector('.'+ constants.MONTH_NEXT_CLASS).classList.add(constants.IS_VISIBLE);
                    }
                } else {
                    this.element.querySelector('.'+ constants.YEAR_NEXT_CLASS).classList.add(constants.IS_VISIBLE);
                }
            }
        }
    };

    epepite.DatePicker.Calendar.prototype.bindEvents = function()
    {
        var prevYear  = this.selectNotUpgraded('.'+ epepite.DatePicker.CONSTANTS.YEAR_PREV_CLASS),
            nextYear  = this.selectNotUpgraded('.'+ epepite.DatePicker.CONSTANTS.YEAR_NEXT_CLASS),
            prevMonth = this.selectNotUpgraded('.'+ epepite.DatePicker.CONSTANTS.MONTH_PREV_CLASS),
            nextMonth = this.selectNotUpgraded('.'+ epepite.DatePicker.CONSTANTS.MONTH_NEXT_CLASS),
            days      = this.selectNotUpgraded('.'+ epepite.DatePicker.CONSTANTS.DAY_CLASS +':not(.'+ epepite.DatePicker.CONSTANTS.IS_DISABLED +')')
        ;

        // Create all dispatcher nodes
        this.createDispatchers(prevYear, epepite.DatePicker.CONSTANTS.YEAR_PREV_EVENT);
        this.createDispatchers(nextYear, epepite.DatePicker.CONSTANTS.YEAR_NEXT_EVENT);
        this.createDispatchers(prevMonth, epepite.DatePicker.CONSTANTS.MONTH_PREV_EVENT);
        this.createDispatchers(nextMonth, epepite.DatePicker.CONSTANTS.MONTH_NEXT_EVENT);
        this.createDispatchers(days, epepite.DatePicker.CONSTANTS.DAY_EVENT);
    };

    epepite.DatePicker.Calendar.prototype.createDispatchers = function(nodes, eventName)
    {
        var self = this;

        for (var i = 0; i < nodes.length; i++) {
            nodes[i].addEventListener('click', function(event) {
                self.dispatch(eventName, {"node": this});
            });

            nodes[i].classList.add(epepite.DatePicker.CONSTANTS.IS_UPGRADED);
        }
    };

    epepite.DatePicker.Calendar.prototype.refreshEvents = function()
    {

    };

    epepite.DatePicker.Calendar.prototype.onPrevYear = function(event)
    {
        this.cursorDate.setFullYear(this.cursorDate.getFullYear() - 1);
        this.refresh();
    };

    epepite.DatePicker.Calendar.prototype.onNextYear = function(event)
    {
        this.cursorDate.setFullYear(this.cursorDate.getFullYear() + 1);
        this.refresh();
    };

    epepite.DatePicker.Calendar.prototype.onPrevMonth = function(event)
    {
        this.cursorDate.setMonth(this.cursorDate.getMonth() - 1);
        this.refresh();
    };

    epepite.DatePicker.Calendar.prototype.onNextMonth = function(event)
    {
        this.cursorDate.setMonth(this.cursorDate.getMonth() + 1);
        this.refresh();
    };

    epepite.DatePicker.Calendar.prototype.onSelectDay = function(event)
    {
        var constants    = epepite.DatePicker.CONSTANTS,
            node         = event.detail.node,
            selectedDays = this.element.querySelectorAll('.'+ constants.DAY_CONTAINER_CLASS +' .'+ constants.DAY_CLASS);

        for (var i = 0; i < selectedDays.length; i++) {
            selectedDays[i].classList.remove(epepite.DatePicker.CONSTANTS.IS_SELECTED);
        }

        node.classList.add(epepite.DatePicker.CONSTANTS.IS_SELECTED);
        this.cursorDate.setDate(node.dataset.day);
        this.date = new Date(this.cursorDate.getFullYear(), this.cursorDate.getMonth(), node.dataset.day);

        this.refresh();

        this.dispatch(epepite.DatePicker.CONSTANTS.DATE_EVENT, {
            "node" : event.detail.node,
            "date" : this.date,
            "day"  : node.dataset.day
        });
    };

    epepite.DatePicker.Calendar.prototype.renderElement = function()
    {
        if (!this.element) {
            this.element = document.createElement('div');
            this.element.classList.add(epepite.DatePicker.CONSTANTS.CALENDAR_CLASS);

            var template = this.templating.load(this.config.template);

            this.element.innerHTML = template;
            this.container.appendChild(this.element);

            // Listen all events
            this.element.addEventListener(epepite.DatePicker.CONSTANTS.YEAR_PREV_EVENT, this.onPrevYear.bind(this));
            this.element.addEventListener(epepite.DatePicker.CONSTANTS.YEAR_NEXT_EVENT, this.onNextYear.bind(this));
            this.element.addEventListener(epepite.DatePicker.CONSTANTS.MONTH_PREV_EVENT, this.onPrevMonth.bind(this));
            this.element.addEventListener(epepite.DatePicker.CONSTANTS.MONTH_NEXT_EVENT, this.onNextMonth.bind(this));
            this.element.addEventListener(epepite.DatePicker.CONSTANTS.DAY_EVENT, this.onSelectDay.bind(this));

            this.refresh();

            this.element.classList.add(epepite.DatePicker.CONSTANTS.IS_UPGRADED);
            this.dispatch('upgraded');
        }
    };

    epepite.DatePicker.Calendar.prototype.renderMetadata = function()
    {
        var constants = epepite.DatePicker.CONSTANTS;

        var fullDates    = this.element.querySelectorAll('.'+ constants.TEXT_DATE_CLASS),
            years        = this.element.querySelectorAll('.'+ constants.YEAR_CLASS),
            months       = this.element.querySelectorAll('.'+ constants.MONTH_CLASS),
            transDay     = this.translator.trans('days'),
            transMonths  = this.translator.trans('months')
        ;

        var dayText   = transDay[this.date.getDay()];
        var monthText = transMonths[this.cursorDate.getMonth()];
        var fullDate  = this.formatDate(this.date);

        for (var i = 0; i < fullDates.length; i++) {
            fullDates[i].innerHTML = fullDate;
        }

        for (var i = 0; i < years.length; i++) {
            years[i].innerHTML = this.cursorDate.getFullYear();
        }

        for (var i = 0; i < months.length; i++) {
            months[i].innerHTML = monthText;
        }
    };

    epepite.DatePicker.Calendar.prototype.renderGridMonth = function()
    {
        var container = this.element.querySelector('.'+ epepite.DatePicker.CONSTANTS.DAY_CONTAINER_CLASS);

        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }

        this.renderPreviousMonth(this.cursorDate, container);
        this.renderCurrentMonth(this.cursorDate, container);
        this.renderNextMonth(this.cursorDate, container);
        this.bindEvents();
    };

    epepite.DatePicker.Calendar.prototype.renderPreviousMonth = function(date, container)
    {
        var month     = new Date(date.getFullYear(), date.getMonth(), 1),
            dayNumber = (month.getDay() == 0 ? 7 : month.getDay()) - 1
        ;

        if (dayNumber > 1) {
            var prevMonth     = new Date(month.getFullYear(), month.getMonth(), -Math.abs(dayNumber) + 1),
                prevMonthLast = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0),
                dayDate       = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonth.getDate())
        ;

            for (var i = prevMonth.getDate(); i <= prevMonthLast.getDate(); i++) {
                dayDate.setDate(i);
                this.getContainerDay(container).appendChild(this.renderDay(dayDate, false, true));
            }
        }
    };

    epepite.DatePicker.Calendar.prototype.renderCurrentMonth = function(date, container)
    {
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
            dayDate = new Date(date.getFullYear(), date.getMonth(), 1)
        ;

        for (var i = 1; i <= lastDay; i++) {
            dayDate.setDate(i);

            this.getContainerDay(container).appendChild(this.renderDay(dayDate));
        }
    };

    epepite.DatePicker.Calendar.prototype.renderNextMonth = function(date, container)
    {
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        if (lastDay.getDay() > 0) {
            var month     = new Date(date.getFullYear(), date.getMonth() + 1, 1),
                dayDate   = new Date(month.getFullYear(), month.getMonth(), 1),
                dayNumber = (month.getDay() == 0 ? 7 : month.getDay()) - 1
            ;


            var dayNumber = (month.getDay() == 0 ? 7 : month.getDay()) - 1;

            for (var i = 1; i <= (7 - dayNumber); i++) {
                dayDate.setDate(i);
                this.getContainerDay(container).appendChild(this.renderDay(dayDate));
            }
        }
    };

    epepite.DatePicker.Calendar.prototype.renderDay = function(date)
    {
        var element = document.createElement('button'),
            today   = new Date()
        ;

        element.innerHTML   = this.formatNumber(date.getDate());
        element.dataset.day = date.getDate();
        element.dataset.id  = this.renderDayId(date);
        element.classList.add(epepite.DatePicker.CONSTANTS.WEEK_ITEM_CLASS);
        element.classList.add(epepite.DatePicker.CONSTANTS.DAY_CLASS);

        if (date.toDateString() == this.date.toDateString()) {
            element.classList.add(epepite.DatePicker.CONSTANTS.IS_SELECTED);
        }

        if (date.toDateString() == today.toDateString()) {
            element.classList.add(epepite.DatePicker.CONSTANTS.DAY_TODAY_CLASS);
        }

        if (date.getMonth() != this.cursorDate.getMonth()) {
            element.setAttribute('disable', 'disable');
            element.classList.add(epepite.DatePicker.CONSTANTS.IS_DISABLED);
        }

        if (this.config.min_date) {
            if (date < this.config.min_date) {
                element.setAttribute('disable', 'disable');
                element.classList.add(epepite.DatePicker.CONSTANTS.IS_DISABLED);
            }
        }

        if (this.config.max_date) {
            if (date > this.config.max_date) {
                element.setAttribute('disable', 'disable');
                element.classList.add(epepite.DatePicker.CONSTANTS.IS_DISABLED);
            }
        }

        return element;
    };

    epepite.DatePicker.Calendar.prototype.renderDayId = function(date)
    {
        return date.getFullYear() +'-'+ this.formatNumber(date.getMonth() + 1) +'-'+ this.formatNumber(date.getDate());
    };

    epepite.DatePicker.Calendar.prototype.getContainerDay = function(daysContainer)
    {
        var container = daysContainer.querySelector('.'+ epepite.DatePicker.CONSTANTS.WEEK_CLASS +':last-child');

        if (!container) {
            container = document.createElement('div');
            container.classList.add(epepite.DatePicker.CONSTANTS.WEEK_CLASS);

            daysContainer.appendChild(container);
        } else {
            var days = container.querySelectorAll('.'+ epepite.DatePicker.CONSTANTS.DAY_CLASS);

            if ((days) && (days.length >= 7)) {
                container = document.createElement('div');
                container.classList.add(epepite.DatePicker.CONSTANTS.WEEK_CLASS);

                daysContainer.appendChild(container);
            }
        }

        return container;
    };

    epepite.DatePicker.Calendar.prototype.dispatch = function(name, detail)
    {
        if (this.element) {
            this.element.dispatchEvent(new CustomEvent(name, {'detail': detail}));
        }
    };

    epepite.DatePicker.Calendar.prototype.on = function(event, handler)
    {
        if (this.element) {
            return this.element.addEventListener(event, handler);
        }

        return null;
    };

    epepite.DatePicker.Calendar.prototype.selectNotUpgraded = function(selector)
    {
        return this.element.querySelectorAll(selector +':not(.'+ epepite.DatePicker.CONSTANTS.IS_UPGRADED +')')
    };

    epepite.DatePicker.Calendar.prototype.formatDate = function(date)
    {
        var transDay    = this.translator.trans('days'),
            transMonths = this.translator.trans('months'),
            dayText     = transDay[this.date.getDay()],
            monthText   = transMonths[this.date.getMonth()]
        ;

        return dayText +' '+ this.formatNumber(this.date.getDate()) +' '+ monthText;
    };

    epepite.DatePicker.Calendar.prototype.formatNumber = function(number)
    {
        return (parseInt(number) < 10) ? '0'+ number : number;
    };

    epepite.DatePicker.Calendar.prototype.getElement = function()
    {
        return this.element;
    };

    epepite.DatePicker.Calendar.prototype.getDate = function()
    {
        return this.date;
    };

    epepite.DatePicker.Calendar.prototype.setDate = function(date)
    {
        if (!(date instanceof Date)) {
            throw '[InvalidArgument] Calendar.setDate(Date date) must be an instance of Date';
        }

        this.date        = date;
        this.currentDate = date;
        this.refresh();

        return this;
    };

    epepite.DatePicker.Calendar.prototype.setEvents = function(events)
    {
        this.events = new Map();

        for (var key in events) {
            if (events.hasOwnProperty(key)) {
                this.events.set(events[key].date, events[key]);
            }
        }

        return this;
    };

    epepite.DatePicker.Calendar.prototype.addEvent = function(event)
    {
        this.events.set(event.date, event);

        return this;
    };

    epepite.DatePicker.Calendar.prototype.clearEvents = function()
    {

    };

})(window);
