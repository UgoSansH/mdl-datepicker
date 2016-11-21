(function() {
    'use strict';

    if (typeof epepite == "undefined") {
        window.epepite = {};
    }

    if (typeof epepite.DatePicker == "undefined") {
        epepite.DatePicker = {};
    }

    epepite.DatePicker.CONSTANTS = {
        YEAR:                     'year',
        MONTH:                    'month',
        DAY:                      'day',
        PREV:                     'prev',
        NEXT:                     'next',
        NONE:                     '-',
        CALENDAR_CLASS:           'mdl-calendar',
        YEAR_CLASS:               'mdl-calendar__year',
        YEAR_NEXT_CLASS:          'mdl-calendar__year--next',
        YEAR_PREV_CLASS:          'mdl-calendar__year--prev',
        MONTH_CLASS:              'mdl-calendar__month',
        MONTH_NEXT_CLASS:         'mdl-calendar__month--next',
        MONTH_PREV_CLASS:         'mdl-calendar__month--prev',
        DAY_CONTAINER_CLASS:      'mdl-calendar__days',
        DAY_CLASS:                'mdl-calendar__day',
        DAY_TODAY_CLASS:          'mdl-calendar__day-today',
        DAY_SELECTED_CLASS:       'mdl-calendar__day-selected',
        DAY_DISABLED_CLASS:       'mdl-calendar__day-disabled',
        WEEK_ITEM_CLASS:          'mdl-calendar__week-item',
        WEEK_CLASS:               'mdl-calendar__week',
        WEEK_LABELS_CLASS:        'mdl-calendar__week-labels',
        WEEK_LABEL_CLASS:         'mdl-calendar__week-label',
        TEXT_DATE_CLASS:          'mdl-calendar__text-date',
        ACTION_OK_CLASS:          'mdl-calendar__button-ok',
        ACTION_CANCEL_CLASS:      'mdl-calendar__action-cancel',
        TEMPLATE_NAME:            'default',
        OBFUSCATOR_CLASS:         'mdl-obfuscator',
        DATEPICKER_CLASS:         'mdl-datepicker',
        DATEPICKER_WRAPPER_CLASS: 'mdl-datepicker-wrapper',
        DATE_EVENT:               'date_update',
        MONTH_PREV_EVENT:         'month_prev',
        MONTH_NEXT_EVENT:         'month_next',
        YEAR_PREV_EVENT:          'year_prev',
        YEAR_NEXT_EVENT:          'year_next',
        DAY_EVENT:                'day_update',
        DATEPICKER_EVENT:         'update',

        // Action/State classes
        IS_VISIBLE:               'is-visible',
        IS_DISABLED:              'is-disabled',
        IS_SELECTED:              'is-selected',
        IS_UPGRADED:              'is-upgraded',
        IS_AVAILABLE:             'is-available',
        IS_UNVAILABLE:            'is-unvailable'
    };

})();