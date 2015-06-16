module.exports = function(grunt){
   
    //CHANGE THESE GLOBAL CONFIG VARIABLES NOW. CHANGE THEM EVERYTIME YOU USE THIS WP TEMPLATE FOR A DIFFERENT PROJECT ------------------------------------------------------>
    
    var config = {
    
        //Change this variable to the URL of the website this template will be distributed on.
        //This url will be used in SASS files as a URL reference for various style properties. For example, in the url value of a background image property - background-image:url( URL WOULD BE INSERTED HERE);.
        //This variable is dynamically injected in via the grunt task 'processhtml:configSassWpTemplateUrl', which you can look at far below in this file. 
        sass_wp_template_url: "$wp-template-url: 'http://ica-international.local.wordpress.dev/wp-content/themes/ica_international_template_theme';",
        //sass_wp_template_url: "$wp-template-url: 'http://127.0.0.1:8080/wordpress/wp-content/themes/wp_template_dest';",
        
        //Change this variable to the name you wish to give to the dist folder. This name should be the wordpress template name.
        dist: 'ica_international_dest',
        
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
        
        //Changes the SASS variable 'wp_template_url' in the '_wp-url.scss' file to the URL
        //of the web server this wordpress template theme is to be distributed on.
        //This object is ran only when 'grunt deploy_build' is executed in the terminal.
        processhtml: {
            configSassWpTemplateUrl: {
                options: {
                    data: {
                        wp_template_url: '<%= config.sass_wp_template_url %>'
                        //The green part is the name of the data, the red part is the actual data to be parsed into the file which is the wp url specified at the top of the gruntfile.
                    }
                },
                files: { //The object property 'file' is where the target file with the process html block to be processed, is to be looked for.
                    '<%= config.dist %>/stylesheets/configuration/_wp-url.scss' : '<%= config.dist %>/stylesheets/configuration/_wp-url.scss'
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
            //Copy folders apart from certain ones and move them to the new dist folder
            dist: {
                src: [
                    '**/*', 
                    '!node_modules/**',
                    '!nbproject/**',
                    '!style.css',
                    '!javascript/**',
                    '!bower_components/**',
                    'bower_components/fontawesome/**/*',
                    //'bower_components/respond-minmax/**/*', Not needed for this theme, as it's not responsive
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
        //This is to prepare script references in PHP files for being processed by the useminPrepare task during the 'deploy_build' run.
        //UseminPrepare task cannot work correctly if the 'bloginfo()' snippet is referenced in a script's src attribute. This is because the useminPrepare task needs
        //the absolute directory path to the files its going to concat and minify.
        //This task only affects PHP files (with bloginfo snippets) in the dist folder.
        replace: {
            wp_bloginfo_references: {
                src: ['<%= config.dist %>/*.php'],            
                dest: '<%= config.dist %>/',             
                replacements: [{
                    //The HTML 5 'data' attribute is used to help identify which
                    //scripts are using <?php bloginfo('template_url'); ?> in their src property.
                    from: "data=\"grunt-js-replace-plugin-remove-wp-bloginfo\" src=\"<?php bloginfo('template_url'); ?>/",                  
                    to: 'src="'
                }]
            }
        },
        
        //Dynamically concatenates and minifies javascript or css files, based on the specified comment blocks in the files with 'build:js'.
        //It will dynamically create the file directory specified in the block statement. So if a file has "build:js javascript/libs/libs-js.min.js" as a block statement, then
        //the directory 'javascript/libs' will be created, and the concatenated/minified file will be put in that directory.
        useminPrepare: {
            html: '<%= config.dist %>/*.php', //Specifies where to look for files to prepare. It's set to look for every php file, to check if it has a block statement.
            options: {
                root: '<%= config.root %>', //Root of the project, needed to be known so do not delete.
                dest: '<%= config.dist %>/' //The place to put the prepared files
            }
        },       
        
        //Update files' script attribute references that have been useminPrepared. As clarification, the name of this task is very misleading, TRY and not get confused with useminPrepare.
        usemin: {
            html: '<%= config.dist %>/*.php',//The dist folder contains the files needed to be ran through the 'usemin' task
            options: {
                blockReplacements: {
                    js: function(block){
                        //Put back the <?php bloginfo('template_url'); ?> snippet.
                        //So that script references will work according to wordpress.
                        //The block object (that's parsed into the function as an argument) contains the destination directory that's specified in the block statement.
                        //So if a file is processed by usemin and has "build:js javascript/libs/libs-js.min.js" as a block statement,
                        //then the block object will contain the string 'javascript/libs/libs-js.min.js'.
                        return '<script src="<?php bloginfo(\'template_url\'); ?>/' + block.dest + '"></script>';
                    }
                }
            }
        }
        
    });
    
    // 3. Where we tell Grunt we plan to use this plug-in.
    
    grunt.loadNpmTasks('grunt-newer'); //Used with other tasks, to run those tasks on source files which have been modified (THIS TASK IS NOT USED. IT CAN BE DELETED)
    grunt.loadNpmTasks('grunt-contrib-concat'); //Javascript concat (THIS TASK IS REQUIRED BY THE USEMINPREPARE AND USEMIN TASKS)
    grunt.loadNpmTasks('grunt-contrib-uglify'); //JavaScript minify (THIS TASK IS REQUIRED BY THE USEMINPREPARE AND USEMIN TASKS)
    grunt.loadNpmTasks('grunt-contrib-watch'); //Watches the project for changes to run various tasks.
    grunt.loadNpmTasks('grunt-contrib-compass'); //A SASS library. If used, the computer will need a download of Ruby, SASS and COMPASS. 
    grunt.loadNpmTasks('grunt-spritesmith'); //If used, the computer will need a download of 'graphics magick software' installed in the execution path.
    grunt.loadNpmTasks('grunt-notify'); //JS notification. Won't work on mac OSX...
    grunt.loadNpmTasks('grunt-contrib-copy'); //Copy files. Use mainly for creating a dist folder for a site
    grunt.loadNpmTasks('grunt-contrib-cssmin'); //Minifies css.
    grunt.loadNpmTasks('grunt-processhtml'); //Change html files. Used for changing directory paths for stylesheets and javascript in build environment.
    grunt.loadNpmTasks('grunt-contrib-clean'); //Delete folders and files
    grunt.loadNpmTasks('grunt-usemin'); //Used for dynamic concatenation and minification processes
    grunt.loadNpmTasks('grunt-text-replace'); //Replace string text throughout files. 

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    
    grunt.registerTask('default', ['watch']); //Type 'grunt' into the terminal and the 'watch' task will be started.
    
    //Type 'grunt deploy_build' into the terminal and a dist folder will be created.
    
    grunt.registerTask('deploy_build', [
        'clean:dist', //Delete any existing dist folders. Do not want duplicates.
        'copy:dist', //Copy folders to create a dist folder
        'replace:wp_bloginfo_references', //Used to remove all occurences of the wordpress 'bloginfo()' snippets that are used in src attributes. This is to prepare for the use of the 'useminPrepare' task. 
        'useminPrepare', //Prepare concatenation and minification processes
        'concat:generated', //Concat javascript. These tasks will be available through the 'useminPrepare' task, as it will dynamically change the gruntfile to include the 'concat:generated' task.
        'uglify:generated', //Minify javascript.
        'processhtml:configSassWpTemplateUrl', //Change the '_wp-url.sass' file to that of the wordpress URL specified at the top of this Gruntfile.
        'compass:dist', //Compile SASS library compass to create style.css with newly added wordpress url
        'clean:styleSheets', //Delete stylesheets folder from the dist folder, as it's not needed in the distributed version of the website
        'usemin' //Put references in files that are needed to be linked to previously concatenated and minified files.
    ]);
    
};