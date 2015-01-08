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



