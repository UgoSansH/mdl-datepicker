(function(window) {
    'use strict';

    if (typeof window.epepite == "undefined") {
        window.epepite = {};
    }

    if (typeof epepite.DatePicker == "undefined") {
        epepite.DatePicker = {};
    }

    if (typeof epepite.DatePicker.TEMPLATES == "undefined") {
        epepite.DatePicker.TEMPLATES = {};
    }

    epepite.DatePicker.TEMPLATES.material =
        '<div class="mdl-calendar__header"><div class="mdl-calendar__header-year">'
        + '<button type="button" name="mdl-calendar-year-prev" class="%YEAR_PREV_CLASS% %IS_VISIBLE% mdl-calendar__year--button left mdl-calendar__button">'
        + '<i class="icon material-icons">keyboard_arrow_left</i></button><p class="%YEAR_CLASS%">2016</p>'
        + '<button type="button" name="mdl-calendar-year-next" class="%YEAR_NEXT_CLASS% %IS_VISIBLE% mdl-calendar__year--button right mdl-calendar__button">'
        + '<i class="icon material-icons">keyboard_arrow_right</i></button></div>'
        + '<p class="mdl-calendar__header-fulldate %TEXT_DATE_CLASS%">Mercredi 16 Mars</p></div>'
        + '<div class="mdl-calendar__body"><div class="mdl-calendar__body-month">'
        + '<button type="button" name="mdl-calendar__month--prev" class="%MONTH_PREV_CLASS% %IS_VISIBLE% mdl-calendar__button"><i class="icon material-icons">keyboard_arrow_left</i></button>'
        + '<p class="mdl-calendar__body-month-title"><span class="%MONTH_CLASS%">Mars</span> <span class="%YEAR_CLASS%">2016</span></p>'
        + '<button type="button" name="mdl-calenda__month--next" class="%MONTH_NEXT_CLASS% %IS_VISIBLE% mdl-calendar__button"><i class="icon material-icons">keyboard_arrow_right</i></button>'
        + '</div><div class="%WEEK_LABELS_CLASS%"><div class="%WEEK_CLASS% %WEEK_LABELS_CLASS%">'
        + '<span class="%WEEK_ITEM_CLASS% %WEEK_LABEL_CLASS%">L</span><span class="%WEEK_ITEM_CLASS% %WEEK_LABEL_CLASS%">M</span>'
        + '<span class="%WEEK_ITEM_CLASS% %WEEK_LABEL_CLASS%">M</span><span class="%WEEK_ITEM_CLASS% %WEEK_LABEL_CLASS%">J</span>'
        + '<span class="%WEEK_ITEM_CLASS% %WEEK_LABEL_CLASS%">V</span><span class="%WEEK_ITEM_CLASS% %WEEK_LABEL_CLASS%">S</span>'
        + '<span class="%WEEK_ITEM_CLASS% %WEEK_LABEL_CLASS%">D</span></div></div><div class="%DAY_CONTAINER_CLASS%"></div></div></div>'
    ;


})(window);
