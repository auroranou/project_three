Meteor.subscribe('stations');

Template.body.events({
  'submit form': function(event){
    event.preventDefault();
    var from = $('#fromStation').val();
    var to = $('#toStation').val();
    // console.log(from, to);

    Meteor.call('getTravelTime', from, to, function(error, response){
      if (error) console.log('getTravelTime: ', error);
      if (response) {
        Session.set('travelTime', response);
        Meteor.call('setLength', response, function(err, res) {
          console.log('setLength called');
          console.log(res);
          if (err) console.log('setLength: ', err);
          if (res) {
            Session.set('longReads', res);
          }
        });
      }
    });
  }
});

Template.body.helpers({
  fromStations: function() {
    return Stations.find({}, {sort: {Name: 1}});
  },
  toStations: function() {
    return Stations.find({}, {sort: {Name: 1}});
  },
  travelTime: function() {
    return Session.get('travelTime');
  },
  longReads: function() {
    return Session.get('longReads');
  }
});
