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

    epepite.DatePicker.Translations.pl = {
        'close' : 'Zamknij',
        'day'   : 'Dzień',
        'month' : 'Miesiąc',
        'header': {
            'year_next' : 'Następny rok',
            'year_prev' : 'Poprzedni rok %year%'
        },
        'days' : [
            'niedziela',
            'poniedziałek',
            'wtorek',
            'środa',
            'czwartek',
            'piątek',
            'sobota'
        ],
        'months': [
            'styczeń',
            'luty',
            'marzec',
            'kwiecień',
            'maj',
            'czerwiec',
            'lipiec',
            'sierpień',
            'wrzesień',
            'październik',
            'listopad',
            'grudzień',
        ]
    };

})(window);
