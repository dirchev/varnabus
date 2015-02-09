app.controller('DeviceCtrl', function($scope, DeviceService, $stateParams, $location, $rootScope, SettingsService, $ionicPopup, StopService){

  $scope.settings = SettingsService.get();
  var deviceId = $stateParams.deviceId;
  $scope.warning = StopService.getWarning(deviceId);
  $scope.canSendWarning = SettingsService.warning;

  var LiveData = function(){
    if($location.path() === '/device/'+ deviceId && !$rootScope.inBackground){
      DeviceService.get().stations(deviceId).success(function(data){
        $scope.state = data;
      })

      $scope.warning = StopService.getWarning(deviceId);
    }
  };

  $scope.sendWarning = function(){
    DeviceService.sendWarning(deviceId).success(function(data){
      if(data.success){
        $ionicPopup.alert({
          title: 'Сигналът е изпратен',
          template: '<p class="text-center">Сигналът за нередност в автобуса е изпратен. Благодарим ти!</p>'
        });
      }
    });
    SettingsService.warning = false;
    $scope.canSendWarning = SettingsService.warning;
    var warningDelay = setInterval(function(){
      SettingsService.warning = true;
      $scope.canSendWarning = SettingsService.warning;
      clearInterval(warningDelay);
    }, 5*60000);
  }

  DeviceService.get().info(deviceId).success(function(data){
    $scope.info = data;
  });

  LiveData();
  setInterval(LiveData, $scope.settings.updateFrequency);
});
