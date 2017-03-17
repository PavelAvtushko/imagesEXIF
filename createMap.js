var mapScale = 5;

function Map(selector, coord) {
    var myLatlng = new google.maps.LatLng(coord.x, coord.y);
    var mapProp= {
        center: myLatlng,
        zoom: mapScale,
    };
    this.map = new google.maps.Map(document.querySelector(selector), mapProp);
    this.marker = new google.maps.Marker({
        position: myLatlng,
        map: this.map
    });
}


Map.prototype.changeMapCoord = function(coord){
    var newLatlng = new google.maps.LatLng(coord.x, coord.y);
    this.map.setCenter(newLatlng);
    this.marker.setMap(null);
    this.marker = new google.maps.Marker({
        position: newLatlng,
        map: this.map
    });
}
