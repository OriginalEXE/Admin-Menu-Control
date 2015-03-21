+( function( $, Backbone ) {

	"use strict";

	$( function() {

		var $window = $( window ),
			$body   = $( 'body' );

		window.AMC = {
			Models: {},
			Collections: {},
			Views: {},
			Router: {},
			Dom: {}
		};

		// Page tabs view
		AMC.Dom.pageTabs = $( '.nav-tab-wrapper' );

		AMC.Views.PageTabs = Backbone.View.extend({
			events: {
				'click a': 'makeTabActive'
			},
			initialize: function() {},
			makeTabActive: function( event ) {

				var $tab = $( event.currentTarget );

				$tab
					.addClass( 'nav-tab-active' )
					.siblings()
						.removeClass( 'nav-tab-active' );

			}
		});

		var pageTabsView = new AMC.Views.PageTabs({ el: AMC.Dom.pageTabs });

		/*
			Route: menuControl
		 */

		// Menu item model
		AMC.Models.MenuItem = Backbone.Model.extend({
			defaults: {
				title: '',
				depth: 0
			}
		});

		// Menu items collection
		AMC.Collections.MenuItems = Backbone.Collection.extend({
			model: AMC.Models.MenuItem
		});

		var menuItemsCollection = new AMC.Collections.MenuItems();

		// Menu item view
		AMC.Dom.menuItemTemplate = $( '#menu-item-template-amc' );

		AMC.Views.MenuItem = Backbone.View.extend({
			tagName: 'li',
			className: 'menu__menu-item-amc',
			amcTemplate: _.template( AMC.Dom.menuItemTemplate.html() ),
			initialize: function() {

				this.render();

			},
			render: function() {

				this.$el.html( this.amcTemplate( this.model.toJSON() ) );

			}
		});

		// Menu items view
		AMC.Dom.menuItemsContainer = $( '.menu-control-sortable-container > ul' );
		AMC.Dom.menuControlSection = $( 'section[data-content="menu-control"]' );

		AMC.Views.MenuItems = Backbone.View.extend({
			initialize: function() {

				this.listenTo( this.collection, 'add', this.render );
				this.initSortable();

			},
			render: function( added ) {

				if ( _.isArray( added ) ) {

					this.renderMultiple( added );

				} else {

					this.renderSingle( added );

				}

			},
			renderMultiple: function( menuItems ) {

				var instance = this;

				menuItems.each( function( menuItem ) {

					instance.renderSingle( menuItem );

				});

			},
			renderSingle: function( menuItem ) {

				var menuItemView = new AMC.Views.MenuItem({ model: menuItem });

				AMC.Dom.menuItemsContainer.append( menuItemView.el );

			},
			initSortable: function() {

				AMC.Dom.menuItemsContainer.sortable({
					handle     : '.-js-menu-item-handle-amc',
					placeholder: 'menu__menu-item-amc ui-sortable-placeholder',
				});

			}
		});

		var menuItemsView = new AMC.Views.MenuItems({ collection: menuItemsCollection });

		// Menu control view
		AMC.Views.MenuControl = Backbone.View.extend({
			events: {
				
			},
			initialize: function() {

				_.each( AMClocalize.menu_items, function( menuItem ) {

					var newMenuItem = new AMC.Models.MenuItem( menuItem );

					menuItemsCollection.add( newMenuItem );

				})

			},
		});

		var menuControlView = new AMC.Views.MenuControl({ el: AMC.Dom.menuControlSection });

		/*
			Route: pluginSettings
		 */
		AMC.Dom.pluginSettingsSection = $( 'section[data-content="plugin-settings"]' );

		// Routing
		AMC.Router.App = Backbone.Router.extend({
			routes: {
				''               : 'menuControl',
				'plugin-settings': 'pluginSettings'
			}
		});

		var appRouter = new AMC.Router.App;

		appRouter.on( 'route:menuControl', function() {

			AMC.Dom.pluginSettingsSection.hide();
			AMC.Dom.menuControlSection.show();

		});

		appRouter.on( 'route:pluginSettings', function() {

			AMC.Dom.menuControlSection.hide();
			AMC.Dom.pluginSettingsSection.show();

		});

		Backbone.history.start();

	});

})( jQuery, Backbone );