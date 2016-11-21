(function() {
    'use strict';

    if (typeof epepite == "undefined") {
        window.epepite = {};
    }

    if (typeof epepite.DatePicker == "undefined") {
        epepite.DatePicker = {};
    }


    epepite.DatePicker.Booking = function(calendar, events)
    { 
        this.calendar  = calendar;
        this.events    = events;
        this.days      = new Map(),
        this.container = null;

        this.onDate      = null;
        this.onOpenDate  = null;
        this.onCloseDate = null;
    };


    epepite.DatePicker.Booking.prototype.hasEvent = function(date)
    {
        return this.days.has(date);
    };


})();
