angular.module('starter.map', [])

.controller('map', function($scope, $ionicModal, $ionicLoading, $ionicPopup, $state, Settings) {
  var PLAY_BUTTON_CLASS = "ion-play button-balanced",
      PAUSE_BUTTON_CLASS = "ion-pause button-assertive";

  $scope.state = {
    enabled: false,
    isMoving: false,
    startButtonIcon: PLAY_BUTTON_CLASS
  };

  /**
  * Show an alert
  * @param {String} title
  * @param {String} content
  */
  $scope.showAlert = function(title, content) {
    $ionicPopup.alert({
      title: title,
      content: content
    });
  };

  // Convenient, private reference to BackgroundGeolocation API
	var bgGeo, map;

  /**
  * BackgroundGeolocation Location callback
  * @param {Object} location
  * @param {Integer} taskId
  */
  function onLocation(location, taskId) {
    console.log('[js] location: ', JSON.stringify(location));
    centerOnMe(location);
    bgGeo.finish(taskId);
  }
  /**
  * Background Geolocation error callback
  * @param {Integer} code
  */
  function onLocationError(error) {
    console.error('[js] Location error: ', error);
  }
  /**
  * Background Geolocation HTTP callback
  */
  function onHttpSuccess(response) {
    console.info('[js] HTTP success', response);
  }
  /**
  * BackgroundGeolocation HTTP error
  */
  function onHttpError(error) {
    console.info('[js] HTTP ERROR: ', error);
  };
  /**
  * Background Geolocation motionchange callback
  */
  function onMotionChange(isMoving, location, taskId) {
    console.log('[js] onMotionChange: ', isMoving, JSON.stringify(location));
    $scope.state.isMoving = isMoving;

    // Change state of start-button icon:  [>] or [||] 
    $scope.$apply(function() {
      $scope.isChangingPace = false;
      $scope.state.startButtonIcon  = (isMoving) ? PAUSE_BUTTON_CLASS : PLAY_BUTTON_CLASS;
    });

    if (map) {
      map.setCenter(new google.maps.LatLng(location.coords.latitude, location.coords.longitude));
      if (!isMoving) {
        setStationaryMarker(location);
      } else if (stationaryRadiusMarker) {
        setCurrentLocationMarker(location);
        stationaryRadiusMarker.setMap(null);
      }
    }
    bgGeo.finish(taskId); 
  }
  /**
  * BackgroundGeolocation heartbeat event handler
  */
  function onHeartbeat(params) {
    var shakes = params.shakes;
    var location = params.location;
    console.log('- HEARTBEAT shakes: ', params.shakes, location);
    bgGeo.getCurrentPosition(function(location) {
      console.log("- location: ", location);
    });
  }
  /**
  * BackgroundGeolocation schedule event-handler
  */
  function onSchedule(state) {
    console.info('- Schedule event: ', state.enabled, state);

    $scope.$apply(function() {
      $scope.state.enabled = state.enabled;
      $scope.state.isMoving = false;
    });
  }

  /**
  * BackgroundGeolocation geofence callback
  */
  function onGeofence(params, taskId) {
    console.log('- onGeofence: ', JSON.stringify(params, null, 2));
    
    $scope.showAlert('Geofence ' + params.action, "Identifier: " + params.identifier);
    
    var marker  = getGeofenceMarker(params.identifier);
    var geofence = marker.params;
    if (!geofence) {
      return;
    }
    // Destroy the geofence?
    if (!geofence.notifyOnDwell || (geofence.notifyOnDwell && params.action === "DWELL")) {
      bgGeo.removeGeofence(params.identifier, function() {
        // Grey-out the google.maps.Circle to show it's been triggered.
        if (marker) {
          marker.removed = true;
          marker.setOptions({
            fillColor: '#000000',
            fillOpacity: 0.3,
            strokeColor: '#000000',
            strokeOpacity: 0.5
          });
        }
        // We're inside a nested async callback here, which has now completed.  #finish the outer #onGeofence taskId now.
        bgGeo.finish(taskId);
      }, function(error) {
        console.log('Failed to remove geofence: ' + error);
        // Finish outer #onGeofence taskId now.
        bgGeo.finish(taskId);
      });
    }
  }






  /**
  * Configure the Google Map
  */
  function configureMap() {
    var customMapType = new google.maps.StyledMapType(
      [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
      ,{name: 'nc10'});


    

    
    // Create map
    map = new google.maps.Map(document.getElementById("map"), {
      center: new google.maps.LatLng(14,121),
      zoom: 10,
      zoomControl: false,
      panControl: false,
      streetViewControl: false,
      mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'nc10']
    }
  });
  map.mapTypes.set('nc10', customMapType);
  map.setMapTypeId('nc10');
    map.setCenter({lat: 14.55814, lng: 121.0542306});
     var location; 
        $(function(){
          $.getJSON('http://10.99.0.65/juanasafe/www/api/report', function(data){
              $.each(data, function(i, field){
                var lat = parseFloat(field.lat);
                var lng = parseFloat(field.lng);
                pos = {
                  'lat': lat,
                  'lng': lng
                }
               marker = addMarker(pos, map);
                //createGeofenceMarker({radius: 300, latitude: lat, longitude: lng});
                marker.addListener('click', function(id){
                  id = field.id;
                  $(function(){
                    $.ajax({
                      url: 'http://10.99.0.65/juanasafe/www/api/report/'+id,
                      type: 'get',
                      success: function(data){
                          $('.custom-toast').css('display', 'block');
                          $('.custom-toast .topic-holder').html(data[0]["topic"]);
                          $('.custom-toast .address-holder').html(data[0]["city"]);
                          $('.custom-toast .time-holder').html(data[0]["created_at"]);
                          setTimeout(function(){
                            $('.custom-toast').css('display', 'none');
                          },3000);

                          console.log(data);
                      },
                      error: function(msg){
                          console.log(msg);
                      }
                    })
                  });
                });
              });
          });
        });

    // Add custom LongPress event to google map so we can add Geofences with longpress event!
    new LongPress(map, 500);

    // "Add Geofence" cursor.
    geofenceCursor = new google.maps.Marker({
      map: map,
      clickable: false,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 100,
        fillColor: '#11b700',   //'2f71ff',
        fillOpacity: 0.2,
        strokeColor: '#11b700', // 2f71ff
        strokeWeight: 2,
        strokeOpacity: 0.9
      }
    });

    // Tap&hold detected.  Play a sound a draw a circular cursor.
    google.maps.event.addListener(map, 'longpresshold', function(e) {
      geofenceCursor.setPosition(e.latLng);
      geofenceCursor.setMap(map);
      bgGeo.playSound(Settings.getSoundId('LONG_PRESS_ACTIVATE'))
    });

    // Longpress cancelled.  Get rid of the circle cursor.
    google.maps.event.addListener(map, 'longpresscancel', function() {
      geofenceCursor.setMap(null);
      bgGeo.playSound(Settings.getSoundId('LONG_PRESS_CANCEL'));
    });

    // Longpress initiated, add the geofence
    google.maps.event.addListener(map, 'longpress', function(e) {
      onAddGeofence(geofenceCursor.getPosition());
      geofenceCursor.setMap(null);
    });
  };
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var image = 'img/marker.png';
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: image
  });
  return marker;
}

  /**
  * Configure BackgroundGeolocation plugin
  */
  function configureBackgroundGeolocation() {
    var config = Settings.getConfig();
    
    // NOTE:  Optionally generate a schedule here.  @see /www/js/tests.js
    //  1: how many schedules?
    //  2: delay (minutes) from now to start generating schedules
    //  3: schedule duration (minutes)
    //  4: time between (minutes) generated schedule ON events
    //
    // UNCOMMENT TO AUTO-GENERATE A SERIES OF SCHEDULE EVENTS BASED UPON CURRENT TIME:
    //config.schedule = Tests.generateSchedule(24, 1, 30, 30);
    //

    config.params = {};

    // Attach Device info to BackgroundGeolocation params.device    
    config.params.device = ionic.Platform.device();
    
    bgGeo = window.BackgroundGeolocation;

    bgGeo.on('location', onLocation, onLocationError);
    bgGeo.on('motionchange', onMotionChange);
    bgGeo.on('geofence', onGeofence);
    bgGeo.on('http', onHttpSuccess, onHttpError);
    bgGeo.on('heartbeat', onHeartbeat);
    bgGeo.on('schedule', onSchedule);

    // Ok, now #configure it!
    bgGeo.configure(config, function(state) {
      console.info('- configure success: ', state);

      // If configured with a Schedule, start the Scheduler now.
      if (state.schedule) {
        bgGeo.startSchedule(function() {
          console.log('[js] Start schedule success');
        }, function(error) {
          console.warn('- FAILED TO START SCHEDULE: ', error);
        });
      }

      $scope.$apply(function() {
        $scope.state.enabled = state.enabled;
        $scope.state.isMoving = state.isMoving;
      });
    });

    // If BackgroundGeolocation is monitoring geofences, fetch them and add map-markers
    bgGeo.getGeofences(function(rs) {
      for (var n=0,len=rs.length;n<len;n++) {
        createGeofenceMarker(rs[n]);
      }
    });
  }

  function configureBackgroundFetch() {
    var config = Settings.getConfig();
    var Fetcher = window.BackgroundFetch;
    // Your background-fetch handler.
    var fetchCallback = function() {
        console.log('[js] BackgroundFetch initiated');
        Fetcher.finish();
    }

    var failureCallback = function() {
        console.log('- BackgroundFetch failed');
    };

    Fetcher.configure(fetchCallback, failureCallback, {
        stopOnTerminate: config.stopOnTerminate
    });
  }
  /**
  * Platform is ready.  Boot the Home screen
  */
  function onPlatformReady() {
    configureMap();
    // Configure BackgroundGeolocation
    if (!window.BackgroundGeolocation) {
      console.warn('Could not detect BackgroundGeolocation API');
      return;
    }
    if (window.BackgroundFetch) {
      configureBackgroundFetch();
    }
    configureBackgroundGeolocation();
  }
  
  // Build "Add Geofence" Modal.
  $ionicModal.fromTemplateUrl('js/app/map/add-geofence.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addGeofenceModal = modal;
  });

  // Build "Show Geofence" Modal.
  $ionicModal.fromTemplateUrl('js/app/map/show-geofence.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.showGeofenceModal = modal;
  });

  function onAddGeofence(latLng) {
    $scope.geofenceRecord = {
      latitude: latLng.lat(),
      longitude: latLng.lng(),
      identifier: '',
      radius: 200,
      notifyOnEntry: true,
      notifyOnExit: false,
      notifyOnDwell: false,
      loiteringDelay: undefined
    };
    $scope.addGeofenceModal.show();
  }

  /**
  * Create geofence click-handler
  */
  $scope.onCreateGeofence = function() {
    $scope.addGeofenceModal.hide();
    bgGeo.addGeofence($scope.geofenceRecord, function() {
      bgGeo.playSound(Settings.getSoundId('ADD_GEOFENCE'));
      createGeofenceMarker($scope.geofenceRecord);
    }, function(error) {
      console.error(error);
      alert("Failed to add geofence: " + error);
    });
  };
  /**
  * Cancel geofence modal
  */
  $scope.onCancelGeofence = function() {
    bgGeo.playSound(Settings.getSoundId('LONG_PRESS_ACTIVATE'));
    $scope.modal.hide();
  };
  /**
  * show geofence modal
  * @param {Google.maps.Circle} circle
  */
  $scope.onShowGeofence = function(params) {
    bgGeo.playSound(Settings.getSoundId("LONG_PRESS_ACTIVATE"));
    $scope.geofenceRecord = params;
    $scope.showGeofenceModal.show();
  };
  /**
  * Remove geofence click-handler
  */
  $scope.onRemoveGeofence = function() {
    var identifier = $scope.geofenceRecord.identifier;
    removeGeofence(identifier);
    $scope.showGeofenceModal.hide();
  };
  /**
  * Create google.maps.Circle geofence marker.
  * @param {Object}
  */
  var geofenceMarkers = [];
  var createGeofenceMarker = function(params) {
    // Add longpress event for adding GeoFence of hard-coded radius 200m.
    var geofence = new google.maps.Circle({
      zIndex: 100,
      fillColor: '#11b700',
      fillOpacity: 0.2,
      strokeColor: '#11b700',
      strokeWeight: 2,
      strokeOpacity: 0.9,
      params: params,
      radius: parseInt(params.radius, 10),
      center: new google.maps.LatLng(params.latitude, params.longitude),
      map: map
    });
    // Add 'click' listener to geofence so we can edit it.
    google.maps.event.addListener(geofence, 'click', function() {
      $scope.onShowGeofence(this.params);
    });
    geofenceMarkers.push(geofence);
    return geofence;
  };
  /**
  * Fetch a google.maps.Circle marker
  */
  var getGeofenceMarker = function(identifier) {
    var index = geofenceMarkers.map(function(geofence) { return geofence.params.identifier; }).indexOf(identifier);
    if (index >= 0) {
      return geofenceMarkers[index];
    }
    return -1;
  };
  /**
  * Remove a geofence
  */
  var removeGeofence = function(identifier) {
    var marker = getGeofenceMarker(identifier);
    if (marker) {
      var index = geofenceMarkers.indexOf(marker);
      geofenceMarkers.splice(index, 1);
      marker.setMap(null);
      if (marker.removed) {
        return;
      }
    }
    bgGeo.removeGeofence(identifier);
  };

  
  var currentLocation, 
      lastLocation,
      currentLocationMarker, locationAccuracyMarker, polyline, 
      markers = [], geofenceMarkers = [];
  /**
  * Create current position Marker
  */
  function setCurrentLocationMarker(location) {
    // Set currentLocation @property
    currentLocation = location;
    var coords = location.coords;

    if (!currentLocationMarker) {
      currentLocationMarker = new google.maps.Marker({
        map: map,
        zIndex: 10,
        title: 'Current Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#2677FF',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeOpacity: 1,
          strokeWeight: 6
        }
      });
      locationAccuracyMarker = new google.maps.Circle({
        zIndex: 9,
        fillColor: '#3366cc',
        fillOpacity: 0.4,
        strokeOpacity: 0,
        map: map
      });
    }

    if (!polyline) {
      polyline = new google.maps.Polyline({
        zIndex: 1,
        map: map,
        geodesic: true,
        strokeColor: '#2677FF',
        strokeOpacity: 0.7,
        strokeWeight: 5
      });
    }
    var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
    
    if (lastLocation) {
      var last = lastLocation;
      // Drop a breadcrumb of where we've been.
      markers.push(new google.maps.Marker({
        zIndex: 1,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: '#11b700',//'26cc77',
          fillOpacity: 1,
          strokeColor: '#0d6104',
          strokeWeight: 1,
          strokeOpacity: 0.7
        },
        map: map,
        position: new google.maps.LatLng(lastLocation.coords.latitude, lastLocation.coords.longitude)
      }));
    }

    // Update our current position marker and accuracy bubble.
    currentLocationMarker.setPosition(latlng);
    locationAccuracyMarker.setCenter(latlng);
    locationAccuracyMarker.setRadius(location.coords.accuracy);

    if (location.sample === true) {
      return;
    }
    
    // Add breadcrumb to current Polyline path.
    polyline.getPath().push(latlng);
    lastLocation = location;

    $scope.$apply(function() {
      $scope.odometer = (location.odometer/1000).toFixed(1);
    });
  };

  /**
  * Red stationary-radius marker
  */
  var stationaryRadiusMarker;
  function setStationaryMarker(location) {
    setCurrentLocationMarker(location);

    var coords = location.coords;
    
    if (!stationaryRadiusMarker) {
      stationaryRadiusMarker = new google.maps.Circle({
        zIndex: 0,
        fillColor: '#ff0000',
        strokeColor: '#aa0000',
        strokeWeight: 2,
        fillOpacity: 0.5,
        strokeOpacity: 0.5,
        map: map
      });
    }
    var radius = 50;
    var center = new google.maps.LatLng(coords.latitude, coords.longitude);
    stationaryRadiusMarker.setRadius(radius);
    stationaryRadiusMarker.setCenter(center);
    stationaryRadiusMarker.setMap(map);
    map.setCenter(center);
  };

  /**
  * Center users's current position on Map
  */
  function centerOnMe(location) {
    map.setCenter(new google.maps.LatLng(location.coords.latitude, location.coords.longitude));
    setCurrentLocationMarker(location);
  };

	// Add BackgroundGeolocationService event-listeners when Platform is ready.
  ionic.Platform.ready(onPlatformReady);

  /**
  * Stop / Start BackgroundGeolocation tracking button handler.
  */
  $scope.onToggleEnabled = function() {
    if (!bgGeo) { return;}
    if ($scope.state.enabled) {
      
      bgGeo.start( function() {
        console.log('[js] BackgroundGeolocation started');

        // If BackgroundGeolocation is monitoring geofences, fetch them and add map-markers
        bgGeo.getGeofences(function(rs) {
          for (var n=0,len=rs.length;n<len;n++) {
            createGeofenceMarker(rs[n]);
          }
        });
      });
    } else {
      bgGeo.stop(function() {
        console.info('[js] BackgroundGeolocation stopped');
      });

      // Reset the odometer.
      bgGeo.resetOdometer(function() {
        $scope.$apply(function() {
          $scope.odometer = 0;
        });
      });

      // Clear map markers
      bgGeo.playSound(Settings.getSoundId('BUTTON_CLICK'));
      $scope.state.isMoving = false;
      $scope.state.startButtonIcon = PLAY_BUTTON_CLASS;
      
      // Clear previousLocation
      lastLocation = undefined;

      // Clear location-markers.
      var marker;
      for (var n=0,len=markers.length;n<len;n++) {
        marker = markers[n];
        marker.setMap(null);
      }
      markers = [];

      // Clear geofence markers.
      for (var n=0,len=geofenceMarkers.length;n<len;n++) {
        marker = geofenceMarkers[n];
        marker.setMap(null);
      }
      geofenceMarkers = [];

      // Clear red stationaryRadius marker
      if (stationaryRadiusMarker) {
        stationaryRadiusMarker.setMap(null);
        stationaryRadiusMarker = null;
      }

      // Clear blue route PolyLine
      if (polyline) {
        polyline.setMap(null);
        polyline = undefined;
      }
    }
  }

  /**
  * getCurrentPosition button handler
  */
  $scope.getCurrentPosition = function() {
    if (!bgGeo) { return; }
    bgGeo.getCurrentPosition(function(location, taskId) {
      console.info('[js] getCurrentPosition: ', JSON.stringify(location));
      centerOnMe(location);
      bgGeo.finish(taskId);
    }, function(error) {
      console.warn('[js] getCurrentPosition error: ', error);
    }, {
      timeout: 10,
      extras: {name: 'getCurrentPosition'}
    })
  }

  $scope.isChangingPace = false;
  $scope.onClickChangePace = function() {
    var willStart = !$scope.state.isMoving;
    console.log('onClickStart: ', willStart);
    $scope.isChangingPace = true;

    bgGeo.changePace(willStart, function() {
      $scope.state.isMoving    = willStart;
      $scope.$apply(function() {
        $scope.state.startButtonIcon  = (willStart) ? PAUSE_BUTTON_CLASS : PLAY_BUTTON_CLASS;
      });
    });
  };
  /**
  * Show Settings screen button handler
  */
  $scope.onClickSettings = function() {
    alert('onClickSettings');
    if (bgGeo) {
      bgGeo.playSound(Settings.getSoundId('BUTTON_CLICK'));
    }
    $state.go('settings');
  };

});
