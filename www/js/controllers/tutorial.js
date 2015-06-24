/* global app */
app.controller('TutorialCtrl', function($scope, $state, StopService, localStorageService, $ionicPopup, SettingsService){
  $scope.settings =  {
    showSavedStops: true,
    showNearStops: true,
    updateFrequency: 3500
  };
  
  $scope.$watchCollection('settings', function(newSettings) {
    SettingsService.set(newSettings);
  });
  
  $scope.pages = [
    {
      heading: 'Начало',
      img: 'img/tutorial/1.png',
      text: 'На началната страница са близките и запазените спирки.'
    },
    {
      heading: 'Спирки',
      img: 'img/tutorial/2.png',
      text: 'В "Спирки" можете лесно да намерите спирка по име.'
    },
    {
      heading: 'Идващи автобуси',
      img: 'img/tutorial/3.png',
      text: 'Всяка спирка показва пътуващите към нея автобуси.'
    },
    {
      heading: 'Разписание',
      img: 'img/tutorial/4.png',
      text: 'Както и разписанието на автобусите до края на деня.'
    },
    {
      heading: 'Автобус',
      img: 'img/tutorial/5.png',
      text: 'При избор на автобус, приложението показва следващите спирки.'
    },
    {
      heading: 'Карта',
      img: 'img/tutorial/6.png',
      text: 'В "Карта" можете да намерите спирка, ако не знаете нейното име.'
    },
    {
      heading: 'Настройки',
      img: 'img/tutorial/7.png',
      text: 'В "Настройки" можете да персонализирате приложението за да е максимално полезно и удобно.'
    },
  ];
  
  $scope.closeTutorial = function(){
    localStorageService.set('tutorial', true);
    $state.go('app.home');
  };
  
  $scope.slideHasChanged = function(index){
    if(index === 8){
      document.getElementById("favStop").focus();   
    }
  };
  
  $scope.stops = StopService.get().all();
  
  $scope.savedStops = StopService.get().saved();
  
  $scope.saveStop = function(stop){
    var found = false;
    for(var i in $scope.savedStops){
      if($scope.savedStops[i].id == stop.id){
        console.log('aa');
        found = true;
      }
    }
    if(!found){
      $scope.savedStops.push({id: stop.id, text: stop.text});
      updateSavedStops();
    }
    newStopAlert(stop.text);
    document.getElementById("favStop").value = '';
    $scope.stopName = '';   
  };
  
  var newStopAlert = function(stop){
    $ionicPopup.alert({
      title: 'Добавена спирка',
      template: '<div class="text-center">Спирката<br><b>' + stop + '</b><br>е запазена успешно.</div>'
    });
  };
  
  var updateSavedStops = function(){
    localStorageService.set('savedStops', $scope.savedStops);
  };
  
  

});
