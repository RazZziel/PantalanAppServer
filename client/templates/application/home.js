Template.home.helpers({
  docks: function () {
    return Docks.find({});
  }
});

Template.dock.events({
  "click .delete": function () {
    Meteor.call("deleteDock", this._id);
  }
});


Meteor.startup(function() {  
  GoogleMaps.load();
});

Template.map.helpers({  
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(42.184384, -8.850952),
        zoom: 8
      };
    }
  }
});

Template.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
    google.maps.event.addListener(map.instance, 'click', function(event) {
      Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    });

    var markers = {};

    Boats.find().observe({  
      added: function(boat) {
        console.log("Boat added on map", boat.licensePLate, boat.lat, boat.lng);
        var latLng = new google.maps.LatLng(boat.lat, boat.lng);
        var marker = new google.maps.Marker({
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: latLng,
          map: map.instance,
          id: boat._id
        });
        map.instance.panTo(latLng);
        map.instance.setZoom(12);

        markers[boat._id] = marker;
      },
      changed: function(boat) {
        console.log("Boat updated on map", boat.licensePlate, boat.lat, boat.lng);
        var latLng = new google.maps.LatLng(boat.lat, boat.lng);
        markers[boat._id].setPosition(latLng);
        map.instance.panTo(latLng);
      },
    });
  });
});