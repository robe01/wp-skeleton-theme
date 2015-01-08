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
