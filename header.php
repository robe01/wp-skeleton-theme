<!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8) ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->

    <head>
        
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Tells IE to use the latest version possible -->
        <meta name="author" content="INSERT AUTHOR HERE">
        <meta name="website designer and developer" content="Robert Liverpool">
        <meta name="keywords" content="INSERT KEYWORDS HERE">
        <meta name="description" content="<?php bloginfo('description'); ?>">
        <title><?php wp_title('&laquo;', true, 'right'); ?><?php bloginfo('name'); ?></title>
        <link rel="profile" href="http://gmpg.org/xfn/11">
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
        <link rel="shortcut icon" href="<?php bloginfo('template_url'); ?>/favicon.ico" type="image/x-icon">
        
        <!-- Twitter Bootstrap CSS -->
        <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/bootstrap/css/bootstrap.min.css" media="screen" />

        <!-- Font Awesome Icons -->
        <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/bower_components/fontawesome/css/font-awesome.min.css" media="screen" />
        
        <!-- Style Sheet -->
        <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>" media="screen" />
        
        <!-- JavaScript Libraries-->
        <!-- build:js javascript/libs/libs-js.min.js -->
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/bower_components/jquery/dist/jquery.min.js"></script>
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/bower_components/velocity/velocity.min.js"></script>
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/bower_components/velocity/velocity.ui.min.js"></script>
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/bower_components/blast-text/jquery.blast.min.js"></script>
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/bower_components/modernizr/modernizr.js"></script>
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/bower_components/detect-mobile-browser/detectmobilebrowser.js"></script>
        <!-- endbuild -->
        
        <!-- Respond.js and HTML5shiv for IE 8 and lower in order to support HTML 5 elements and CSS 3 media queries -->
        <!--[if lt IE 9]>
            <script src="<?php bloginfo('template_url'); ?>/bower_components/respond-minmax/dest/respond.min.js"></script>
            <script src="<?php bloginfo('template_url'); ?>/bower_components/html5shiv/dist/html5shiv.min.js"></script>
        <![endif]-->
        <?php wp_head(); ?>
        
    </head>
    
    <body>
        
        <header>   
            
        </header>
        
        
		
 