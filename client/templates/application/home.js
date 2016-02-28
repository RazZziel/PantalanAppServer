Template.home.helpers({
  docks: function () {
    return Docks.find({});
  },
  places: function () {
    //return Places.find({});
    // Fuck it.
    return [
      { "dockName": "D1", "boatLicensePlate": "BLAHBLAH" },
      { "dockName": "D2", "boatLicensePlate": "DERPDERP" },
      { "dockName": "D3", "boatLicensePlate": "-" },
      { "dockName": "D4", "boatLicensePlate": "OMGBBQ" }
    ];
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
    var updateBounds = function() {
      var bounds = new google.maps.LatLngBounds();
      var keys = Object.keys(markers);
      for (i=0; i<keys.length; ++i) {
        bounds.extend(markers[keys[i]].position);
      }
      map.instance.fitBounds(bounds);
    }

    Boats.find().observe({  
      added: function(boat) {
        console.log("Boat added on map", boat.licensePLate, boat.lat, boat.lng);
        var latLng = new google.maps.LatLng(boat.lat, boat.lng);
        var marker = new google.maps.Marker({
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: latLng,
          map: map.instance,
          id: boat._id,
          icon: "/boat-10-xxl.png",
          title: boat.licensePlate
        });
        map.instance.panTo(latLng);
        markers[boat._id] = marker;
        updateBounds();
      },
      changed: function(boat) {
        console.log("Boat updated on map", boat.licensePlate, boat.lat, boat.lng);
        var latLng = new google.maps.LatLng(boat.lat, boat.lng);
        markers[boat._id].setPosition(latLng);
        updateBounds();
      },
    });
  });
});