
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
    
    
//Image service hover

function imageButtonToggleHoverEventHandlerAssign(selector){
    jQuery(selector).on('mouseover', function(){
        jQuery(this).siblings('img').css('opacity', '0.5');
        jQuery(this).siblings('img').velocity("stop").velocity({scale: 1.25},{duration: 'fast', queue: false});
    });

    jQuery(selector).on('mouseout', function(){
        jQuery(this).siblings('img').css('opacity', '1');
        jQuery(this).siblings('img').velocity("stop").velocity({scale: 1.0},{duration: 'fast', queue: false});
    });
}

//Using modernizr, if the device the website is on does not have a touch screen, then 
//add the image button hover event handlers. 

if(!Modernizr.touch){
    imageButtonToggleHoverEventHandlerAssign('.image-button-toggle-layer');
}

//Service image button slider effect

function imageButtonToggleClickEventHandlerAssign(selector){
    jQuery(selector).on('click.show', function(){
        if(jQuery(this).attr('data-image-button-toggle-layer') === 'off'){
            jQuery(this).attr('data-image-button-toggle-layer','on');
            jQuery(this).removeClass('cursor-pointer');
            jQuery(this).addClass('close-cursor');
            jQuery(this).siblings('.service-title').find('.is-table > .table-cell > .testimonial-quote').hide();
            jQuery(this).siblings('.service-title').find('.is-table > .table-cell > .publish-date').show();
            jQuery(this).siblings('.background-slide-toggle').velocity("stop").velocity({width: 100+'%'}, {duration: 250, queue: false, complete: function(){
                jQuery(this).siblings('.service-title').find('.is-table > .table-cell > .image-content-info').velocity("stop").velocity('transition.slideUpBigIn',400);
            }});
        }
        else if(jQuery(this).attr('data-image-button-toggle-layer') === 'on'){
            jQuery(this).attr('data-image-button-toggle-layer','off');
            jQuery(this).siblings('.service-title').find('.is-table > .table-cell > .image-content-info').velocity("stop").velocity('transition.slideDownBigOut', { duration: 400, complete: function(){
                jQuery(this).parents('.service-title').siblings('.background-slide-toggle').velocity("stop").velocity({width: 0+'%'}, {duration: 250, queue: false, complete: function(){
                    jQuery(this).siblings('.service-title').find('.is-table > .table-cell > .testimonial-quote').show();
                    jQuery(this).siblings('.service-title').find('.is-table > .table-cell > .publish-date').hide(); 
                }});
                jQuery(this).parents('.service-title').siblings('.image-button-toggle-layer').addClass('cursor-pointer');
            }}); 
        }
    });
}

imageButtonToggleClickEventHandlerAssign('.image-button-toggle-layer');





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


//Use Ajax to load more testimonies

function paginationButtonsEventHandlerAssign(){
    
    var $paginationButtons = jQuery('.pagination-buttons'); //Cache pagination buttons selection

    $paginationButtons.on('click', function(event){
        
        if($paginationButtons.attr('data-pagination-button') === 'off'){
            
            $paginationButtons.attr('data-pagination-button','on'); //Prevent the user spamming both the left and right pagination buttons, so that they're animations run smooth
            event.preventDefault(); //Stop pagination link
            var $link = jQuery(this).attr('href'); //Get the href attribute of the pagination button
            var $testimonialSection = jQuery('#testimonial-section'); //Cache selection

            //Load via ajax new testimonials
            $testimonialSection.velocity("fadeOut", { display: "block" }).load($link+' #testimonial-section', function(){  
                $testimonialSection.velocity("fadeIn", { display: "block", complete: function(){
                    paginationButtonsEventHandlerAssign();
                    imageButtonToggleHoverEventHandlerAssign('#testimonial-section > .service-image-container > .image-button-toggle-layer');
                    imageButtonToggleClickEventHandlerAssign('#testimonial-section > .service-image-container > .image-button-toggle-layer'); 
                    $paginationButtons.attr('data-pagination-button','off');
                }});
            });
        }
    });    
}

//Run only if the screen is bigger than 768px in width. Intended for devices that are not mobile phones
if($window.width() > 768){

    paginationButtonsEventHandlerAssign();

}
//Panel Collapse Toggle

function panelTogglecollapseEventHandler(cachedJquerySelector){
    
    cachedJquerySelector.on('click',function(){

        var parentElementIndex = jQuery(this).parent().index(); //Parent index will represent the h3's index, as each panel only has one h3

        cachedJquerySelector.each(function(index){
            if(index !== parentElementIndex){//Do no run the loop on the h3 that has been clicked, or you won't be able to shut the panel on itself
                if(jQuery(this).attr('data-panel-collapse-toggle') === 'on'){
                    jQuery(this).attr('data-panel-collapse-toggle','off');
                    jQuery(this).next('p').hide();
                    jQuery(this).children('i').removeClass('fa fa-chevron-circle-down').addClass('fa fa-chevron-circle-right');
                }
            }
        });

        if(jQuery(this).attr('data-panel-collapse-toggle') === 'off'){//if the h3 is off, then turn it on
            jQuery(this).next('p').show();
            jQuery(this).attr('data-panel-collapse-toggle','on');
            jQuery(this).children('i').removeClass('fa fa-chevron-circle-right').addClass('fa fa-chevron-circle-down');
        }
        else{//if the h3 is on, then turn it off
            jQuery(this).next('p').hide();
            jQuery(this).attr('data-panel-collapse-toggle','off'); 
            jQuery(this).children('i').removeClass('fa fa-chevron-circle-down').addClass('fa fa-chevron-circle-right');
        }
    });
}


//Panel Collapse Toggle for services

var $collapsePanelOne = jQuery('#collapse-panel-container-1 .panel-collapse > h3');
var $collapsePanelTwo = jQuery('#collapse-panel-container-2 .panel-collapse > h3');
panelTogglecollapseEventHandler($collapsePanelOne);
panelTogglecollapseEventHandler($collapsePanelTwo);


/*//Google Map API config

function initialize()
{  
    //Map properties 1
    var mapProp1 = {
        center: new google.maps.LatLng(51.50446,-0.08316),
        zoom: 17,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        disableDefaultUI:true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        //styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]}]
    };


    //Map properties 2
    var mapProp2 = {
        center: new google.maps.LatLng(51.54646,-0.16140),
        zoom: 17,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        disableDefaultUI:true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        //styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]}]
    };


    //Declaring a map object and display it in the specified element
    var map1 = new google.maps.Map(document.getElementById('google-map-1'), mapProp1);
    var map2 = new google.maps.Map(document.getElementById('google-map-2'), mapProp2);




    //MAP RESPONSIVE---------------->

    //Add an event listener for resizing the map when the web browser window is resized
    google.maps.event.addDomListener(window, "resize", function(){
        //Resize map 1
        var center = map1.getCenter();
        google.maps.event.trigger(map1, "resize");
        map1.setCenter(center); 

        //Resize map 2
        var center = map2.getCenter();
        google.maps.event.trigger(map2, "resize");
        map2.setCenter(center); 
    });




    //MAP MARKER---------------->

    //Map 1 marker properties
    var marker=new google.maps.Marker({
        position:mapProp1.center
    });
    marker.setMap(map1);

    //Map 2 marker properties
    var marker=new google.maps.Marker({
        position:mapProp2.center
    });
    marker.setMap(map2);

}
google.maps.event.addDomListener(window, 'load', initialize);*/
