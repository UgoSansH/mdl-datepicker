(function(window) {
    'use strict';

    if (typeof window.epepite == "undefined") {
        window.epepite = {};
    }

    if (typeof epepite.DatePicker == "undefined") {
        epepite.DatePicker = {};
    }

    if (typeof epepite.DatePicker.Translations == "undefined") {
        epepite.DatePicker.Translations = {};
    }

    epepite.DatePicker.Translations.en = {
        'close' : 'Close',
        'day'   : 'Day',
        'month' : 'Month',
        'header': {
            'year_next' : 'Next year',
            'year_prev' : 'Previous year %year%'
        },
        'days' : [
            'Sunday',
            'Monday',
            'Thuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        'months': [
            'January',
             'February',
             'March',
             'April',
             'May',
             'June',
             'July',
             'August',
             'September',
             'October',
             'November',
             'December'
        ]
    };

})(window);
