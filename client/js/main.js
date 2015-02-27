Meteor.subscribe('stations');
Meteor.subscribe('lists');

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
