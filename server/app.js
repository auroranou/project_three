if (Stations.find().count() === 0) {
  console.log('importing stationlist to db')
  var data = JSON.parse(Assets.getText('stationList.json'));
  data.forEach(function(e, i, a) {
    Stations.insert(e);
  });
}

Meteor.methods({
  getTravelTime: function(from, to) {
    var url = 'https://api.wmata.com/Rail.svc/json/jSrcStationToDstStationInfo?FromStationCode=' + from + '&ToStationCode=' + to + '&api_key=1287532e8fa547f59b447d56648bb0e9';
    var data = Meteor.http.get(url, {timeout: 10000});
    
    if (data.statusCode == 200) {
      var dataJson = JSON.parse(data.content);
      console.log('wmata api response received:', dataJson);
      var travelTime = dataJson['StationToStationInfos'][0]['RailTime'];
      return travelTime;
    } else {
      console.log('error in wmata api call:', data.statusCode);
      var errorJson = JSON.parse(data.content);
      throw new Meteor.Error(data.statusCode, errorJson.error);
    }
  },

  setLength: function(travelTime) {
    if (parseInt(travelTime) > 45) {
      return Meteor.call('getReads', 'longest');
    } else if (parseInt(travelTime) > 30 && parseInt(travelTime) < 45) {
      return Meteor.call('getReads', 'long');
    } else if (parseInt(travelTime) > 15 && parseInt(travelTime) < 30) {
      return Meteor.call('getReads', 'medium');
    } else {
      return Meteor.call('getReads', 'short');
    }
  },

  getReads: function(length) {
    var url = 'https://longreads-api.herokuapp.com/longreads/' + length;
    var data = Meteor.http.get(url, {timeout: 10000});

    if (data.statusCode == 200) {
      var dataJson = JSON.parse(data.content);
      console.log('longreads api response received');
      return dataJson;
    } else {
      console.log('error in longreads api call:', data.statusCode);
      var errorJson = JSON.parse(data.content);
      throw new Meteor.Error(data.statusCode, errorJson.error);
    }
  }
});
