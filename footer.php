        <footer>	

        </footer>

        <!-- Javascript Collision Prevention -->
        <script>
            jQuery.noConflict(); //Change $ syntax to prevent collision with other javascript frameworks
        </script>
        
        <!-- Authored JavaScript Minified -->
        <!-- build:js javascript/authored/authored-js.min.js -->
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/javascript/video.js"></script>
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/javascript/scroll-to-links.js"></script>
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/javascript/horizontal-menu.js"></script>
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/javascript/image-button-effect.js"></script>
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/javascript/scroll-down-effects.js"></script>
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/javascript/pagination-buttons.js"></script>
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/javascript/panel-collapse-toggle.js"></script>
        <script data="grunt-js-replace-plugin-remove-wp-bloginfo" src="<?php bloginfo('template_url'); ?>/javascript/google-maps.js"></script>
        <!-- endbuild -->
        
    <?php wp_footer(); ?>
    </body>
</html>


