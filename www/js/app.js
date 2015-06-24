// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('VarnaBus', ['ionic', 'ui.router', 'ngCordova', 'LocalStorageModule', 'ngMap', 'ngTouch']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('VarnaBus2');
});

app.config(function($ionicConfigProvider){
  $ionicConfigProvider.backButton.text('').icon('ion-arrow-left-c').previousTitleText(false);
});

app.run(function($rootScope, StopService){
  document.addEventListener("pause", function(){
      $rootScope.inBackground = true;
  }, false);
  document.addEventListener("resume", function(){
      $rootScope.inBackground = false;
  }, false);

});

app.run(function(localStorageService, $http){
  var stops = localStorageService.get('stops') || false;
  if(!stops){
    $http.get("http://varnatraffic.com/Ajax/GetStations").success(function(data){
      localStorageService.set('stops', data);
    });
  }
});

app.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.transition('ios');
});

app.run(function($ionicPlatform, $ionicHistory, $ionicPopup, $state, localStorageService){
  $ionicPlatform.registerBackButtonAction(function (event) {
    if($ionicHistory.currentStateName() == "index"){
       var confirmPopup = $ionicPopup.confirm({
         title: 'Изход от начален урок',
         template: 'Сигурен ли си че искаш да излезеш от началния урок? Той ще бъде винаги наличен в менюто "Настройки".',
         okText: "Изход",
         cancelText: "Отказ"
       });
       confirmPopup.then(function(res) {
         if(res) {
           localStorageService.set('tutorial', true);
           $state.go('app.home');
         } else {
           // nothing
         }
       });
    }
    else {
      $ionicHistory.goBack();
    }
  }, 100);
});

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('/app/stop/{stopId}', '/app/stop/{stopId}/livedata');
  $stateProvider
    // tutorial state
    .state('index', {
      url: '/',
      controller: 'TutorialCtrl',
      templateUrl: 'templates/index.html'
    })
    // app states
    .state('app', {
      abstract : true,
      url: '/app',
      templateUrl: 'templates/app.html'
    })
      .state('app.home', {
        url: '/home',
        views: {
          'page': {
            controller: 'HomeCtrl',
            templateUrl: 'templates/app/home.html'
          }
        }
      })
      .state('app.stops', {
        url: '/stops',
        views: {
          'page': {
            controller: 'StopsCtrl',
            templateUrl: 'templates/app/stops.html'
          }
        }
      })
      .state('app.stop', {
        url: '/stop/:stopId?stopName',
        views: {
          'page': {
            controller: 'StopCtrl',
            templateUrl: 'templates/app/stop.html'
          }
        }
      })
        .state('app.stop.livedata', {
          url: '/livedata',
          views: {
            'stopContent': {
              templateUrl: 'templates/app/stop/livedata.html'
            }
          }
        })
        .state('app.stop.timetable', {
          url: '/timetable',
          views: {
            'stopContent': {
              templateUrl: 'templates/app/stop/timetable.html'
            }
          }
        })
      .state('app.device', {
        url: '/device/:deviceId',
        views: {
          'page': {
            controller: 'DeviceCtrl',
            templateUrl: 'templates/app/device.html'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        views: {
          'page': {
            controller: 'SettingsCtrl',
            templateUrl: 'templates/app/settings.html'
          }
        }
      })
      .state('app.map', {
        url: '/map',
        views: {
          'page': {
            controller: 'MapCtrl',
            templateUrl: 'templates/app/map.html'
          }
        }
      })
      .state('app.scanner', {
        url: '/scanner', 
        views: {
          'page': {
            controller: 'ScannerCtrl',
           templateUrl: 'templates/app/scanner.html'
          }
        }
      });


  $urlRouterProvider.otherwise("/app/home");
});
