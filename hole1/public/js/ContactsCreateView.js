define(['libs/text!templates/ContactsCreateView.hbs'], function(txt) {

	App.ContactsCreateView = Em.View.extend({
		template: Ember.Handlebars.compile(txt),
		address: null,
		submit: function(view) {
		}
	});
	return App.ContactsCreateView;
});
