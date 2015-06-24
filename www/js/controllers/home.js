app.controller('HomeCtrl', function($scope, StopService, localStorageService, SettingsService, $cordovaGeolocation, $ionicModal, $state){
  $scope.settings = localStorageService.get('settings') || {
    showSavedStops: true,
    showNearStops: true,
    updateFrequency: 2000
  };

  if(localStorageService.get('tutorial') !== true ){
    $state.go('index');
  };

  $scope.savedStops = localStorageService.get('savedStops') || [];
  $scope.reorder = false;

  if($scope.settings.showNearStops){
    $cordovaGeolocation
      .getCurrentPosition()
      .then(function (position) {
        var pos = {
          lat : position.coords.latitude,
          lon : position.coords.longitude
        };
        StopService.get().near(pos).success(function(data){
          $scope.nearStops = data;
        });
      }, function(err) {
      });
      
      $scope.getNearStops = function(){
        $scope.nearStops = [];
        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {
            var pos = {
              lat : position.coords.latitude,
              lon : position.coords.longitude
            };
            StopService.get().near(pos).success(function(data){
              $scope.nearStops = data;
            });
          }, function(err) {
          });
      };
  }

  $scope.moveStop = function(stop, fromIndex, toIndex) {
    $scope.savedStops.splice(fromIndex, 1);
    $scope.savedStops.splice(toIndex, 0, stop);
    StopService.saveStops($scope.savedStops);
  };

});
