Template.list.events({

});

Template.list.helpers({
  lists: function() {
    var userList = Lists.findOne({ owner: Meteor.userId() });
    return userList != undefined ? userList['articles'][0] : false;
  }
});