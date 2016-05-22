angular.module('app.controllers', [])

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {

    $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})


.controller('SignInCtrl', function($scope, $state) {
   var count = 0;
  $scope.userText = "Login as User";
    $scope.womenText = "Login as Women's Desk";
    
  $scope.signInUser = function(user) {   
    count += + 1;
    
      if(count == 1) {
          $scope.myVar = !$scope.myVar;
          
          $scope.userText = "Sign In as User";
          $scope.womenText = "Sign Up";
          $scope.womensPlaceholder = "Email Address";
            $scope.changeBG =   {
               "background-image" : "none"
            }
            $scope.signinContainer = {
                "margin-top": "30px",
                "transition" : ".5s"
            }
            $scope.changeLogoSize = {
                "width" : "90px",
                "transition" : ".5s"
            }
              $scope.changeJuanaSize = {
                   "font-size" : "2.5em",
                  "transition" : ".5s",
                  "margin-bottom" : "35px"
              }
              
              $scope.checker = 'user';
                
           
    
      }else {
          $state.go('eventmenu.home');
      }
    
  };
    
     $scope.signInWomen = function(user) {   
    count += + 1;
    
         $scope.userText = "Sign In as Women's Desk";
          $scope.womenText = "Sign Up";
         $scope.womensPlaceholder = "ID Number";
      if(count == 1) {
          $scope.myVar = !$scope.myVar;
            $scope.changeBG =   {
               "background-image" : "none"
            }
            $scope.signinContainer = {
                "margin-top": "30px",
                "transition" : ".5s"
            }
            $scope.changeLogoSize = {
                "width" : "90px",
                "transition" : ".5s"
            }
              $scope.changeJuanaSize = {
                   "font-size" : "2.5em",
                  "transition" : ".5s",
                  "margin-bottom" : "35px"
              }
              
               $scope.checker = 'women';
            
    
      }else {
          $state.go('eventmenu.home');
      }
    
  };
}).controller('SignInCtrl', function($scope, $state) {
   var count = 0;
  $scope.userText = "Login as User";
    $scope.womenText = "Login as Women's Desk";
    
  $scope.signInUser = function(user) {   
    count += + 1;
    
      if(count == 1) {
          $scope.myVar = !$scope.myVar;
          
          $scope.userText = "Sign In as User";
          $scope.womenText = "Sign Up";
          $scope.womensPlaceholder = "Email Address";
            $scope.changeBG =   {
               "background-image" : "none"
            }
            $scope.signinContainer = {
                "margin-top": "30px",
                "transition" : ".5s"
            }
            $scope.changeLogoSize = {
                "width" : "90px",
                "transition" : ".5s"
            }
              $scope.changeJuanaSize = {
                   "font-size" : "2.5em",
                  "transition" : ".5s",
                  "margin-bottom" : "35px"
              }
              
              $scope.checker = 'user';
                
           
    
      }else {
          $state.go('eventmenu.home');
      }
    
  };
    
     $scope.signInWomen = function(user) {   
    count += + 1;
    
         $scope.userText = "Sign In as Women's Desk";
          $scope.womenText = "Sign Up";
         $scope.womensPlaceholder = "ID Number";
      if(count == 1) {
          $scope.myVar = !$scope.myVar;
            $scope.changeBG =   {
               "background-image" : "none"
            }
            $scope.signinContainer = {
                "margin-top": "30px",
                "transition" : ".5s"
            }
            $scope.changeLogoSize = {
                "width" : "90px",
                "transition" : ".5s"
            }
              $scope.changeJuanaSize = {
                   "font-size" : "2.5em",
                  "transition" : ".5s",
                  "margin-bottom" : "35px"
              }
              
               $scope.checker = 'women';
            
    
      }else {
          $state.go('reportwomen');
      }
    
  };
})

