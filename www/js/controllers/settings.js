app.controller('SettingsCtrl', function($scope, SettingsService, $ionicPopup, $ionicLoading, $ionicModal){
  $ionicLoading.show({
    template: 'Зареждане...'
  });
  $scope.bug = {
    title: '',
    email: '',
    content: ''
  };

  $scope.settings = SettingsService.get();
  $ionicLoading.hide();
  $scope.$watchCollection('settings', function(newSettings) {
    SettingsService.set(newSettings);
  });

  $scope.openTutorial = function(){
    $ionicModal.fromTemplateUrl('templates/tutorial.html', {
      animation: 'slide-in-up',
      scope: $scope
    }).then(function(modal) {
      $scope.tutoarialModal = modal;
      $scope.tutoarialModal.show();
    });
  }

  $scope.closeTutorial = function() {
    $scope.tutoarialModal.hide();
  };
  $scope.closeCredits = function() {
    $scope.creditsModal.hide();
  };

  $scope.openCredits = function(){
    $ionicModal.fromTemplateUrl('templates/credits.html', {
      animation: 'slide-in-up',
      scope: $scope
    }).then(function(modal) {
      $scope.creditsModal = modal;
      $scope.creditsModal.show();
    });
  }

  $scope.sendBug = function(){
    $scope.bug.title = $scope.bug.title + " : " + $scope.bug.email;
    SettingsService.sendBug($scope.bug).success(function(){
      $ionicPopup.alert({
        title: 'Съобщението е изпратено!',
        template: '<p class="text-center">Съобщението беше изпратено успешно. Благодарим Ви за сигнала.</p>'
      });
      $scope.bug.title = '';
      $scope.bug.email = '';
      $scope.bug.content = '';
    });
  }
})
