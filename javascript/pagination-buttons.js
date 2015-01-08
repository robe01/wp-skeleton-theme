
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