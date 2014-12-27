<?php

/*Remove the p tags for page and post content*/
remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );


/*Hide Admin Bar*/
add_filter('show_admin_bar', '__return_false');


//Enable support for thumbnails
add_theme_support( 'post-thumbnails' ); 

    



