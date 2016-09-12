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
            this.datepicker_ = new epepite.DatePicker.DatePicker({
                'input'  : this.element_,
                'locale' : navigator.language ? navigator.language : 'fr'
            });

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
