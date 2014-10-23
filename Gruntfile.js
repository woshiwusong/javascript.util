module.exports = function(grunt) {


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        
        bower: {
    install: {
    }
  },
        
        gjslint: {
            options: {
              flags: [
                '--disable 110' //ignore error code 220 from gjslint
              ],
              reporter: {
                name: 'console'
              }
            },
            all: {
              src: ['src/**/*.js']
            }
          },
        
        
        closureCompiler: {
            options: {
                compilerFile: 'lib/closure-compiler/compiler.jar',
                compilerOpts: {
                    compilation_level: 'ADVANCED',
                    externs: ['lib/closurecompiler-externs/*.js'],
                    generate_exports: true,
                    define: ["'goog.DEBUG=false'"],
                    warning_level: 'verbose',
                    summary_detail_level: 3,
                    manage_closure_dependencies: true,
                    only_closure_dependencies: true,
                    closure_entry_point: [
                        'javascript.util.ArrayList',
                        'javascript.util.Arrays',
                        'javascript.util.Collection',
                        'javascript.util.EmptyStackException',
                        'javascript.util.HashMap',
                        'javascript.util.HashSet',
                        'javascript.util.IndexOutOfBoundsException',
                        'javascript.util.Iterator',
                        'javascript.util.List',
                        'javascript.util.Map',
                        'javascript.util.NoSuchElementException',
                        'javascript.util.OperationNotSupported',
                        'javascript.util.Set',
                        'javascript.util.SortedMap',
                        'javascript.util.SortedSet',
                        'javascript.util.Stack',
                        'javascript.util.TreeMap',
                        'javascript.util.TreeSet'
                    ],
                    output_wrapper: '"(function(){%output%}).call(this);"'
                }
            },
            browser: {
                src: ['src/*.js',
                    'lib/closure-library/closure/goog/**/*.js',
                    '!lib/closure-library/closure/goog/**/*_test.js',
                    '!lib/closure-library/closure/goog/**/*_perf.js',
                    '!lib/closure-library/closure/goog/demos/**/*.js',
                    'lib/closure-library/third_party/closure/goog/**/*.js',
                    '!lib/closure-library/third_party/closure/goog/**/*_test.js',
                    '!lib/closure-library/third_party/closure/goog/**/*_perf.js'],
                dest: 'dist/javascript.util.js'
            },
            node: {
                TEMPcompilerOpts: {
                    only_closure_dependencies: false,
                },
                src: ['src/*.js',
                    'lib/closure-library/closure/goog/**/*.js',
                    '!lib/closure-library/closure/goog/**/*_test.js',
                    '!lib/closure-library/closure/goog/**/*_perf.js',
                    '!lib/closure-library/closure/goog/demos/**/*.js',
                    'lib/closure-library/third_party/closure/goog/**/*.js',
                    '!lib/closure-library/third_party/closure/goog/**/*_test.js',
                    '!lib/closure-library/third_party/closure/goog/**/*_perf.js',
                    'src/node/*.js'],
                dest: 'dist/javascript.util-nodejs.js'
            }
        },
        
        closureCompilerNode: {
            options: {
                compilerFile: 'lib/closure-compiler/compiler.jar',
                compilerOpts: {
                    compilation_level: 'ADVANCED',
                    externs: ['lib/closurecompiler-externs/*.js'],
                    generate_exports: true,
                    define: ["'goog.DEBUG=false'"],
                    warning_level: 'verbose',
                    summary_detail_level: 3,
                    manage_closure_dependencies: true,
                    closure_entry_point: [
                        'javascript.util.ArrayList',
                        'javascript.util.Arrays',
                        'javascript.util.Collection',
                        'javascript.util.EmptyStackException',
                        'javascript.util.HashMap',
                        'javascript.util.HashSet',
                        'javascript.util.IndexOutOfBoundsException',
                        'javascript.util.Iterator',
                        'javascript.util.List',
                        'javascript.util.Map',
                        'javascript.util.NoSuchElementException',
                        'javascript.util.OperationNotSupported',
                        'javascript.util.Set',
                        'javascript.util.SortedMap',
                        'javascript.util.SortedSet',
                        'javascript.util.Stack',
                        'javascript.util.TreeMap',
                        'javascript.util.TreeSet'
                    ],
                    output_wrapper: '"(function(){%output%}).call(this);"'
                }
            },
            main: {
                src: ['src/*.js',
                    'lib/closure-library/closure/goog/**/*.js',
                    '!lib/closure-library/closure/goog/**/*_test.js',
                    '!lib/closure-library/closure/goog/**/*_perf.js',
                    '!lib/closure-library/closure/goog/demos/**/*.js',
                    'lib/closure-library/third_party/closure/goog/**/*.js',
                    '!lib/closure-library/third_party/closure/goog/**/*_test.js',
                    '!lib/closure-library/third_party/closure/goog/**/*_perf.js',
                    'src/node/*.js'],
                dest: 'dist/javascript.util-nodejs.js'
            }
        },
        
        closureDepsWriter: {
            main: {
                options: {
                    closureLibraryPath: 'lib/closure-library',
                    root_with_prefix: '"src ../../../../src"',
                },
                dest: 'deps.js'
            }
        },
    
    });
    
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-closure-tools');
    grunt.loadNpmTasks('grunt-gjslint');
    
    grunt.registerTask('default', ['bower', 'gjslint', 'closureDepsWriter', 'closureCompiler']);
}