.controller("HomeCtrl", function($scope, $ionicPopup, $state, $cordovaVibration, $timeout, $cordovaSms, $cordovaGeolocation, $ionicLoading){

 $scope.counter = 5;

 $scope.sms = {};

  


 




  var onShake = function () {
    // Fired when a shake is detected
    $scope.popupEmergency();
    // $state.go('eventmenu')
  };

  var onError = function () {
    // Fired when there is an accelerometer error (optional)
    alert('shake error!');
  };

  // Start watching for shake gestures and call "onShake"
  // with a shake sensitivity of 40 (optional, default 30)
  shake.startWatch(onShake, 40, onError );

  // Stop watching for shake gestures
  // shake.stopWatch();

  cordova.plugins.backgroundMode.setDefaults({
    title:  "SHAKE SHAKE SHAKE",
    ticker: "TICKER",
    text:   "SOME TEXT........."
  });

  cordova.plugins.backgroundMode.enable();



          window.plugins.NativeAudio.preloadComplex( 'music', 'music/siren.mp3', 1, 1, 0, function(msg){
          }, function(msg){
              console.log( 'error: ' + msg );
          });


    
     $scope.popupEmergency = function() {
      $cordovaVibration.vibrate(5000);
      $timeout(function(){
         $scope.send();
         window.plugins.NativeAudio.loop( 'music' );
       }, 5000)




   var confirmPopup = $ionicPopup.confirm({
     title: '',
     templateUrl: "templates/popups/emergency-popup.html",
       cssClass: "emergency-popup",
         cancelText: 'CANCEL', 
          cancelType: 'button-default-popup',
          okText: 'ALARM NOW!', 
          okType: 'button-positive-popup'
   });

   confirmPopup.then(function(res) {
     if(!res) {
       console.log('CANCEL');
     } else {

       window.plugins.NativeAudio.loop( 'music' );

       $timeout(function(){
        window.plugins.NativeAudio.stop( 'music' );
        $scope.send();
       }, 100)


       $timeout(function(){
        window.plugins.NativeAudio.stop( 'music' );
      }, 7500)
       

       console.log('ALARM NOW!');
     }
   });
 };
    
     $scope.popupMessage = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: '',
     templateUrl: "templates/popups/message-popup.html",
       cssClass: "message-popup",
         cancelText: 'CANCEL', 
          cancelType: 'button-default-popup',
          okText: 'SEND', 
          okType: 'button-positive-popup'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('CANCEL');
     } else {
       console.log('SEND');
     }
   });
 };


$scope.send = function() {



var loading = function(){
  $ionicLoading.show();
  }

  

  /*$cordovaGeolocation.getCurrentPosition({enableHighAccuracy: true, timeout: 3000})
                     .then(function (position) {
                       $scope.lat  = position.coords.latitude
                       $scope.long = position.coords.longitude
                       
                       console.log("Coordinates: " + lat + " : " + long);
                       
                       $ionicLoading.hide();
                     }, function(err) {
                        $ionicLoading.hide();
                        console.log(err);
                       // error
                     });  */

  
 
      var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: ''  // send SMS with the default SMS app
      //intent: ''        // send SMS without open any other app
      }
    }
 
  $scope.sendSms=function(num){
    $scope.sms.number = 09165511432;
    var lat = document.getElementById('lat').value;
    var long = document.getElementById('lng').value;
    var city = document.getElementById('city').value;
    var address = document.getElementById('address').value;

    var help = "Please come, I need your help, I feel unsafe and harrased, I'm at " + address + " and my Coordinates is: " + lat + " : " + long;
    $cordovaSms
        .send(num, help, options)
          .then(function() {
              // Success! SMS was sent

              console.log('coordinates sent');
              console.log('Success');
          }, function(error) {
          // An error occurred

              console.log('send failed');
              console.log(error);
        });//then
  }//sendSms
  var num1 = 09277602590;
  var num2 = 09165511432;
  var num3 = 09368113011;
  $scope.sendSms(num1);
  $scope.sendSms(num2);
  $scope.sendSms(num3);
}
})

