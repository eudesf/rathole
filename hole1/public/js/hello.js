define(['libs/ember', 'libs/text!templates/helloworld.handlebars'], function (App, txt) {

//	App.HelloView = Em.View.Extend({ });

	Ember.TEMPLATES['test'] = Ember.Handlebars.compile(txt);

	return Ember.View.create({
		templateName: 'test'
	});
});
