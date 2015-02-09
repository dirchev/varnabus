app.controller('ScannerCtrl', function($scope, $cordovaBarcodeScanner, $ionicPopup, $state, StopService){
  $scope.scan = function(){
    $cordovaBarcodeScanner
     .scan()
     .then(function(barcodeData) {
       var link = barcodeData.text;
       // links be something like:
       // https://play.google.com/store/apps/details?id=me.dirchev.varnabus2&stop_id=123_1
       // we need only last symbols
       var remove = 'https://play.google.com/store/apps/details?id=me.dirchev.varnabus2&stop_id=';
       var rest = link.substr(0, remove.length);
       if(remove === rest){
         var id = link.substr(remove.length);
         var allStops = StopService.get().all();
         var found = false;
         for(index in allStops){
           if(allStops[index].id == id){
             var stop = allStops[index];
             found = true;
             $state.go('stop', {stopId: stop.id, stopName: stop.text || stop.name});
           }
         }
         if(!found){
           $ionicPopup.alert({
             title: 'Грешка',
             template: 'Спирката не беше намерена'
           });
         }
       } else {
         $ionicPopup.alert({
           title: 'Грешка',
           template: 'Спирката не беше намерена'
         });
       }

     }, function(error) {
       $ionicPopup.alert({
         title: 'Грешка',
         template: 'Не успяхме да сканираме нищо.'
       });
     });
  }
  $scope.scan();

})
