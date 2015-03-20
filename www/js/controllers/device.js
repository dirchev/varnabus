app.controller('DeviceCtrl', function($scope, DeviceService, $stateParams, $location, $rootScope, SettingsService, $ionicPopup, StopService){

  $scope.settings = SettingsService.get();
  var deviceId = $stateParams.deviceId;
  $scope.warning = StopService.getWarning(deviceId);
  $scope.canSendWarning = SettingsService.warning;

  var LiveData = function(){
    if($location.path() === '/device/'+ deviceId && !$rootScope.inBackground){
      DeviceService.get().stations(deviceId).success(function(data){
        $scope.state = data;
      });
    }
  };
  DeviceService.get().info(deviceId).success(function(data){
    $scope.info = data;
  });

  LiveData();
  setInterval(LiveData, $scope.settings.updateFrequency);
});
