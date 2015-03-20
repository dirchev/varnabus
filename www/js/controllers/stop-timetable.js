app.controller('StopTimetableCtrl', function($scope, $stateParams, StopService){

  var stopId = $stateParams.stopId;
  $scope.stop = {
    id: $stateParams.stopId,
    text : $stateParams.stopName
  };

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
});
