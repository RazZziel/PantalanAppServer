Meteor.startup(function() {  
  GoogleMaps.load();
});

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

Template.map.onCreated(function() {  
  var self = this;

  GoogleMaps.ready('map', function(map) {
    var marker;

    // Create and move the marker when latLng changes.
    self.autorun(function() {
      //var latLng = Geolocation.latLng();
      var latLng = { "lat": 41.954384, "lng":-2.850952 };
      if (!latLng)
        return;

      // If the marker doesn't yet exist, create it.
      if (! marker) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(latLng.lat, latLng.lng),
          map: map.instance
        });
      }
      // The marker already exists, so we'll just change its position.
      else {
        marker.setPosition(latLng);
      }

      // Center and zoom the map view onto the current position.
      map.instance.setCenter(marker.getPosition());
      var MAP_ZOOM = 15;
      map.instance.setZoom(MAP_ZOOM);
    });
  });
});
