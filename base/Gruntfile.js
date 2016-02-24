module.exports = function(grunt) {

    // Automaticamente carga las tareas
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Configuración
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['bower_components/jquery/dist/jquery.js', 'js/main.js'],
                dest: 'js/app.js'
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'css/main.css': 'scss/main.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'css/main.min.css': ['css/main.css']
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 9']
            },
            dev: {
                src: 'css/main.css',
                dest: 'css/main.css'
            }
        },
        uglify: {
            production: {
                options: {
                    mangle: true,
                    compress: false,
                    banner: '/*! Author: Jairo burbano\n' +
                    ' * v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
                    ' */\n'
                },
                files: {
                    'js/app.min.js': ['js/app.js']
                }
            },
        },
        svgstore: {
            options: {
                prefix: "shape-",
                cleanup: true,
                svg: {
                    style: "display: none;"
                }
            },
            default: {
                files: {
                    "svg-defs.svg": ["svgs/*.svg"]
                }
            }
        },
        browserSync: {
            bsFiles: {
                src : [
                    'css/*.css',
                    '*.html'
                ]
            },
            options: {
                watchTask: true,
                ghostMode: {
                    clicks: true,
                    scroll: true,
                    links: true,
                    forms: true
                },
                server: {
                    baseDir: './'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            svg: {
                files: ['svgs/*.svg'],
                tasks: ['svgstore'],
                options: {
                    spawn: false
                }
            },
            js: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['scss/**/*.scss', 'css/*.css'],
                tasks: ['sass', 'autoprefixer', 'cssmin'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('css', ['sass', 'cssmin', 'watch']);
    grunt.registerTask('dev', ['browserSync', 'watch'] );
};
