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
      var travelTime = dataJson['StationToStationInfos'][0]['RailTime'];
      console.log('api response received:', dataJson);
      return travelTime;
    } else {
      console.log('error in api call:', data.statusCode);
      var errorJson = JSON.parse(data.content);
      throw new Meteor.Error(data.statusCode, errorJson.error);
    }
	}
});
