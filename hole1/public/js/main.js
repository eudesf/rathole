requirejs.config({ 
	shim: {
		'libs/ember': {
			deps: ['jquery'], exports: function() {
				App = Em.Application.create();
				return App; 
			}	
		}
	}
});

ENV = {
	CP_DEFAULT_CACHEABLE: true,
	VIEW_PRESERVES_CONTEXT: true
}

define(['libs/ember'], function(App) {

	require(['utils']);

	App.defaultContentView = Ember.View.create({
		templateName: 'DefaultContentView'
	});

	App.mainView = Ember.View.create({
		templateName: 'MainView',
		contentView: App.defaultContentView
	})

	App.ClickableView = Em.View.extend({
		click: function() {
			if (this.module) {
				obj = {};
				if (this.moduleVar)
					obj[this.moduleVar] = Ember.Object.create();

				require([this.module], function(view) {
					App.mainView.set("contentView", view.create(obj));
				})
			} else {
				App.mainView.set("contentView", App.defaultContentView);	
			}

		}
	});

});
