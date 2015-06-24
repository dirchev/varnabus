app.controller('StopsCtrl', function($scope, StopService){
  $scope.stops = StopService.get().all();
});
