app.controller('StopCtrl', function($scope, $stateParams, StopService, $state, $location, $rootScope, SettingsService){
  $scope.loading = true;
  $scope.settings = SettingsService.get();
  var stopId = $stateParams.stopId;
  
  $scope.stop = StopService.get().one(stopId);
  
  $scope.stop.saved = StopService.isSaved(stopId);
  
  StopService.get().devices(stopId).success(function(data){
    $scope.devices = data.liveData;
    $scope.schedule = data.schedule;
    $scope.loading = false;
  });

  var LiveData = function(){
    if($location.path() === '/app/stop/' + $stateParams.stopId + '/livedata' && !$rootScope.inBackground){
      StopService.get().devices(stopId).success(function(data){
        $scope.devices = data.liveData;
        $scope.schedule = data.schedule;
      });
    }
  };


  $scope.saveStop = function(){
    var stop = {
      id: $scope.stop.id,
      text: $scope.stop.text
    };
    
    StopService.saveStop(stop);
    
    $state.go('app.home',{},{reload: true});
  };
  $scope.deleteStop = function(){
    StopService.deleteStop($scope.stop.id);
    $state.go('app.home',{},{reload: true});
  };


  setInterval(LiveData, $scope.settings.updateFrequency);
});
