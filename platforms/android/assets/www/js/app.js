// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'ngAnimate', 'ngCordova', 'app.controllers', 'app.services', 'starter.map', 'starter.Settings', 'services.Settings'  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
     
  });
    
})


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
   .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })
   .state('reportwomen', {
      url: '/report-women',
      templateUrl: 'templates/report-women.html',
      controller: ''
    })
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: "HomeCtrl"
        }
      }
    })
    .state('eventmenu.map', {
      url: "/map",
      views: {
        'menuContent' :{
          templateUrl: 'js/app/map/map.html',
      controller: 'map'
        }
      }
    })  
    .state('eventmenu.contacts', {
      url: "/contacts",
      views: {
        'menuContent' :{
          templateUrl: "templates/contacts.html",
          controller: "ContactsCtrl"
        }
      }
    })
  .state('eventmenu.reports', {
      url: "/reports",
      views: {
        'menuContent' :{
          templateUrl: "templates/reports.html",
          controller: "ReportCtrl"
        }
      }
    })
  .state('eventmenu.awareness', {
      url: "/awareness",
      views: {
        'menuContent' :{
          templateUrl: "templates/awareness.html",
          controller: "AwarenessCtrl"
        }
      }
    })
  .state('eventmenu.leadership', {
      url: "/leadership",
      views: {
        'menuContent' :{
          templateUrl: "templates/leadership.html",
          controller: "LeadershipCtrl"
        }
      }
    })
  .state('eventmenu.stats', {
    url: "/stats",
    views: {
      'menuContent' :{
        templateUrl: "templates/stats.html",
        controller: "StatsCtrl"
      }
    }
  })
  .state('eventmenu.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html",
          controller: ""
        }
      }
    })
  .state('eventmenu.help', {
      url: "/help",
      views: {
        'menuContent' :{
          templateUrl: "templates/help.html",
          controller: ""
        }
      }
    })  
    .state('eventmenu.signout', {
      url: "/signout",
      views: {
        'menuContent' :{
          controller: "SignoutCtrl"
        }
      }
    })   
    .state('getSettings', {
      url: '/getSettings',
      controller: 'Settings'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'js/app/settings/settings.html',
      controller: 'Settings',
      cache: false
    })
    .state('settings/distanceFilter', {
      url: '/settings/distanceFilter',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/stationaryRadius', {
      url: '/settings/stationaryRadius',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/desiredAccuracy', {
      url: '/settings/desiredAccuracy',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/activityType', {
      url: '/settings/activityType',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/triggerActivities', {
      url: '/settings/triggerActivities',
      templateUrl: 'js/app/settings/trigger-activities.html',
      controller: 'Settings'
    })
    .state('settings/disableElasticity', {
      url: '/settings/disableElasticity',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/url', {
      url: '/settings/url',
      templateUrl: 'js/app/settings/url.html',
      controller: 'Settings'
    })
    .state('settings/method', {
      url: '/settings/method',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/autoSync', {
      url: '/settings/autoSync',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/batchSync', {
      url: '/settings/batchSync',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/locationUpdateInterval', {
      url: '/settings/locationUpdateInterval',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/fastestLocationUpdateInterval', {
      url: '/settings/fastestLocationUpdateInterval',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/activityRecognitionInterval', {
      url: '/settings/activityRecognitionInterval',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/stopDetectionDelay', {
      url: '/settings/stopDetectionDelay',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/stopTimeout', {
      url: '/settings/stopTimeout',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/stopOnTerminate', {
      url: '/settings/stopOnTerminate',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/forceReloadOnLocationChange', {
      url: '/settings/forceReloadOnLocationChange',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/forceReloadOnMotionChange', {
      url: '/settings/forceReloadOnMotionChange',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/forceReloadOnGeofence', {
      url: '/settings/forceReloadOnGeofence',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/startOnBoot', {
      url: '/settings/startOnBoot',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/debug', {
      url: '/settings/debug',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/preventSuspend', {
      url: '/settings/preventSuspend',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/heartbeatInterval', {
      url: '/settings/heartbeatInterval',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/foregroundService', {
      url: '/settings/foregroundService',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/deferTime', {
      url: '/settings/deferTime',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/pausesLocationUpdatesAutomatically', {
      url: '/settings/pausesLocationUpdatesAutomatically',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
    .state('settings/useSignificantChangesOnly', {
      url: '/settings/useSignificantChangesOnly',
      templateUrl: 'js/app/settings/radio-list.html',
      controller: 'Settings'
    })
  
  $urlRouterProvider.otherwise("/sign-in");
})



////custom settings for the project UI.
.config(['$ionicConfigProvider', function ($ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('left')

}]);    