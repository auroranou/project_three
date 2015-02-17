Meteor.subscribe('stations');

Template.body.events({
  'submit form': function(event){
    event.preventDefault();
    var from = $('#fromStation').val();
    var to = $('#toStation').val();
    console.log(from, to);
    Meteor.call('getTravelTime', from, to, function(error, response){
      if (error) console.log(error);
      $('p').remove();
      $('body').append('<p>Your estimated travel time is ' + response + ' minutes</p>');
    });
  }
});

Template.body.helpers({
  fromStations: function() {
    return Stations.find();
  },
  toStations: function() {
    return Stations.find();
  }
});