function createMap(selector, coord) {
    var myLatlng = new google.maps.LatLng(coord.x, coord.y);
    var mapProp= {
        center: myLatlng,
        zoom:10,
    };
    var map = new google.maps.Map(document.querySelector(selector), mapProp);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
    });
}