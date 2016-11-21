(function(window) {
    'use strict';

    if (typeof window.epepite == "undefined") {
        window.epepite = {};
    }

    if (typeof epepite.DatePicker == "undefined") {
        epepite.DatePicker = {};
    }

    epepite.DatePicker.DatePicker = function(config, calendar)
    {
        this.element  = null;
        this.calendar = calendar;
        this.input    = null;
        this.config   = {
            'input':    null,
            'locale':   ((navigator) && (navigator.language)) ? navigator.language : 'en',
            'format':   'DD/MM/YYYY',
            'min_date': null,
            'max_date': null,
            'template': 'material'
        };

        if (config) {
            for (var key in config) {
                if (this.config.hasOwnProperty(key)) {
                    this.config[key] = config[key];
                }
            }
        }

        this.input = (typeof this.config.input == "string") ? document.querySelector(this.config.input) : this.config.input;

        if (!this.input) {
            throw "Not found datepicker input";
        }

        this.render();
        this.bindEvents();
    };

    epepite.DatePicker.DatePicker.prototype.bindEvents = function()
    {
        this.input.addEventListener('focus', this.onFocus.bind(this));

        this.element.addEventListener('click', this.onOutside.bind(this));

        this.calendar.on(epepite.DatePicker.CONSTANTS.DATE_EVENT, this.onSelected.bind(this));
    };

    epepite.DatePicker.DatePicker.prototype.onFocus = function(event)
    {
        this.calendar.setDate(this.getDate());
        this.show();
    };

    epepite.DatePicker.DatePicker.prototype.onSelected = function(event)
    {
        this.setDate(event.detail.date);
        this.hide();

        var event = new CustomEvent(epepite.DatePicker.CONSTANTS.DATEPICKER_EVENT, {
            "detail" : {
                "date"   : this.getDate(),
                "text"   : moment(this.getDate()).format(this.config.format),
                "format" : this.config.format
            }
        });

        this.element.dispatchEvent(event);
    };

    epepite.DatePicker.DatePicker.prototype.onOutside = function(event)
    {
        if (event.target == this.element) {
            this.hide();
        }
    }

    epepite.DatePicker.DatePicker.prototype.show = function()
    {
        if (this.element) {
            this.element.classList.add(epepite.DatePicker.CONSTANTS.IS_VISIBLE);
        }
    };

    epepite.DatePicker.DatePicker.prototype.hide = function()
    {
        if (this.element) {
            this.element.classList.remove(epepite.DatePicker.CONSTANTS.IS_VISIBLE);
        }
    };

    epepite.DatePicker.DatePicker.prototype.render = function()
    {
        this.element = document.createElement('div');
        this.element.classList.add(epepite.DatePicker.CONSTANTS.DATEPICKER_WRAPPER_CLASS);

        var datepicker = document.createElement('div');
        datepicker.classList.add(epepite.DatePicker.CONSTANTS.DATEPICKER_CLASS);

        this.element.appendChild(datepicker);

        document.body.appendChild(this.element);

        this.calendar = new epepite.DatePicker.Calendar({
            'locale':    this.config.locale,
            'container': this.element.querySelector('.'+ epepite.DatePicker.CONSTANTS.DATEPICKER_CLASS),
            'date':      this.getDate(),
            'min_date':  this.config.min_date,
            'max_date':  this.config.max_date,
            'template':  this.config.template
        });
    };

    epepite.DatePicker.DatePicker.prototype.setDate = function(date)
    {
        this.input.value = moment(date).format(this.config.format);
        this.calendar.setDate(date);

        return this;
    };

    epepite.DatePicker.DatePicker.prototype.getDate = function()
    {
        var currentDate = null;

        if (this.input.value) {
            var dateMoment = moment(this.input.value, this.config.format);

            currentDate = dateMoment.isValid() ? dateMoment.toDate() : new Date();
        } else {
            currentDate = new Date();
        }

        return currentDate;
    };

    epepite.DatePicker.DatePicker.prototype.getElement = function()
    {
        return this.element;
    };

    epepite.DatePicker.DatePicker.prototype.on = function(event, handler)
    {
        return this.element.addEventListener(event, handler);
    };

})(window);
