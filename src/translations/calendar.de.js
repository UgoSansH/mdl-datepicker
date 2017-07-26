(function(window) {
    'use strict';

    if ('undefined' === typeof window.epepite) {
        window.epepite = {};
    }

    if ('undefined' === typeof epepite.DatePicker) {
        epepite.DatePicker = {};
    }

    if ('undefined' === typeof epepite.DatePicker.Translations) {
        epepite.DatePicker.Translations = {};
    }

    epepite.DatePicker.Translations.de = {
        'close': 'Schließen',
        'day': 'Tag',
        'month': 'Monat',
        'header': {
            'year_next': 'Nächstens Jahr',
            'year_prev': 'Vorheriges Jahr %year%'
        },
        'days': [
            'Sonntag',
            'Montag',
            'Dienstag',
            'Mittwoch',
            'Donnerstag',
            'Freitag',
            'Samstag'
        ],
        'months': [
            'Januar',
            'Februar',
            'März',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'Dezember'
        ]
    };

})(window);
