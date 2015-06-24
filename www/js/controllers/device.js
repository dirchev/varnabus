app.controller('DeviceCtrl', function($scope, DeviceService, $stateParams, $location, $rootScope, SettingsService, $ionicPopup, StopService){

  $scope.settings = SettingsService.get();
  var deviceId = $stateParams.deviceId;
  $scope.loading = true;
  
  DeviceService.get().stations(deviceId).success(function(data){
    $scope.state = data;
    $scope.loading = false;
  });
      
  var LiveData = function(){
    if($location.path() === '/app/device/'+ deviceId && !$rootScope.inBackground){
      DeviceService.get().stations(deviceId).success(function(data){
        $scope.state = data;
      });
    }
  };
  DeviceService.get().info(deviceId).success(function(data){
    $scope.info = data;
  });

  setInterval(LiveData, $scope.settings.updateFrequency);
  
});
