Meteor.publish("docks", function () {
  return Docks.find({});
});
