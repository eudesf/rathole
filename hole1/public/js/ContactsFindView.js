define(['libs/text!templates/ContactsFindView.hbs'], function(txt) {

	return Em.View.extend({
		template: Ember.Handlebars.compile(txt),
		contacts: [{fullName: '-', nickName: '-', profession: '-'}],
		willInsertElement: function() {
			var _this = this;
			$.get("/contacts", function(data) {
				_this.set('contacts', data);	
			}, 'json');
		},
		edit: function(view) {
			$.get("/contacts/1", function(data) {
				require(['ContactsCreateView'], function(view) {
					var viewObj = view.create(obj);
					App.mainView.set("contentView", viewObj);
					viewObj.set('contact', data[0]);	
				});
			}, 'json');
		},
		'delete': function(view) {
			alert('delete action - ' + view);
		},
	}) 
});
