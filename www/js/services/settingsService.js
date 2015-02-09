app.factory("SettingsService", function(localStorageService, $http){
  return {
    get: function(){
      return localStorageService.get('settings') || {
        showSavedStops: true,
        showNearStops: true,
        updateFrequency: 2000
      };
    },
    set: function(settings){
      localStorageService.set('settings', JSON.stringify(settings));
    },
    sendBug: function(bug){
      console.log(bug);
      return $http.post('https://dirchev-node-app.herokuapp.com/api/feedback', bug);
    },
    warning : true
  }
});
