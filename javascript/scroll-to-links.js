//Scroll to link jQuery + velocity JS plugin

jQuery('a[href^="#"]').on('click', function(event){
    event.preventDefault(); //Prevent default link 
    var headerNavigationHeight = jQuery('#header-info-container').outerHeight()-1; //Get height of header
    var $linkTarget = jQuery(this).attr('href'); //Get the href of the anchor attribute
    var $jqueryLinkTargetObject = jQuery($linkTarget); //Cache it as a jQuery select

        jQuery('#menu-icon').attr('data-header-menu-icon-toggle','off');
        jQuery('#header-navigation').css('z-index','-99999');
        jQuery('#menu-icon').removeClass('toggle-menu-icon-colour').addClass('default-menu-icon-colour');
        jQuery('body').velocity("stop").velocity({right: 0},200,function(){
            jQuery('body').removeClass('body-position-relative');
            jQuery('#header-navigation > ul > li').css('display','none');
            $jqueryLinkTargetObject.velocity("scroll", {duration: 1000, offset: -headerNavigationHeight, easing: "easeInOutCirc"}); //Scroll to link
        });  
});

