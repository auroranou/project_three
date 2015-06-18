Meteor.publish('stations', function(){
  return Stations.find({});
});

Meteor.publish('lists', function(){
  return Lists.find({ owner: this.userId });
})
