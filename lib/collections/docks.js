Docks = new Mongo.Collection("docks");

Meteor.methods({
  registerDock: function (boatName, boatLicensePlate, ownerName, withSailor) {
    console.log("Registering dock", boatName, boatLicensePlate, ownerName, withSailor);
    Docks.upsert(
    {
      boatLicensePlate: boatLicensePlate
    }, {
      $set: {
        dateTime: new Date(),
        boatName: boatName,
        ownerName: ownerName,
        withSailor: withSailor
      }
    });
  },
  deleteDock: function (dockId) {
    Docks.remove(dockId);
  }
});