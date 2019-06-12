(function() {
    'use strict';

    var MaterialDatepicker = function MaterialDatepicker(element)
    {
        this.element_    = element;
        this.datepicker_ = null;

        this.init();
    };
    window.MaterialDatepicker = MaterialDatepicker;

    MaterialDatepicker.prototype.Constant_ = {
    };

    MaterialDatepicker.prototype.CssClasses_ = {
        DIRTY           : 'is-dirty',
        TEXTFIELD       : 'mdl-textfield',
        TEXTFIELD_INPUT : 'mdl-textfield__input'
    };

    MaterialDatepicker.prototype.init = function()
    {
        if (this.element_) {
            var elementLang = this.element_.attributes['data-language'];
            elementLang = elementLang && elementLang.value;

            var pattern = this.element_.attributes['data-pattern'];
            pattern = pattern && pattern.value;

            var minDate = this.element_.attributes['data-min'];
            minDate = minDate && moment(minDate.value, pattern).toDate();

            var maxDate = this.element_.attributes['data-max'];
            maxDate = maxDate && moment(maxDate.value, pattern).toDate();

            var lang = elementLang ? elementLang : (navigator.language ? navigator.language : 'en');
            var options = {
                'input'   : this.element_,
                'locale'  : lang,
                'min_date': minDate,
                'max_date': maxDate,
            };

            if (pattern) {
              options['format'] = pattern;
            }

            this.datepicker_ = new epepite.DatePicker.DatePicker(options);
            this.datepicker_.on(epepite.DatePicker.CONSTANTS.DATEPICKER_EVENT, this.onSelectedDate.bind(this));
        }
    };

    MaterialDatepicker.prototype.onSelectedDate = function(event)
    {
        if (this.element_.value) {
            // Compatibility from mdl-textfield
            var textfield = this.findTextfield();

            if (textfield) {
                textfield.classList.add(this.CssClasses_.DIRTY);
            }
        }
    };

    MaterialDatepicker.prototype.findTextfield = function()
    {
        if (this.element_.classList.contains(this.CssClasses_.TEXTFIELD_INPUT)) {
            for (var target = this.element_.parentNode; target && target != this.element_; target = target.parentNode) {
                if (target.classList.contains(this.CssClasses_.TEXTFIELD)) {
                    return target;
                }
            }
        }

        return null;
    };

    componentHandler.register({
        constructor: MaterialDatepicker,
        classAsString: 'MaterialDatepicker',
        cssClass: 'mdl-datepicker__input',
        widget: true
    });
})();
