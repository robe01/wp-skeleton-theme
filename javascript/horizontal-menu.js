
//Slide the horizontal menu open on click/change through a toogle like event

var $menuIcon = jQuery('#menu-icon');

$menuIcon.on('click', function(){    

    //Hide header navigation menu and get it's width size
    var headerNavigationWidth = jQuery('#header-navigation').outerWidth(); //Get the width of the header navigation and store it in the previously declared variable
    var headerNavigationSidePadding = jQuery('#header-navigation').css('padding-right'); //Takes the right side padding but both sides should be equal
    var headerNavigationSidePaddingWithPixelSyntax = jQuery('#header-navigation').css('padding-right'); //Takes the right side padding but both sides should be equal    
    var headerNavigationSidePadding = parseInt(headerNavigationSidePaddingWithPixelSyntax.replace('px',''));

    if(jQuery(this).attr('data-header-menu-icon-toggle') === 'off')
    {
        jQuery(this).attr('data-header-menu-icon-toggle','on');
        jQuery(this).removeClass('default-menu-icon-colour').addClass('toggle-menu-icon-colour');
        jQuery('body').addClass('body-position-relative').velocity("stop").velocity({right: headerNavigationWidth},250,function(){
            if(jQuery(window).outerWidth() > 768){
                jQuery('#header-navigation > ul > li').velocity('transition.slideRightBigIn',{ stagger: 50});
            }
            else{
                jQuery('#header-navigation > ul > li').show();
            }
            jQuery('#header-navigation').css('z-index','99999');
        });
    }
    else if(jQuery(this).attr('data-header-menu-icon-toggle') === 'on')
    {
        jQuery(this).attr('data-header-menu-icon-toggle','off');
        jQuery('#header-navigation').css('z-index','-99999');
        jQuery(this).removeClass('toggle-menu-icon-colour').addClass('default-menu-icon-colour');
        jQuery('body').velocity("stop").velocity({right: 0},200,function(){
            jQuery('#header-navigation > ul > li').css('display','none');
            jQuery('body').removeClass('body-position-relative');
        });
    }
});

jQuery('#cancel-header-navigation-icon').on('click', function(){ 
    $menuIcon.attr('data-header-menu-icon-toggle','off');
    jQuery('#header-navigation').css('z-index','-99999');
    $menuIcon.removeClass('toggle-menu-icon-colour').addClass('default-menu-icon-colour');
    jQuery('body').velocity("stop").velocity({right: 0},200,function(){
        jQuery('#header-navigation > ul > li').css('display','none');
        jQuery('body').removeClass('body-position-relative');
    });
});
    
    