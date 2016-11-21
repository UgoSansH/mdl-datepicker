(function() {
    'use strict';

    if (typeof epepite == "undefined") {
        window.epepite = {};
    }

    if (typeof epepite.DatePicker == "undefined") {
        epepite.DatePicker = {};
    }

    epepite.DatePicker.Template = function() {};

    epepite.DatePicker.Template.prototype.load = function(name)
    {
        if (typeof epepite.DatePicker.TEMPLATES[name] == "undefined") {
            throw "Undefined template \""+ name +"\"";
        }

        var template  = epepite.DatePicker.TEMPLATES[name],
            constants = epepite.DatePicker.CONSTANTS
        ;

        for (var key in constants) {
            if (constants.hasOwnProperty(key)) {
                var pattern = new RegExp('%'+ key +'%', 'g');
                template = template.replace(pattern, constants[key]);
            }
        }

        return template;
    };

})();
