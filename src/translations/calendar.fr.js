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

    epepite.DatePicker.Translations.fr = {
        'close':       'Fermer',
        'booking':     'Réservation',
        'reserve':     'Réservé',
        'travel':      'Trajet',
        'travel_time': 'Temps de trajet',
        'day':         'Jour',
        'month':       'Mois',
        'header':      {
            'year_next': 'Année suivante',
            'year_prev': 'Année précédente %year%'
        },
        'days' : [
            'Dimanche',
            'Lundi',
            'Mardi',
            'Mercredi',
            'Jeudi',
            'Vendredi',
            'Samedi'
        ],
        'months': [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
        ]
    };

})(window);
