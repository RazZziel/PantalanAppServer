Boats = new Mongo.Collection("boats");

Meteor.methods({
  updateBoat: function (licensePlate, lat, lng) {
    console.log("Updating boat", licensePlate, lat, lng);
    Boats.upsert({
    	licensePlate: licensePlate,
    }, {
    	$set: {
    		lastUpdate: new Date(),
    		lat: lat,
    		lng: lng
    	}
    });
  },
  deleteBoat: function (boatId) {
    Docks.remove(boatId);
  }
});