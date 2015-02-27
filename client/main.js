Meteor.subscribe('stations');
Meteor.subscribe('lists');

Template.body.events({
  'click .start#dropdown': function() {
    $('#drop').removeClass('hidden');
  },

  'click .from#drop li': function() {
    console.log('from clicked');
    Session.set('fromStation', $(this)[0]['Code']);
    $('#dropdown').text('Where are you going?');
    $('#drop').removeClass('from').addClass('to');
  },

  'click .to#drop li': function () {
    console.log('to clicked');
    Session.set('toStation', $(this)[0]['Code']);
    $('#dropdown').text('Go!').addClass('go').removeClass('start');
    $('#drop').removeClass('to');
  },

  'click .go#dropdown': function() {
    $('#dropdown').removeClass('go').addClass('start').text('Where are you now?');
    $('#drop').addClass('hidden from');
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
  },

  'click .save': function() {
    console.log($(this)[0]);
    console.log(Meteor.user());
    // var ownerId = Lists.findOne({owner: Meteor.userId()});
    Meteor.call('addToList', Meteor.userId(), $(this)[0], function(err, res) {
      if (err) console.log(err);
    });
  }
});

Template.body.helpers({
  stations: function() {
    return Stations.find({}, {sort: {Name: 1}});
  },
  travelTime: function() {
    return Session.get('travelTime');
  },
  longReads: function() {
    return Session.get('longReads');
  },
  lists: function() {
    return Lists.find({});
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
