"use strict";
module.exports = function ( grunt ) {

    // Project configuration.
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),

        jshint: {
            defaults: [
                "dev-src/js/*.js"
            ]
        },

        csslint: {
            strict: {
                src: [
                    'src/**/*.css'
                ]
            }
        },

        connect: {
            mock: {
                options: {
                    base: 'src/',
                    open: true,
                    keepalive: true
                }
            }
        },

        concat: {
            extras: {
              src: [
                  'dev-src/js/lib/jquery-2.2.3.min.js',
                  'dev-src/js/weapons.js',
                  'dev-src/js/game.js',
                  'dev-src/js/user.js',
                  'dev-src/js/main.js'
              ],
              dest: 'dev-src/js/concated/main.js'
            }
          },
        /**
         * Uglify js
         *
         **/
        uglify: {
            options: {
                compress: true,
              mangle: {
                except: ['jQuery', '$']
              }
            },
            all: {
                files: {
                  'src/js/main.js': ['dev-src/js/concated/main.js']
                }
            }
        },

        /**
         * Sass to Css and compress
         *
         **/
        sass: {
            options: {
                style: 'compressed',
                sourcemap:'none',
                noCache: true
            },
            dist: {
                files: {
                    'src/css/main.css': 'dev-src/sass/main.scss'
                }
            }
        },
        /**
         * Watch task
         *
         **/
        watch: {
            grunt: {files: ['Gruntfile.js']},

            sass: {
                files: 'dev-src/sass/**/*.scss',
                tasks: ['sass','csslint']
            },
            scripts: {
                files: 'dev-src/js/**/*.js',
                tasks: ['jshint','concat','uglify']
            }

        }

    });

    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-csslint' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );

    // Runs all checkstyle stuff
    grunt.registerTask( 'default', [
        'jshint',
        'csslint'
    ]);

    grunt.registerTask( 'watch', [
        'sass',
        'scripts'
    ]);

    grunt.registerTask( 'build', [
        'jshint','concat', 'uglify',
        'sass','csslint'
    ]);
};
