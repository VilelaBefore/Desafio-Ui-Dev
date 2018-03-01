// Generated  using Front-End-Sass Generator https://github.com/Frodigo/front-end-generator

'use strict';

var path = require('path');

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'src',
    dist: 'dist'
  };

  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // browser sync task
    browserSync: {
      bsFiles: {
        src: ['src/**/*.{html,css,jpg,png,svg,js}']
      },
      options: {
        watchTask: true,
        server: './src'
      }
    },

    // sass task

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'src/css/styles.css': 'src/sass/styles.scss'
        }
      }
    },


    // post css task

    postcss: {
      options: {
        map: false, // inline sourcemaps
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 5 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'src/css/*.css'
      }
    },

    // sass lint


    sasslint: {
      options: {
        configFile: '.sass-lint.yml'
      },
      target: ['src/sass/**/*.scss']
    },

    // sass doc

    sassdoc: {
      default: {
        src: 'src/sass',
        options: {
          dest: 'src/docs/sass'
        }
      }
    },

    // js doc

    jsdoc: {
      dist: {
        src: ['src/js/*.js', 'src/test/*.js'],
        options: {
          destination: 'src/docs/js'
        }
      }
    },


    // jshint task
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        force: true
      },
      default: {
        files: [{
          src: ['src/js/**/*.js']
        }]
      }
    },

    // html lint task

    validation: {
      all: {
        src: ['src/**/*.html', '!src/vendor/**/*.html', '!src/docs/**/*.html']
      }

    },

    // clean task

    clean: {
      default: {
        files: [
          {
            dot: true,
            src: [
              'dist/**/*'
            ]
          }
        ]
      }
    },

    // copy task

    copyto: {
      options: {
        ignore: [
          '.gitkeep',
          '**/.git',
          '**/.git/**',
          '**/*.{scss,sass}',
          'src/sass',
          'src/sass/**',
          'src/docs',
          'src/docs/**'
        ]
      },
      default: {
        files: [
          {cwd: 'src/', src: ['**/*'], dest: 'dist/', expand: true}
        ]
      }
    },

    // imagemin tasks

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 5,
          svgoPlugins: [{removeViewBox: false}]
        },

        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'src/'
        }]
      }
    },


    // sprites generation tasks

    sprite: {
      all: {
        src: 'src/images/sprites/*.png',
        dest: 'src/images/sprites.png',
        destCss: 'src/sass/specifics/_sprites.scss'
      }
    },


    // watch task

    watch: {
      styles: {
        files: ['src/**/*.{scss,sass}'],
        tasks: ['sass', 'postcss'],
        options: {
          spawn: false
        }
      },

      sprites: {
        files: ['src/images/sprites/*.png'],
        tasks: ['sprite'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.registerTask('serve', [
    'browserSync',
    'sass',
    'watch'
  ]);


  grunt.registerTask('test', [
    'validation',
    'sasslint',
    'jshint'
  ]);

  grunt.registerTask('docs', [
    'sassdoc',
    'jsdoc'
  ]);

  grunt.registerTask('default', [
    'clean',
    'sass',
    'postcss',
    'imagemin',
    'sprite',
    'copyto',
    'test',
    'docs'
  ]);

};
