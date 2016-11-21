(function() {
    'use strict';

    if (typeof epepite == "undefined") {
        window.epepite = {};
    }

    if (typeof epepite.DatePicker == "undefined") {
        epepite.DatePicker = {};
    }

    epepite.DatePicker.BookingDay = function(container, date, booking, translator)
    {
        this.container  = container;
        this.date       = null;
        this.booking    = booking;
        this.translator = translator || new epepite.DatePicker.Translator();
        this.helper     = epepite.DatePicker.Helper;
        this.element    = null;
        this.listeners  = new Array();
        this.config     = {
            height_interval: 30,
            grid_start:      "00:00",
            grid_end:        "23:30",
            icon_close:      "close",
            merge_travel:    true,
            title:           "Disponibilités",
            material_icons:  true
        };

        this.onSelectHour = null;

        if (typeof date == "string") {
            this.date = this.helper.dateFromString(date);
        } else {
            this.date = date;
        }

        this.render();
    };


    epepite.DatePicker.BookingDay.prototype.CssClasses_ = {
        CONTAINER:       'mdl-calendar__booking',
        HEADER:          'mdl-calendar__booking-header',
        HEADER_TITLE:    'mdl-calendar__booking-header-title',
        BTN_CLOSE:       'mdl-calendar__booking-close',
        GRID:            'mdl-calendar__booking-grid',
        GRID_ITEM:       'booking-grid__item',
        SELECTABLE_ITEM: 'booking-grid__item-selectable',
        HOUR_ITEM:       'booking-grid__item-hour',
        GRID_ITEM_HOUR:  'booking-grid__item--hour',
        GRID_ITEM_HALF:  'booking-grid__item--half-hour',
        EVENTS:          'mdl-calendar__booking-events',
        EVENT:           'mdl-calendar__booking-event',
        EVENT_TRAVEL:    'mdl-calendar__booking-event--travel',
        EVENT_TITLE:     'mdl-calendar__booking-event-title',
        BUTTON:          "mdl-button",
        BUTTON_COLORED:  "mdl-button--colored",
        ICON:            "material-icons",

        IS_VISIBLE:      "is-visible"
    };


    epepite.DatePicker.BookingDay.prototype.open = function()
    {
        if (this.element) {
            this.element.classList.add(this.CssClasses_.IS_VISIBLE);
        }
    };


    epepite.DatePicker.BookingDay.prototype.close = function()
    {
        if (this.element) {
            this.element.classList.remove(this.CssClasses_.IS_VISIBLE);
        }
    };


    epepite.DatePicker.BookingDay.prototype.render = function()
    {
        if (!this.element) {
            if (this.booking) {
                this.element = document.createElement('div');

                var header   = document.createElement('div'),
                    title = document.createElement('h4'),
                    events   = document.createElement('div'),
                    grid     = this.renderGrid(),
                    bookings = this.renderBookings()
                ;

                this.element.classList.add(this.CssClasses_.CONTAINER);

                header.classList.add(this.CssClasses_.HEADER);
                events.classList.add(this.CssClasses_.EVENTS);

                title.classList.add(this.CssClasses_.HEADER_TITLE);
                title.appendChild(document.createTextNode(this.config.title));

                header.appendChild(title);

                this.element.appendChild(header);
                this.element.appendChild(grid);

                if (bookings) {
                    this.element.appendChild(bookings);
                }

                this.container.appendChild(this.element);
            }
        }
    };


    epepite.DatePicker.BookingDay.prototype.renderGrid = function()
    {
        var hourStart = {hour: 0, min: 0},
            hourEnd   = {hour: 23, min: 30}
        ;

        if (this.booking) {
            hourStart = this.helper.hourSplit(this.booking.hours.start);
            hourEnd   = this.helper.hourSplit(this.booking.hours.end);

            if (hourEnd.hour == 0) {
                hourEnd.hour = 23;

                if (hourEnd.min == 0) {
                    hourEnd.min = 30;
                }
            }
        }

        var start   = Math.abs(hourStart.hour * 2),
            length  = start + ((hourEnd.hour - hourStart.hour) * 2) + ((hourStart.min > 0) ? 1 : 0),
            grid    = document.createElement('div'),
            handler = this.dispatch.bind(this)
        ;

        for (var i = start; i <= length; i++) {
            var hourItem = {
                hour: hourStart.hour + ((i % 2 == 0) ? (i / 2) : (Math.round(i / 2)- 1)),
                min:  (i % 2 == 0) ? 0 : 30
            };

            var item       = document.createElement('div'),
                selectable = document.createElement('div'),
                hour       = document.createElement('div'),
                hourItem   = {
                    hour: (i % 2 == 0) ? (i / 2) : (Math.round(i / 2) - 1),
                    min: (i % 2 == 0) ? 0 : 30
                }
            ;

            hour.classList.add(this.CssClasses_.HOUR_ITEM);
            hour.appendChild(document.createTextNode(this.helper.hourSplitFromString(hourItem)));

            selectable.classList.add(this.CssClasses_.SELECTABLE_ITEM);
            selectable.dataset.datetime = this.booking.date + 'T'+ this.helper.hourSplitFromString(hourItem);

            item.classList.add(this.CssClasses_.GRID_ITEM);

            if (hourItem.min > 0) {
                item.classList.add(this.CssClasses_.GRID_ITEM_HALF);
            } else {
                item.classList.add(this.CssClasses_.GRID_ITEM_HOUR);
            }

            item.appendChild(hour);
            item.appendChild(selectable);

            grid.classList.add(this.CssClasses_.GRID);
            grid.appendChild(item);

            selectable.addEventListener('click', handler);
        }

        return grid;
    };


    epepite.DatePicker.BookingDay.prototype.renderBookings = function()
    {
        if ((this.booking)) {
            var container = document.createElement('div');

            if (this.booking.events) {
                for (var i = 0; i < this.booking.events.length; i++) {
                    var entity     = this.booking.events[i];

                    this.renderEvent(this.booking.events[i], container);
                }
            }

            container.classList.add(this.CssClasses_.EVENTS);

            return container;
        }

        return null;
    };


    epepite.DatePicker.BookingDay.prototype.renderEvent = function(entity, container)
    {
        var hourStart  = this.helper.hourSplit(entity.start),
            hourEnd    = this.helper.hourSplit(entity.end),
            hourTravel = this.helper.hourSplit(entity.travel_time)
        ;

        if (this.config.merge_travel) {
            // merge travel and create event entity
            container.appendChild(this.renderBooking(hourStart, hourEnd, entity, hourTravel));
        } else {
            // create travel entity + event entity + travel entity
            container.appendChild(this.renderTravel(hourStart, hourEnd, entity));
            container.appendChild(this.renderBooking(hourStart, hourEnd, entity));
            container.appendChild(this.renderTravel(hourStart, hourEnd, entity));

        }
    };


    epepite.DatePicker.BookingDay.prototype.renderBooking = function(start, end, entity, travel)
    {
        var element      = document.createElement('div'),
            titleElement = document.createElement('div'),
            position     = this.getBookingPosition(start, end, travel)
        ;

        if (travel) {
            this.helper.getHourStart(start, travel);
        }

        titleElement.classList.add(this.CssClasses_.EVENT_TITLE);
        titleElement.appendChild(document.createTextNode(entity.title));

        element.appendChild(titleElement);
        element.classList.add(this.CssClasses_.EVENT);
        element.dataset.event = entity.id;
        element.style.top     = ''+ position.top +'px';
        element.style.height  = ''+ position.height +'px';

        return element;
    };


    epepite.DatePicker.BookingDay.prototype.renderTravel = function(start, end, entity)
    {
        entity.title = this.translator.trans('travel_time');

        var element = this.renderBooking(start, end, entity);

        element.classList.add(this.CssClasses_.EVENT_TRAVEL);

        return element;
    };


    epepite.DatePicker.BookingDay.prototype.addEvent = function(event)
    {
        this.booking.events.push(event);

        var container = this.container.querySelector('.'+ this.CssClasses_.EVENTS);

        this.renderEvent(event, container);

        return this;
    };


    epepite.DatePicker.BookingDay.prototype.removeEvent = function(id)
    {
        if ((this.booking) && (this.booking.events)) {
            var key = this.findEventKey(id);

            if (key !== null) {
                this.booking.events.slice(key, 1);
            }
        }

        if (this.container) {
            var bookings = this.container.querySelector('.'+ this.CssClasses_.EVENTS);

            if (bookings) {
                var booking = bookings.querySelector('.'+ this.CssClasses_.EVENT +'[data-event="'+ id +'"]');

                if (booking) {
                    booking.parentNode.removeChild(booking);
                }
            }
        }

    };


    epepite.DatePicker.BookingDay.prototype.hasEvent = function(time)
    {
        var timeMin = this.helper.getHourToMin(time);

        if ((this.booking) && (this.booking.events)) {
            for (var i = 0; i < this.booking.events.length; i++) {
                var bookingMinStart = this.helper.getHourToMin(this.booking.events[i].start),
                    bookingMinEnd   = this.helper.getHourToMin(this.booking.events[i].end)
                ;

                if ((bookingMinStart >= timeMin) && (bookingMinEnd <= timeMin)) {
                    return true;
                }
            }
        }

        return false;
    };


    epepite.DatePicker.BookingDay.prototype.length = function()
    {
        return ((this.booking) && (this.booking.events)) ? this.booking.events.length : 0;
    };


    epepite.DatePicker.BookingDay.prototype.isAvailable = function()
    {
        return this.booking.available;
    };


    epepite.DatePicker.BookingDay.prototype.findEventKey = function(id)
    {
        if ((this.booking) && (this.booking.events)) {
            for (var i = 0; i < this.booking.events.length; i++) {
                if (this.booking.events[i].id == id) {
                    return i;
                }
            }
        }

        return null;
    };


    epepite.DatePicker.BookingDay.prototype.getBookingPosition = function(start, end, travel)
    {
        if (travel) {
            start = this.helper.getHourStart(start, travel);
        }

        var gridStart      = this.helper.getHourToMin(this.helper.hourSplit(this.booking.hours.start));
        var minStart       = this.helper.getHourToMin(start);
        var heightInterval = this.config.height_interval / 30;
        var minDuration    = this.helper.getMinDuration(start, end, travel);

        return {
            top:    (minStart * heightInterval) - (gridStart * heightInterval),
            height: (minDuration * heightInterval)
        };
    };

    epepite.DatePicker.BookingDay.prototype.dispatch = function(event)
    {
        var date = event.target.dataset.datetime;

        for (var i = 0; i < this.listeners.length; i++) {
            var callback = this.listeners[i];

            callback(date);
        }

    };

    epepite.DatePicker.BookingDay.prototype.onChange = function(listener)
    {
        this.listeners.push(listener);
    };

})();
