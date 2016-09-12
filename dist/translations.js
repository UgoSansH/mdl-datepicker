(function(window) {

    if (typeof window.Withouth == "undefined") {
        window.Withouth = {};
    }

    if (typeof Withouth.DatePicker == "undefined") {
        Withouth.DatePicker = {};
    }

    Withouth.DatePicker.Translator = function(locale)
    {
        this.locale       = locale || 'en_EN';
        this.translations = {
            'en_EN' : {}
        };
    };

    Withouth.DatePicker.Translator.prototype.setLocale = function(locale)
    {
        this.locale = locale;

        return this;
    };

    Withouth.DatePicker.Translator.prototype.trans = function(message, params, locale)
    {
        locale = locale || this.locale;

        if (typeof this.translations[locale] == "object") {
            if (typeof this.translations[locale][message] != "undefined") {
                var translate = '',
                    domain    = this.translations[locale][message];

                if (typeof domain == "object") {
                    var keys = message.split('.');

                    for (var i = 0; i < keys.length; i++) {
                        if (typeof domain[keys[i]] != "object") {
                            domain = domain[keys[i]];
                            return translate;
                        }
                    }

                } else {
                    translate = domain;
                }

                message = translate;
            }
        }

        return message;
    };

})(window);
