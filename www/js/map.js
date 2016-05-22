var city;
var map, infoWindow, pos;
var marker;

function initMap() {

    var geocoder = new google.maps.Geocoder;
    map = new google.maps.Map(document.getElementById('maps'), {
      center: {lat: 14, lng: 121},
      zoom: 6
    });
    infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        document.getElementById('lat').value = pos.lat;
        document.getElementById('lng').value = pos.lng;
        map.setCenter(pos); 
        geocoder.geocode({'location': pos}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              map.setZoom(11);
              marker = new google.maps.Marker({
                position: pos,
                map: map
              });
              //alert("latitude"+pos.lat+"\nLongitude"+pos.lng);
              infoWindow.open(map, marker);
              city = results[1].address_components[2].long_name;
              infoWindow.setContent(city);
              console.log(city);
              document.getElementById('city').value = city;
              var fullAddress = results[0].formatted_address;
              document.getElementById('address').value = fullAddress;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    /*map.addListener('mousemove', function(event) {
      console.log(
        'lat: ' + event.latLng.lat() + ', ' +
        'lng: ' + event.latLng.lng()
        );
    });*/ 

  }