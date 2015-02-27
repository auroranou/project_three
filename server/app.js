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
      return Meteor.call('shuffleSlice', dataJson);
    } else {
      console.log('error in longreads api call:', data.statusCode);
      var errorJson = JSON.parse(data.content);
      throw new Meteor.Error(data.statusCode, errorJson.error);
    }
  },

  shuffleSlice: function(arr) {
    var currentIndex = arr.length, tempVal, randIndex;
    while (0 !== currentIndex) {
      randIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      tempVal = arr[currentIndex];
      arr[currentIndex] = arr[randIndex];
      arr[randIndex] = tempVal;
    }
    return arr.slice(0,5);
  },

  addToList: function(owner, article) {
    console.log('addToList called');
    Lists.update(
      { owner: owner },
      { owner: owner },
      { upsert: true }
    );
    Lists.update(
      { owner: owner },
      { $addToSet: { articles: article} }
    );
  }
});
