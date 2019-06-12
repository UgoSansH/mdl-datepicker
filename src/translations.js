(function(window) {
    'use strict';

    if (typeof window.epepite == "undefined") {
        window.epepite = {};
    }

    if (typeof epepite.DatePicker == "undefined") {
        epepite.DatePicker = {};
    }

    epepite.DatePicker.Translator = function(locale)
    {
        this.locale       = locale || 'en_EN';
        this.translations = {
            'en_EN' : {}
        };

        if (typeof epepite.DatePicker.Translations == "object") {
            for (var locale in epepite.DatePicker.Translations) {
                this.setTranslation(locale, epepite.DatePicker.Translations[locale]);
            }
        }
    };

    epepite.DatePicker.Translator.prototype.setCurrentLocale = function(locale)
    {
        this.locale = locale;

        return this;
    };

    epepite.DatePicker.Translator.prototype.getCurrentLocale = function()
    {
        return this.locale;
    };


    epepite.DatePicker.Translator.prototype.setTranslation = function(locale, translations)
    {
        this.translations[locale] = translations;

        return this;
    };

    epepite.DatePicker.Translator.prototype.trans = function(message, params, locale)
    {
        locale = locale || this.locale;

        if (typeof this.translations[locale] === "object") { // has translation
            var translate = '';

            if (typeof this.translations[locale][message] !== "undefined") {
                translate = this.translations[locale][message];
            } else {  // no found, try to split by . and get dict in dict and so on…
                var domain = this.translations[locale];
                var keys   = message.split('.');

                for (var i = 0; i < keys.length; i++) {
                    if (typeof domain[keys[i]] !== "undefined") {
                        domain = domain[keys[i]];
                    } else {
                        return message;
                    }
                }

                translate = domain;
            }

            if (typeof translate === "string") {  // replace parameters
                if (params) {
                    for (var key in params) {
                        if (params.hasOwnProperty(key)) {
                            translate = translate.replace(key, params[key]);
                        }
                    }
                }
            }

            return translate;
        }
        else {
            throw 'No translation for locale ' + locale;
        }

        return message;
    };

    epepite.DatePicker.Translator.prototype.has = function(locale)
    {
        return (typeof this.translations[locale] != "undefined");
    };

})(window);
