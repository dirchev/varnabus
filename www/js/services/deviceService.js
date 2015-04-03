app.factory("DeviceService", function($http){
  return {
    get : function(){
      return {
        stations : function(id){
          return $http.get("http://varnatraffic.com/Ajax/GetDeviceStateAndStations?deviceId=" + id);
        },
        info : function(id){
          return $http.get('http://varnabus-web-scrapping.herokuapp.com/api/busInfo/' + id);
        }
      };
    },
    sendWarning: function(device){
      return $http.post("https://varnabus-web-scrapping.herokuapp.com/api/warning/", {bus: device});
    }
  };
});
