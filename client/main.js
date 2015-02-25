Meteor.subscribe('stations');

Template.body.events({
  'click #drop1 li': function() {
    // console.log('menu 1: ', $(this)[0]['Code'], $(this)[0]['Name']);
    Session.set('fromStation', $(this)[0]['Code']);
  },

  'click #drop2 li': function() {
    // console.log('menu 2: ', $(this)[0]['Code'], $(this)[0]['Name']);
    Session.set('toStation', $(this)[0]['Code']);
  },

  'click #done': function() {
    var from = Session.get('fromStation');
    var to = Session.get('toStation');
    console.log(from, to);

    Meteor.call('getTravelTime', from, to, function(error, response){
      if (error) console.log('getTravelTime: ', error);
      if (response) {
        Session.set('travelTime', response);
        Meteor.call('setLength', response, function(err, res) {
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
