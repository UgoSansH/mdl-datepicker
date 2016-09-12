module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        "compass": {
            "sass": {
                "options": {
                    "sassDir":        "src/scss",
                    "cssDir" :        "dist/css",
                    "outputStyle":    "expanded",
                    "noLineComments": true
                }
            }
        },
        "cssmin" : {
            "combine" : {
                "options" : {
                    "report"              : 'gzip',
                    "keepSpecialComments" : 0
                },
                "files" : {
                    "dist/datepicker.min.css" : [
                        "dist/css/*.css"
                    ],
                }
            }
        },
        "uglify": {
            "options" : {
                "mangle"        : false,
                "sourceMap"     : true,
                "sourceMapName" : 'dist/app.map'
            },
            "dist": {
                "files": {
                    "dist/calendar.min.js" : [
                        "src/translations/*.js",
                        "src/templates/*.js",
                        "src/calendar.js",
                        "src/constants.js",
                        "src/tempate.js",
                        "src/translations.js",
                    ],
                    "dist/datepicker.min.js" : [
                        "src/translations/*.js",
                        "src/templates/*.js",
                        "src/calendar.js",
                        "src/constants.js",
                        "src/datepicker.js",
                        "src/tempate.js",
                        "src/translations.js",
                    ],
                    "dist/material-datepicker.min.js": [
                        "src/translations/*.js",
                        "src/templates/*.js",
                        "src/*.js",
                    ]
                }
            }
        },
        "watch" : {
            "css": {
                "files": [
                    "src/scss/*.scss"
                ],
                "tasks": [
                    "css"
                ]
            },
            "javascript": {
                "files": [
                    "src/translations/*.js",
                    "src/material-design-lite/*.js",
                    "src/*.js"
                ],
                "tasks": [
                    "js"
                ]
            }
        }
    });

    grunt.registerTask('default', ['css', 'js']);
    grunt.registerTask('css', ['compass', 'cssmin']);
    grunt.registerTask('js', ['uglify']);
};