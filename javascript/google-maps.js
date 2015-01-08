
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
