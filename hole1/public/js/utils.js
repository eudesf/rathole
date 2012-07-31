define(['libs/ember', 'libs/jquery.maskedinput'], function(App) {
	
	App.TextField = Em.TextField.extend({
		width: null,

		willInsertElement: function() {
			var width = this.get('width');
			if (width) this.$().css('width', width);
		}
	});

	App.MaskedTextField = Em.TextField.extend({
		classNames: ['masked-field'],
		mask: null,
		willInsertElement: function() {
			this._super();
			var mask = this.get('mask');
			if (mask) this.$().mask(mask);
		}
	});

	App.FieldLayout = Em.View.extend({
		classNames: ['control-group'],
		layout: Ember.Handlebars.compile(
			'{{view view.LabelView}}<div class="controls">{{yield}}</div>'),
		
		LabelView: Em.View.extend({
			tagName: 'label',
			classNames: ['control-label'],
			attributeBindings: ['for'],
			'for': '',
			textBinding: 'parentView.label',
			defaultTemplate: Ember.Handlebars.compile('{{view.text}}')
		}),

		width: null
	});

	App.FieldView = App.FieldLayout.extend({
		template: Ember.Handlebars.compile("{{view view.DataView}}"),
		DataView: null,
		value: null,

		willInsertElement: function() {
			this._super();
			
			var childViews = this.get('childViews');
			var labelView = childViews[0];
			var dataView = childViews[1];
			labelView.set('for', dataView.$().attr('id'));

			var klass = this.get('klass');
			if (klass) dataView.$().addClass(klass);
			var width = this.get('width');
			if (width) dataView.$().css("width", width);
		}
	});
		
	App.TextView = App.FieldView.extend({
		DataView: Em.TextField.extend({
			valueBinding: 'parentView.value'
		})
	});

	App.GenericSelect = Em.Select.extend({
		attributeBindings: ['style'],
		optionValuePath: 'content.id',
		optionLabelPath: 'content.label',
		selectedKey: null,
		includeEmptyOption: true,
		init: function() {
			this._super();

			var content = this.get('content');
			if (this.get('includeEmptyOption')) {
				this.set('content', content.copy().insertAt(0, { id: '-', label: '--- Selecione ---' }));
			}

			var selected = this.get('selectedKey');
			if (selected) {
				for (var i = 0; i < content.length; i++) {
					if (content[i].id == selected) {
						this.set('selection', content[i]);
					}
				}
			}
		}
	});

	App.GenderView = App.FieldView.extend({
		DataView: App.GenericSelect.extend({
			content: Ember.A([
				{ id: "M", label: "Masculino" },
				{ id: "F", label: "Feminino" } 
			]),
			selectedKeyBinding: 'parentView.value'
		})
	});

	App.MaritalStatusView = App.FieldView.extend({
		DataView: App.GenericSelect.extend({
			content: Ember.A([
				{ id: "single", label: "Solteiro(a)" },
				{ id: "married", label: "Casado(a)" },
				{ id: "stable_union", label: "União Estável" },
				{ id: "legal_separation", label: "Separação Judicial" },
				{ id: "segregated", label: "Desquitado(a)" },
				{ id: "divorced", label: "Divorciado(a)" },
				{ id: "widow", label: "Viúvo(a)" },
			]),
			selectedKeyBinding: 'parentView.value'
		})
	});

	App.MaskedTextView = App.FieldView.extend({
		mask: null,
		DataView: App.MaskedTextField.extend({
			valueBinding: 'parentView.value',
			maskBinding: 'parentView.mask'
		}),
	});

	App.CEPLoaderView = App.FieldView.extend({ 
		template: Em.Handlebars.compile(
			'{{view view.DataView}} {{view view.LoaderView}}'),

		width: '80',
		loaderVisible: false,
		address: null,

		LoaderView: Em.View.extend({
			tagName: 'img',
			attributeBindings: ['src'],
			src: 'img/ajax-loader.gif',
			isVisibleBinding: 'parentView.loaderVisible'
		}),

		DataView: App.MaskedTextField.extend({
			mask: '99999-999',
			valueBinding: 'parentView.value',

			focusOut: function(ev) {
				if (this.$().val().match(/\d{5}-\d{3}/)) {
					_this = this;
					var _parentView = this.get('parentView');
					_parentView.set('loaderVisible', true);
					$.get('/ceptest',
						function(data) {
							_this.get('parentView').set('address', data);
							_this.get('parentView').set('loaderVisible', false);
						}, 'json');
				}
			}
		})
	});
});
