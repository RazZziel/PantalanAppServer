"use strict";

Router.configure({
    layoutTemplate: "layout",
    loadingTemplate: "loading",
});

Router.route('/', {
    title: "Home",
    name: "home",
    template: "home",
    fastRender: true,
    waitOn: function() {
        return [
            Meteor.subscribe("docks"),
            Meteor.subscribe("boats"),
        ];
    }
});

Router.route('/restful/registerDock', {where: 'server'})
    .get(function () {

        var reply = {};
        var ok = true;
        var msg;

        reply.status = (ok ? "ok" : "error")
        if (msg) {
            reply.msg = msg;
        }

        Meteor.call('registerDock',
            this.params.query.boatName,
            this.params.query.boatLicensePlate,
            this.params.query.ownerName,
            this.params.query.withSailor=="true");

        this.response.end(JSON.stringify(reply));
    });

Router.route('/restful/updateBoat', {where: 'server'})
    .get(function () {

        var reply = {};
        var ok = true;
        var msg;

        reply.status = (ok ? "ok" : "error")
        if (msg) {
            reply.msg = msg;
        }

        Meteor.call('updateBoat',
            this.params.query.licensePlate,
            this.params.query.lat,
            this.params.query.lng);

        this.response.end(JSON.stringify(reply));
    });
