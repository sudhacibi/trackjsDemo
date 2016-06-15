'use strict';

module.exports = function(grunt) {

  var beautifyFiles = ['!Gruntfile.js', '!npm-shrinkwrap.json', 'src/**/*.{html,js}', '!app/bower_components/**/*'];

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
    
         //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate'); 

  // Define the configuration for all the tasks
  grunt.initConfig({

    connect: {
             server: {
               options: {
                 port: 9000
               }
             }
    },

    watch: {
           scripts: {
                    files: ['src/**/*'],
                    tasks: ['jshint', 'karma'],
                    options: {
                             spawn: false
                    }
           }

    },
      
      ngAnnotate: {
    options: {
        singleQuotes: true
    },
    app: {
        files: {
            'src/min-safe/ui-router-tabs.js': ['src/ui-router-tabs.js'],
            'example/min-safe/app.js': ['example/app.js'],
            'example/min-safe/example-controller.js': ['example/example-controller.js'],
            'example/min-safe/main-controller.js': ['example/main-controller.js'],
             'example/min-safe/user/accounts/OutofTabCtrl.js': ['example/user/accounts/OutofTabCtrl.js'],
             'example/min-safe/user/accounts/settings-controller.js': ['example/user/accounts/settings-controller.js']
        }
    }
},
concat: {
    js: { //target
        src: ['src/min-safe/*.js', 'example/min-safe/**/*.js'],
        dest: 'src/concat/app.js'
    }
},
uglify: {
    options: {
        sourceMap: true
    },
    js: { //target
        src: ['src/concat/app.js'],
        dest: 'dest/minified.js'
    }
},
      
//       uglify: {
//        my_target: {
//          files: {
//            'dest/minified.js': ['src/*.js','example/**/*.js']
//          }
//        }
//      },

    // verifies we have formatted our js and HTML according to our style conventions
    jsbeautifier: {
      verify : {
        src:   beautifyFiles,
        options: {
          config: '.jsbeautifyrc',
          mode: 'VERIFY_ONLY'
        }
      },
      update: {
        src:   beautifyFiles,
        options: {
          config: '.jsbeautifyrc'
        }
      }

    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      src:     ['src/!(*spec).js']
    },

    // Test settings
    karma: {
      unit: {
        options:    {
          logLevel: 'DEBUG'
        },
        browsers:   ['PhantomJS'],
        configFile: 'karma.conf.js',
        singleRun:  true,
        autoWatch:  false
      }
    },
    coveralls: {
      options: {
        coverage_dir:'coverage',
        directory:'coverage/lcov.info',
        debug: true,
        dryRun: false,
        recursive: false
      }
    }
  });

  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('beautify', ['jsbeautifier:update']);
  grunt.registerTask('minify', ['ngAnnotate', 'concat', 'uglify']);
  grunt.registerTask('default', [
    'jsbeautifier:verify', 'jshint', 'karma', 'coveralls'
  ]);
};
