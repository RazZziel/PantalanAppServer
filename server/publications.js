Meteor.publish("docks", function () {
  return Docks.find({});
});

Meteor.publish("boats", function () {
  return Boats.find({});
});

Meteor.publish("places", function () {
  return Places.find({});
});
