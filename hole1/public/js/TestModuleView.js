define(["libs/text!templates/TestModuleView.handlebars"], function(txt) {

	App.TestModuleView = Em.View.extend({
		template: Ember.Handlebars.compile(txt)
	}) 
	return App.TestModuleView;
});
