"use strict";

if (Meteor.isClient) {
        Template.layout.helpers({
                activeIfTemplateIs: function (template) {
                var currentRoute = Router.current();
                return currentRoute &&
                                template === currentRoute.lookupTemplate() ? 'active' : '';
                },
                currentUserIsActive: function (template) {
                        // TODO: Meteor.user() exists but doesn't have isActive because we're not suscribing "users"
                return Meteor.user() && Meteor.user().isActive;
                },
                currentUserIsAdmin: function (template) {
                        // TODO: Meteor.user() exists but doesn't have isActive because we're not suscribing "users"
                return Meteor.user() && Meteor.user().isProperAdmin();
                }
        });

	Template.registerHelper('formatDateTime', function(date) {
    	        return moment(date).format('YYYY-MM-DD HH:mm:ss');
	});

	Template.registerHelper('fromNow', function(date) {
    	        return moment(date).fromNow();
	});

	Handlebars.registerHelper('json', function(context) {
    	        return JSON.stringify(context);
	});
}
