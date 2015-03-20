app.controller('StopCtrl', function($scope, $stateParams, StopService, $state, $location, $rootScope, SettingsService){
  if($location.path() === '/stop/'+ $stateParams.stopId){
    $state.go('stop.livedata', $stateParams, {reload: false});
    $scope.view = 'livedata';
  }
  if($location.path() === '/stop/'+ $stateParams.stopId + '/timetable'){
    $scope.view = 'timetable';
  } else {
    $scope.view = 'livedata';
  }

  $scope.settings = SettingsService.get();
  var stopId = $stateParams.stopId;
  $scope.stop = {
    id: $stateParams.stopId,
    text : $stateParams.stopName
  };
  $scope.stop.saved = StopService.isSaved(stopId);
  StopService.get().devices(stopId).success(function(data){
    $scope.devices = data.liveData;
    $scope.schedule = data.schedule;
    warnings = StopService.getWarnings();
    if(warnings){
      for(var i in $scope.devices){
        $scope.devices[i].warning = warnings[$scope.devices[i].device];
      }
    }
  });

  var LiveData = function(){
    if($location.path() === '/stop/' + $stateParams.stopId + '/' && !$rootScope.inBackground){
      StopService.get().devices(stopId).success(function(data){
        $scope.devices = data.liveData;
        $scope.schedule = data.schedule;
      });
    }
  };


  $scope.saveStop = function(){
    StopService.saveStop($scope.stop);
    $state.go('home',{},{reload: true});
  };
  $scope.deleteStop = function(){
    StopService.deleteStop($scope.stop.id);
    $state.go('home',{},{reload: true});
  };


  setInterval(LiveData, $scope.settings.updateFrequency);
});
