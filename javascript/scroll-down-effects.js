
var $window = jQuery(window); //Cache the window browser selection


//A function that sets the element's opacity to zero
function setElementsOpacityToZero(elementsToSetOpacityToZero){
    elementsToSetOpacityToZero.each(function(){
        
        //Check whether the user has already scrolled past an element within the document. 
        //If so, then don't apply an opacity class to the element so that it isn't animated in on scroll.
        //This is so that when a user refreshes the website at a particular point in the page, 
        //elements are not animated in again, as they've already been scrolled past by.
        
        var elementPosition = jQuery(this).offset().top; //Get the element's position within the document
        var webBrowserHeight = $window.innerHeight(); //Get window browser height
        var distanceBetweenBrowserWindowAndElement = elementPosition - webBrowserHeight;
        
        if(distanceBetweenBrowserWindowAndElement > $window.scrollTop()){
            jQuery(this).addClass('scroll-in-opacity');
        }
    });
}


//A function that animates the elements based on their position within the document and window scroll
function animateElementOnScrollPosition(animationEffect,selectedElementsToAnimate,duration,removeOffSet){

    var webBrowserHeight = $window.innerHeight(); //Get window browser height

    selectedElementsToAnimate.each(function(){
        
        //Only animate elements that have the opacity class. This is so that if the user
        //resizes their browsers back and fourth, the scroll in animation doesn't reset
        //for elements that have already been animated in
        if(jQuery(this).hasClass('scroll-in-opacity')){
        
            var elementPosition = jQuery(this).offset().top; //Get the element's position within the document

            if(removeOffSet === 'true'){
                var offSetDistance  = 0;
            }
            else{
                var offSetDistance  = jQuery(this).outerHeight()/2; //Get half the element's height and use that as the distance offset, so that the window will animate the element once half of it is on screen
            }
            var distanceBetweenBrowserWindowAndElement = (elementPosition - webBrowserHeight) + offSetDistance; //Calculate the distance between the browser window and the element within the document with an offset included 
            var elementId = this.id; //Store the id of the element in a variable to be used in the window scroll event 
            var $this = jQuery(this);

            $window.on('scroll.'+elementId,function(){
                if(distanceBetweenBrowserWindowAndElement < $window.scrollTop()){
                    jQuery("#" + elementId).velocity(animationEffect,{duration: duration, queue: false, complete: function(){
                  
                        $this.removeClass('scroll-in-opacity');//Remove the opacity class as the element has now been animated in
                        
                    }});
                    $window.off('.'+elementId);//Remove the event handler
                }
            });
        }
    }); 
}

//A function for removing the opacity 0 class on all elements. 
//This happens when the screen is smaller than 768px in width and needs to have 
//all scroll in animation removed.

function removeOpacityClassOnScrollElements(selectedElements){
    selectedElements.each(function(){
        jQuery(this).removeClass('scroll-in-opacity');
    }); 
}



//CALLING OF FUNCTIONS section --->



//Declare elements to be scrolled in

var $animateSlideDownIn = jQuery('#section-one-heading, #section-two-heading, #section-three-heading, #section-four-heading, #section-five-heading'); //Cache elements selected to be animated on scroll
var $animateSlideRightIn = jQuery('#section-1-content-info-2, #personal-info, #section-info-content-container-2, #section-info-content-container-4, #contact-information-list, #right-pagination-arrow');
var $animateSlideLeftIn = jQuery('#section-1-content-info-1, #section-info-content-container-1, #section-info-content-container-3, #left-pagination-arrow');
var $animateSlideUpIn = jQuery('#personal-img');



//When the page loads, check whether its not a mobile phone device
//if it is, then it's okay to animate elements in on window scrolling

if(!jQuery.browser.mobile){

    //Set element's opacity to zero
    setElementsOpacityToZero($animateSlideDownIn);
    setElementsOpacityToZero($animateSlideLeftIn);
    setElementsOpacityToZero($animateSlideRightIn);
    setElementsOpacityToZero($animateSlideUpIn);

    //Animate elements sliding down
    animateElementOnScrollPosition('transition.slideDownBigIn', $animateSlideDownIn, 1000);

    //Animate elements sliding right or left
    animateElementOnScrollPosition('transition.slideLeftBigIn', $animateSlideLeftIn, 1000);
    animateElementOnScrollPosition('transition.slideRightBigIn', $animateSlideRightIn, 1000);

    //Animate elements sliding up
    animateElementOnScrollPosition('transition.slideUpBigIn', $animateSlideUpIn, 1000);
}


//Window resize function

$window.resize(function(){
    
    //If screen is a mobile phone device, then remove all scroll events on the window
    //and remove all elements' opacity 0 class that are to be animated on window scroll 
    
    if(jQuery.browser.mobile){
        
        $window.off('scroll');
        removeOpacityClassOnScrollElements($animateSlideDownIn);
        removeOpacityClassOnScrollElements($animateSlideRightIn);
        removeOpacityClassOnScrollElements($animateSlideLeftIn);
        removeOpacityClassOnScrollElements($animateSlideUpIn);
    }
    else{
        
        //Remove all scroll events on the window because resizing the window means you need to re-calculate 
        //the positioning of elements in the document
        $window.off('scroll');
                
        //If the user happens to resize their window browser from less than 768px in width
        //to something larger, then re-apply the scroll in animation effects
        
        //Animate elements sliding down
        animateElementOnScrollPosition('transition.slideDownBigIn', $animateSlideDownIn, 1000);

        //Animate elements sliding right or left
        animateElementOnScrollPosition('transition.slideLeftBigIn', $animateSlideLeftIn, 1000);
        animateElementOnScrollPosition('transition.slideRightBigIn', $animateSlideRightIn, 1000);

        //Animate elements sliding up
        animateElementOnScrollPosition('transition.slideUpBigIn', $animateSlideUpIn, 1000);
    }
});
