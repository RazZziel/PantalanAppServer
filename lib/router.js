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
