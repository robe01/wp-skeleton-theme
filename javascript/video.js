
//Function for a responsive page height in regards to the fixed header
function responsivePageHeight(){

    //Header height
    var headerHeight = jQuery('#header-info-container').outerHeight();

    //Push the main content down based on the size of the header element
    jQuery('main').css('margin-top',headerHeight);  
}

//Function for responsive video height
function responsiveVideoHeight(){

    //Web browser height
    var viewportHeight = window.innerHeight;

    //Header height
    var headerHeight = jQuery('#header-info-container').outerHeight();

    //Video height
    var viewportMinusHeaderHeight = viewportHeight - headerHeight;

    jQuery('#video-container').outerHeight(viewportMinusHeaderHeight);  
}

//Run function striaght away
responsiveVideoHeight();
responsivePageHeight();


//Change the video height and document height based on screen resize
jQuery(window).resize(function(){
    responsiveVideoHeight();
    responsivePageHeight();
});




//Video down arrow button animation
function animateVideoDownArrow($elementSelected,speed){
    $elementSelected.velocity({bottom: 10},speed).velocity('reverse',{complete: function(){
        animateVideoDownArrow($elementSelected,speed);
    }});
}

//Get the arrow and cashe it, ready to be used to either hide it and fade it in or 
//just show it on screen depending whether the user is on a mobile phone or not
var $videoDownButton = jQuery('#video-down-arrow-button'); //Cache


//Only show video titles if the user isn't on a mobile phone
if(!jQuery.browser.mobile){
    
    $videoDownButton.hide();

    //Video text animation
    jQuery('#video-text').blast({ 
        delimiter: 'word' 
    });

    jQuery('.blast').velocity('transition.slideDownIn',{ stagger: 350, queue: false, complete: function(){

        //Fade down the button when the page loads
        $videoDownButton.velocity('transition.slideUpBigIn', 1000, function(){
            animateVideoDownArrow($videoDownButton,900);
        });
    }});
    
}

