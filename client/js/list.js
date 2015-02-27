Template.list.events({
  'click .delete': function() {
    if ($(this)[0]['owner'] === Meteor.userId()) {
      Meteor.call('removeFromList', $(this)[0]['_id']);
    }
  }
});

Template.list.helpers({
  lists: function() {
    return Lists.find({});
  }
});