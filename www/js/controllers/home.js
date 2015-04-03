app.controller('HomeCtrl', function($scope, StopService, localStorageService, SettingsService, $cordovaGeolocation, $ionicModal){
  $scope.settings = localStorageService.get('settings') || {
    showSavedStops: true,
    showNearStops: true,
    updateFrequency: 2000
  };

  $ionicModal.fromTemplateUrl('templates/tutorial.html', {
    animation: 'slide-in-up',
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    var tutorial = localStorageService.get('tutorial') || false;
    if(!tutorial){
      $scope.modal.show();
    }
  });

  $scope.closeTutorial = function(){
    $scope.modal.hide();
    localStorageService.set('tutorial', 'true');
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
  }

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

  $scope.moveStop = function(stop, fromIndex, toIndex) {
    $scope.savedStops.splice(fromIndex, 1);
    $scope.savedStops.splice(toIndex, 0, stop);
    StopService.saveStops($scope.savedStops);
  };

});
