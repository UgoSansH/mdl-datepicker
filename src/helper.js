(function() {
    'use strict';

    if (typeof epepite == "undefined") {
        window.epepite = {};
    }

    if (typeof epepite.DatePicker == "undefined") {
        epepite.DatePicker = {};
    }

    epepite.DatePicker.Helper = {

        dateSplit: function(date)
        {
            if (!this.isValidDate(date)) {
                throw "Invalid date format. expected YYYY-mm-dd";
            }

            var info = date.split('-');

            return {
                year:  parseInt(info[0]),
                month: parseInt(info[1]),
                day:   parseInt(info[2])
            };
        },

        dateSplitFromString: function(date)
        {
            return ''+ date.year +'-'+ (date.month < 10 ? '0' : '') + date.month +'-'+ (date.day < 10 ? '0' : '') + date.day;
        },

        hourSplit: function(hour)
        {
            if (!(this.isValidHour(hour))) {
                throw "Invalid hour format. expected HH:ii";
            }

            var info = hour.split(':');

            return {
                hour: parseInt(info[0]),
                min:  parseInt(info[1])
            };
        },

        hourSplitFromString: function(hour)
        {
            return ''+ (hour.hour < 10 ? '0' : '') + hour.hour +':'+ (hour.min < 10 ? '0' : '') + hour.min;
        },

        isValidDate: function(date)
        {
            return date.match(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/);
        },

        isValidHour: function(hour)
        {
            return hour.match(/[0-9]{2}:[0-9]{2}/);
        },

        dateFromString: function(date)
        {
            if (!this.isValidDate(date)) {
                throw "Invalid date format. expected YYYY-mm-dd";
            }

            var info = this.dateSplit(date);

            return new Date(info.year, info.month - 1, info.day, 0, 0, 0);
        },

        isHourUpper : function(hourBase, hour)
        {
            if (!(this.isValidHour(hourBase)) || !(this.isValidHour(hour))) {
                throw "Invalid hour format. expected HH:ii";
            }

            var infoBase = this.hourSplit(hourBase),
                info     = this.hourSplit(hour)
            ;

            if (info.hour > infoBase.hour) {
                return true;
            } else if (info.hour == infoBase.hour) {
                return (info.min > infoBase.min);
            }

            return false;
        },

        isHourLower : function(hourBase, hour)
        {
            if (!(this.isValidHour(hourBase)) || !(this.isValidHour(hour))) {
                throw "Invalid hour format. expected HH:ii";
            }

            var infoBase = this.hourSplit(hourBase),
                info     = this.hourSplit(hour)
            ;

            if (info.hour < infoBase.hour) {
                return true;
            } else if (info.hour == infoBase.hour) {
                return (info.min < infoBase.min);
            }

            return false;
        },

        isHourUpperOrEqual : function(hourBase, hour)
        {
            if (!(this.isValidHour(hourBase)) || !(this.isValidHour(hour))) {
                throw "Invalid hour format. expected HH:ii";
            }

            var infoBase = this.hourSplit(hourBase),
                info     = this.hourSplit(hour)
            ;

            if (info.hour > infoBase.hour) {
                return true;
            } else if (info.hour == infoBase.hour) {
                return (info.min >= infoBase.min);
            }

            return false;
        },

        isHourLowerOrEqual : function(hourBase, hour)
        {
            if (!(this.isValidHour(hourBase)) || !(this.isValidHour(hour))) {
                throw "Invalid hour format. expected HH:ii";
            }

            var infoBase = this.hourSplit(hourBase),
                info     = this.hourSplit(hour)
            ;

            if (info.hour < infoBase.hour) {
                return true;
            } else if (info.hour == infoBase.hour) {
                return (info.min <= infoBase.min);
            }

            return false;
        },

        getMinDuration: function(start, end, travel)
        {

            var minStart = this.getHourToMin(start),
                minEnd

            var duration = this.getHourToMin(end) - this.getHourToMin(start);

            if (travel) {
                duration += this.getHourToMin(travel);
            }

            return duration;
        },

        getHourDuration: function(start, end, travel)
        {
            var duration = this.getMinDuration(start, end, travel);

            return {
                hour: Math.floor(duration / 60),
                min: duration % 60
            };
        },

        getHourToMin: function(hour)
        {
            return (hour.hour * 60) + hour.min;
        },

        getHourStart: function(start, travel)
        {
            if (travel) {
                var duration = this.getHourToMin(start) - this.getHourToMin(travel);

                return {
                    hour: Math.floor(duration / 60),
                    min: duration % 60
                };
            }

            return start;
        }

    };


})();
