module.exports = function(grunt){
   
    //CHANGE THESE GLOBAL CONFIG VARIABLES NOW. CHANGE THEM EVERYTIME YOU USE THIS WP TEMPLATE FOR A DIFFERENT PROJECT ------------------------------------------------------>
    
    var config = {
    
        //Change this variable to the URL of the website this template will be distributed on.
        //This url will be used in SASS files as a URL reference for various style properties. For example, in the url value of a background image property - background-image:url( URL WOULD BE INSERTED HERE);.
        //This variable is dynamically injected in via the grunt task 'processhtml:configSassWpTemplateUrl', which you can look at far below in this file. 
        sass_wp_template_url: "$wp-template-url: 'http://127.0.0.1:8080/wordpress/wp-content/themes/wp_template_dest';",
        
        //Change this variable to the name you wish to give to the dist folder. This name should be the wordpress template name.
        dist: 'wp_template_dest',
        
        //Root folder of the project. DO NOT CHANGE THIS, UNLESS YOU KNOW WHAT YOU'RE DOING.
        root: './'
    };
   
    //------------------------------------------------------------------------------------------------------------------->

    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        
        //The global config variables that were previously made, 
        //have been declared here.
        config: config,
        
        //A SASS library. This plugin comes with sass, so no need to install 
        //a grunt sass plugin aswell. 
        //THIS PLUGIN DOES REQUIRE AN ACTUAL DOWNLOAD OF RUBY, SASS AND COMPASS.  
        compass: {
            dev: {
                options: {
                    sassDir: 'stylesheets',
                    cssDir: '<%= config.root %>', //specify the route of the project to emit the compiled css file
                    noLineComments: false,
                    outputStyle: 'compressed'
                }
            },
            
            //Compile SASS and distribute only the style.css file to the dist 
            //folder. This task is run to specifically compile style.css due 
            //to a certain variable being changed in config.scss.
            dist: {
                options: {
                    sassDir: '<%= config.dist %>/stylesheets',
                    cssDir: '<%= config.dist %>', //specify the route of the project to emit the compiled style.css file
                    noLineComments: false,
                    outputStyle: 'compressed'
                }
            }
        },
        
        //Image spriting. If this plugin is used the computer running this 
        //gruntfile will need a download of 'graphics magick' software in the 
        //execution path.
        sprite: {
            all: {
                src: 'images/sprites/*.jpg',
                destImg: 'images/sprites/spritesheet/spritesheet.jpg',
                destCSS: 'stylesheets/sprites.css',
                engine: 'gm',
                algorithm: 'left-right'
            }
        },
        
        //Watch the project for changes to any sass, html, php and javascript files.
        watch: { 
            options: {
                livereload: true
            },
            compass: {
                files: 'stylesheets/**/*.scss', //Any changes to SASS files will trigger the task and reload the browser.
                tasks: 'compass:dev'
            },
            htmlAndPhpFileChanges: { //Reload the browser for any changes to PHP or HTML files in the root directory. Add other file extensions aswell if I need them.
                files: '*{.php,.html}'
            },
            authoredJavascriptFilesChanged: { //Reload the browser for any changes to athored javascript files.
                files: 'javascript/**/*.js'
            },
            newBowerFiles: { //Reload the browser for any changes to bower files or adding of new bower files.
                files: 'bower_components/**/*'
            },
            gruntFileJs: { //Watch gruntfile.js so that it can reload itself if changes are made to the file when running the 'watch' task.
                files: 'Gruntfile.js'
            }
        },
        
        //Changes the SASS variable 'wp_template_url' in config.scss to the URL
        //of the web server this wordpress template theme is to be distributed on
        processhtml: {
            configSassWpTemplateUrl: {
                options: {
                    data: {
                        wp_template_url: '<%= config.sass_wp_template_url %>'
                    }
                },
                files: {
                    '<%= config.dist %>/stylesheets/configuration/_config.scss' : '<%= config.dist %>/stylesheets/configuration/_config.scss'
                }
            }
        },
        
        //Delete stylesheets and dist folder at specific points in the 'deploy_build' task
        clean: {
            styleSheets: {
                src: '<%= config.dist %>/stylesheets'
            },
            dist: {
                src: '<%= config.dist %>'
            }
        },
        
        //Create dist directory by copying wanted files from production (aka root) folder
        copy: { 
            //Copy folders apart from some and move it to the new dist folder
            dist: {
                src: [
                    '**/*', 
                    '!node_modules/**',
                    '!nbproject/**',
                    '!style.css',
                    '!javascript/**',
                    '!bower_components/**',
                    'bower_components/fontawesome/**/*',
                    'bower_components/respond-minmax/**/*',
                    'bower_components/html5shiv/**/*',
                    '!Gruntfile.js',
                    '!package.json',
                    '!bower.json',
                    '!README.md',
                    '!LICENSE'
                ],
                dest: '<%= config.dist %>/'
            }
        },
        
        //Remove the '<?php bloginfo('template_url'); ?>' snippet from any PHP files
        //which include it in a script's src attribute (e.g src="<?php bloginfo('template_url'); ?>/bower_components/jquery/dist/jquery.min.js"). 
        //This is to prepare script references in PHP files for being processed by the useminPrepare task.  
        replace: {
            wp_bloginfo_references: {
                src: ['<%= config.dist %>/*.php'],            
                dest: '<%= config.dist %>/',             
                replacements: [{
                    //The HTML 5 data attribute is used to help identify which
                    //scripts are using <?php bloginfo('template_url'); ?> in their src property.
                    from: "data=\"grunt-js-replace-plugin-remove-wp-bloginfo\" src=\"<?php bloginfo('template_url'); ?>/",                  
                    to: 'src="'
                }]
            }
        },
        
        //Dynamically concat and minify javascript or css files, based on the specified comment blocks in the files.
        useminPrepare: {
            html: '<%= config.dist %>/*.php',
            options: {
                root: '<%= config.root %>',
                dest: '<%= config.dist %>/'
            }
        },       
        
        //Update files' script references that have been useminPrepared. 
        usemin: {
            html: '<%= config.dist %>/*.php',
            options: {
                blockReplacements: {
                    js: function(block){
                        //Put back the <?php bloginfo('template_url'); ?> snippet.
                        //So that script references will work according to wordpress
                        return '<script src="<?php bloginfo(\'template_url\'); ?>/' + block.dest + '"></script>';
                    }
                }
            }
        }
        
    });
    
    // 3. Where we tell Grunt we plan to use this plug-in.
    
    grunt.loadNpmTasks('grunt-contrib-concat'); //Javascript concat
    grunt.loadNpmTasks('grunt-contrib-uglify'); //JavaScript minify
    grunt.loadNpmTasks('grunt-contrib-watch'); //Watches the project for changes to run various tasks.
    grunt.loadNpmTasks('grunt-contrib-compass'); //A SASS library. If used, the computer will need a download of Ruby, SASS and COMPASS. 
    grunt.loadNpmTasks('grunt-spritesmith'); //If used, the computer will need a download of 'graphics magick software' installed in the execution path.
    grunt.loadNpmTasks('grunt-notify'); //JS notification
    grunt.loadNpmTasks('grunt-newer'); //Run tasks on files that have been modified 
    grunt.loadNpmTasks('grunt-contrib-copy'); //Copy files. Use mainly for creating a dist folder for a site
    grunt.loadNpmTasks('grunt-contrib-cssmin'); //Minifies css.
    grunt.loadNpmTasks('grunt-processhtml'); //Change html files. Used for changing directory paths for stylesheets and javascript in build environment.
    grunt.loadNpmTasks('grunt-contrib-clean'); //Delete folders and files
    grunt.loadNpmTasks('grunt-usemin'); //Use minification processes
    grunt.loadNpmTasks('grunt-text-replace'); //Replace string text throughout files. 

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    
    grunt.registerTask('default', ['watch']);
    
    grunt.registerTask('deploy_build', [
        'clean:dist', //Delete any existing dist folders.
        'copy:dist', //Copy folders to create a dist folder
        'replace:wp_bloginfo_references', //Replace 
        'useminPrepare', //Prepare minification processes
        'concat:generated', //Concat javascript
        'uglify:generated', //Minify javascript
        'processhtml:configSassWpTemplateUrl', //Change sass config's manually input WORDPRESS URL
        'compass:dist', //Compile SASS library compass to create style.css with newly added wordpress url
        'clean:styleSheets', //Delete stylesheets
        'usemin' //Put references in files that are needed to be linked to previously concatenated and minified files.
    ]);
    
};