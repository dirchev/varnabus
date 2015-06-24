app.controller('MapCtrl', function($scope, StopService, $cordovaGeolocation, $ionicPopup, $ionicLoading, $state){

  $scope.showPosition = false;
  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });

  $scope.stops = StopService.get().all();

  $scope.selectMapStop = function(e, stop){
    $state.go('app.stop.livedata', { stopId : stop.id });
  };

  $scope.findMe = function(){
    if($scope.showPosition){
      $scope.map.setCenter($scope.userCoords);
      $scope.map.setZoom(16);
    } else {
      $cordovaGeolocation
        .getCurrentPosition()
        .then(function (position) {
          $scope.userCoords = {
            lat : position.coords.latitude,
            lng : position.coords.longitude
          };
          $scope.map.setCenter($scope.userCoords);
          $scope.map.setZoom(16);
          $scope.showPosition = true;
        }, function(err) {
          $ionicPopup.alert({
            title: 'Грешка',
            template: '<p class="text-center">Не успяхме да вземем геолокация. Включете GPS и опитайте отново.</p>'
          });
      });
    }
  };

  $scope.updateMap = function(stop){
    if(typeof stop !== 'undefined' && stop.text !== 'НВ'){
      var coords = {
        lat: stop.position.lat,
        lng: stop.position.lon
      };
      $scope.map.setCenter(coords);
      return;
    } else {
      var coords = {
        lat: 43.2056,
        lng: 27.91045
      };
      $scope.map.setCenter(coords);
      return;
    }
  }

})
