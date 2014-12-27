module.exports = function(grunt) {

    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        
        concat: {//Put all javascript files together. Must be in a certain order, hence why I ain't selected all the files
            authoredJavascript: {
                src: ['javascript/javascript-authored/*.js'],//Change the array to a listing of JS files to concat in order
                dest: 'javascript/javascript-authored-minified/javascript-authored.js'
            },
            javascriptLibraries: {
                src: ['bower_components/jquery/jquery.js',
                    'bower_components/velocity/velocity.min.js',
                    'bower_components/velocity/velocity.ui.min.js',
                    'bower_components/blast-text/jquery.blast.min.js',
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/detect-mobile-browser/detectmobilebrowser.js'],
                dest: 'javascript/javascript-libs-concat-min/javascript-libs.js'
            }
        },
        uglify: {//Minify files
            authoredJavascript: {
                src: 'javascript/javascript-authored-minified/javascript-authored.js',
                dest: 'javascript/javascript-authored-minified/javascript-authored.min.js'
            },
            javascriptLibraries: {
                src: 'javascript/javascript-libs-concat-min/javascript-libs.js',
                dest: 'javascript/javascript-libs-concat-min/javascript-libs.min.js'
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'stylesheets',
                    cssDir: './',
                    noLineComments: false, //Remove all line comments
                    outputStyle: 'compressed' //Minify css
                }
            }
        },
        watch: {//Watch the project for any changes, to perform concat and uglify on specified files
            options:{
                livereload: true
            },
            concatAndMinifyAuthoredJavascript: {
                files: 'javascript/javascript-authored/*.js',
                tasks: ['concat:authoredJavascript','uglify:authoredJavascript']
            },
            concatAndMinifyJavascriptLibraries: {
                files: ['bower_components/jquery/jquery.js',
                    'bower_components/velocity/velocity.min.js',
                    'bower_components/velocity/velocity.ui.min.js',
                    'bower_components/blast-text/jquery.blast.min.js',
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/detect-mobile-browser/detectmobilebrowser.js'],
                tasks: ['concat:javascriptLibraries','uglify:javascriptLibraries']
            },
            compass: {
                files: ['stylesheets/**/*.scss'],//any sass file in any sub directory of scss changed will trigger the task
                tasks: ['compass']
            },
            htmlAndPhpFileChanges: { //Reload the browser for any changes to PHP or HTML files. Add other extensions aswell if I need em.
                files: ['*.php','*.html']
            }
        },
        sprite:{//If used, the computer will need a download of graphics magick software.
            all: {
                src: ['images/*.jpg'],
                destImg: 'images/spritesheet/spritesheet.jpg',
                destCSS: 'stylesheets/sprites.css',
                engine: 'gm',
                algorithm: 'left-right'
            }
        }
        
    });
    
    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-spritesmith');//If used, the computer will need a download of graphics magick software.
    grunt.loadNpmTasks('grunt-notify');//JS notification
    grunt.loadNpmTasks('grunt-newer');//run tasks on files that have been modified 

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);
	
};