.controller("ContactsCtrl", function($scope, $http){
  $http.get('http://10.99.0.65/juanasafe/www/api/contacts').success(function(data){
    $scope.contactsList = data;
  });
})

.controller("ReportCtrl", function($scope,  $ionicModal, $http){


  /*$cordovaGeolocation.getCurrentPosition({enableHighAccuracy: true, timeout: 3000})
                     .then(function (position) {
                       var lat  = position.coords.latitude
                       var long = position.coords.longitude
                       
                       console.log("Coordinates: " + lat + " : " + long);
                       $scope.sms.message = "Coordinates: " + lat + " : " + long;
                       $ionicLoading.hide();
                       alert("Your Coordinates is: " + lat + " : " + long)
                     }, function(err) {
                        $ionicLoading.hide();
                        alert("ERROR WE CANT GET YOUR LOCATION COORDINATES : " + err);
                        console.log(err);
                       // error
                     });  */


        
  $ionicModal.fromTemplateUrl('templates/community-report.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.openModalReport = function() {
        $scope.modal.show();
        var lat = document.getElementById('lat').value;
        var lng = document.getElementById('lng').value;
        $http.get('http://10.99.0.65/juanasafe/www/api/report/nearby/'+lat+'/'+lng).success(function(data){
          $scope.nearbyReports = data;
        });
        $http.get('http://10.99.0.65/juanasafe/www/api/report/other/'+lat+'/'+lng).success(function(data){
          $scope.otherReports = data;
        });
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      // Execute action on hide modal
      $scope.$on('modal.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function() {
        // Execute action
      });



       $scope.sendReport = function(topic, report){
        var topic = topic;
        var report = report;
        var lat = document.getElementById('lat').value;
        var lng = document.getElementById('lng').value;
        var city = document.getElementById('city').value;
        var address = document.getElementById('address').value;
        var myData = {'topic': topic, 'report': report, 'lat': lat,'lng': lng, 'city': city, 'address': address};
        $http.post('http://10.99.0.65/juanasafe/www/api/report', myData).success(function(data){
          alert("Send Successful");
        });
      }
})





.controller("AwarenessCtrl", function($scope,  $ionicModal, $ionicPopup){
        
  $ionicModal.fromTemplateUrl('templates/awareness-harassment.html', {
      id: '1',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal1 = modal;
      });
    
    $ionicModal.fromTemplateUrl('templates/awareness-dating.html', {
        id: '2',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal2 = modal;
      });
  
    $ionicModal.fromTemplateUrl('templates/awareness-parent.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal3 = modal;
      });
    
    $ionicModal.fromTemplateUrl('templates/awareness-sanction.html', {
        id: '4',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal4 = modal;
      });   
      $scope.openModal = function(index ) {
          
        if (index == 1)  {
            $scope.modal1.show();
        }
          else if (index == 2) {
              $scope.modal2.show();
          }
         else if (index == 3) {
             $scope.modal3.show();
        }
        else {
            $scope.modal4.show();
             }
      };
      $scope.closeModal = function(index) {
        
          if (index == 1)  {
            $scope.modal1.hide();
        }
          else if (index == 2) {
              $scope.modal2.hide();
          }
         else if (index == 3) {
             $scope.modal3.hide();
        }
        else {
            $scope.modal4.hide();
             }
      };
    
     $scope.$on('$destroy', function() {
      $scope.modal1.remove();
      $scope.modal2.remove();
    $scope.modal3.remove();
      $scope.modal4.remove();
    });
     
     $scope.popupCatCalling = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'HARASSMENT - CAT CALLING',
     templateUrl: "templates/popups/awareness-harassment-catcalling.html",
       cssClass: "catcalling-popup",
          okText: 'REDEEM YOUR POINTS!', 
          okType: 'button-redeempoints-popup'
   });

   alertPopup.then(function(res) {
     if(res) {
       console.log('CANCEL');
     } else {
       console.log('ALARM NOW!');
     }
   });
 };
   
})  

