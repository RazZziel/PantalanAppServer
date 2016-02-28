Docks = new Mongo.Collection("docks");

Meteor.methods({
  registerDock: function (boatName, boatLicensePlate, ownerName, withSailor) {
    console.log("Registering dock", boatName, boatLicensePlate, ownerName, withSailor);
    Docks.insert({
      dateTime: new Date(),
      boatName: boatName,
      boatLicensePlate: boatLicensePlate,
      ownerName: ownerName,
      withSailor: withSailor
    });
  },
  deleteDock: function (dockId) {
    Docks.remove(dockId);
  }
});