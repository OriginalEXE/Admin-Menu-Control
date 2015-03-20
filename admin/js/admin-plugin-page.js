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

		var testCollection = new AMC.Collections.MenuItems([
			{
				title: 'Dashboard',
				depth: 0
			},
			{
				title: 'Posts',
				depth: 1
			}
		]);

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

		AMC.Views.MenuItems = Backbone.View.extend({
			initialize: function() {

				this.render();

			},
			render: function() {

				this.collection.each( function( menuItem ) {

					var menuItemView = new AMC.Views.MenuItem({ model: menuItem });

					AMC.Dom.menuItemsContainer.append( menuItemView.el );

				});

			}
		});

		var testView = new AMC.Views.MenuItems({ collection: testCollection });



		// Routing

		Backbone.history.start();



		// Testing
		var comments = new AMC.Models.MenuItem({ title: 'Comments', depth: 0 });

		testCollection.add( comments );

		console.log( testCollection.toJSON() );

	});

})( jQuery, Backbone );