.controller('ReportCtrl', function($scope, $cordovaCamera, $cordovaCapture) {
  $scope.takePhoto = function(){
    var options = { limit: 3 };
    console.log('now taking Image');
    $cordovaCapture.captureImage(options).then(function(imageData) {
    // Success! Image data is here
    console.log('Success!');
    }, function(err) {
    // An error occurred. Show a message to the user
    console.log(err);
    });
  }

  $scope.takeRecord = function(){
    var options = { limit: 3, duration: 10 };
      console.log('now taking Audio');
      $cordovaCapture.captureAudio(options).then(function(audioData) {
        // Success! Audio data is here
        console.log('Success!');
      }, function(err) {
        // An error occurred. Show a message to the user
        console.log(err);
      });


  }
})

.controller("AwarenessCtrl", function($scope,  $ionicModal, $ionicPopup){
        
  $ionicModal.fromTemplateUrl('templates/awareness-harassment.html', {
      id: '1',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal1 = modal;
      });
    
    $ionicModal.fromTemplateUrl('templates/awareness-dating.html', {
        id: '2',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal2 = modal;
      });
  
    $ionicModal.fromTemplateUrl('templates/awareness-parent.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal3 = modal;
      });
    
    $ionicModal.fromTemplateUrl('templates/awareness-sanction.html', {
        id: '4',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal4 = modal;
      });   
      $scope.openModal = function(index ) {
          
        if (index == 1)  {
            $scope.modal1.show();
        }
          else if (index == 2) {
              $scope.modal2.show();
          }
         else if (index == 3) {
             $scope.modal3.show();
        }
        else {
            $scope.modal4.show();
             }
      };
      $scope.closeModal = function(index) {
        
          if (index == 1)  {
            $scope.modal1.hide();
        }
          else if (index == 2) {
              $scope.modal2.hide();
          }
         else if (index == 3) {
             $scope.modal3.hide();
        }
        else {
            $scope.modal4.hide();
             }
      };
    
     $scope.$on('$destroy', function() {
      $scope.modal1.remove();
      $scope.modal2.remove();
    $scope.modal3.remove();
      $scope.modal4.remove();
    });
     
     $scope.popupCatCalling = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'HARASSMENT - CAT CALLING',
     templateUrl: "templates/popups/awareness-harassment-catcalling.html",
       cssClass: "catcalling-popup",
          okText: 'REDEEM YOUR POINTS!', 
          okType: 'button-redeempoints-popup'
   });

   alertPopup.then(function(res) {
     if(res) {
       console.log('CANCEL');
     } else {
       console.log('ALARM NOW!');
     }
   });
 };
   
})  

.controller("LeadershipCtrl", function($scope, $ionicModal){
    
      $ionicModal.fromTemplateUrl('templates/leadership-badges.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.openModalBadges = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();  
    });
    
})




.controller("StatsCtrl", function($scope){
   var ctx = document.getElementById("myChart");
  Chart.defaults.global.legend.position = 'bottom';
  Chart.defaults.global.defaultColor = 'rgba(255,255,255,0.5)';
  Chart.defaults.global.defaultFontColor = 'rgb(255,255,255)';
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ["Very/Somewhat Safe", "Not sure if safe or not", "Somewhat/Very unsafe"],
          datasets: [{
            data: [39, 32, 29],
            backgroundColor: [
                "rgb(69,132,149)",
                "rgb(203,124,49)",
                "rgb(111,167,68)"
            ],
            hoverBackgroundColor: [
                "rgb(80,140,162)",
                "rgb(213,134,59)",
                "rgb(121,177,78)"
            ]
        }]
      },
      options: {
         responsive: false,
          scales: {  
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  },
                  gridLines: {
                    display: false
                  }
              }]
          }
      }
  });
})

.controller('SignoutCtrl', function($state) {
  $state.go('sign-in');
})