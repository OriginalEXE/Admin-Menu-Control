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
			events: {
				'depth_change': 'updateDepth'
			},
			tagName: 'li',
			className: 'menu__menu-item-amc',
			amcTemplate: _.template( AMC.Dom.menuItemTemplate.html() ),
			initialize: function() {

				this.render();

			},
			render: function() {

				this.$el.html( this.amcTemplate( this.model.toJSON() ) );

			},
			attributes: function() {

				var attributes = {
					'data-depth': this.model.get( 'depth' )
				}

				if ( '<hr>' === this.model.get( 'title' ) ) {

					attributes['data-separator'] = true;

				}

				return attributes;

			},
			updateDepth: function( event, newDepth ) {

				newDepth = parseInt( newDepth, 10 );

				this.model.set( 'depth', newDepth );

				console.log( this.model.get( 'depth' ) );

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

				var instance = this;

				var $parents,
					$children,
					$transportContainer,
					transported,
					isSeparator,
					depth,
					realDepth,
					pxDepth = 30;

				AMC.Dom.menuItemsContainer.sortable({
					handle: '.-js-menu-item-handle-amc',
					placeholder: 'menu__menu-item-amc ui-sortable-placeholder',
					start: function( event, ui ) {

						isSeparator = ui.item.attr( 'data-separator' );

						depth = ui.item.attr( 'data-depth' );
						$children = ui.item.nextUntil( '[data-depth="0"]' ).not( '.ui-sortable-placeholder' );

						ui.placeholder.attr( 'data-depth', depth );

						if ( isSeparator || ( '0' === depth && $children.length ) ) {

							console.log( 'has children' );
							console.log( $children );

							transported = true;

							instance.transportChildren( ui );

						}

					},
					stop: function( event, ui ) {

						if ( transported ) {

							transported = false;

							instance.releaseChildren( ui );

						}

						ui.item.attr( 'data-depth', ui.placeholder.attr( 'data-depth' ) );

					},
					sort: function( event, ui ) {

						depth = ui.placeholder.attr( 'data-depth' );
						realDepth = ui.item.attr( 'data-depth' );

						// Check if separator or has children
						if ( transported ) {

							console.log( 'children or separator detected' );

							return;

						}

						// Stop separator from being a parent
						if ( ui.placeholder.prev( '[data-separator]' ).length || ( ui.placeholder.prev( '.ui-sortable-helper' ).length && ui.placeholder.prev().prev( '[data-separator]' ).length ) ) {

							ui.placeholder.attr( 'data-depth', 0 );

							AMC.Dom.menuItemsContainer.sortable( 'refresh' );

							return;

						}

						// Check if it's a child, but not a last child
						if ( '1' === depth && ui.placeholder.nextUntil( '[data-depth="0"]:not(.ui-sortable-helper)' ).not( '.ui-sortable-helper' ).length ) {

							console.log( 'not a last child' );

							ui.placeholder.attr( 'data-depth', 1 );

							AMC.Dom.menuItemsContainer.sortable( 'refresh' );

							return;

						}

						if ( 0 === ui.placeholder.index() || ( 0 === ui.helper.index() && 1 === ui.placeholder.index() ) ) {

							ui.placeholder.attr( 'data-depth', 0 );

							AMC.Dom.menuItemsContainer.sortable( 'refresh' );

							return;

						}

						if ( '0' === depth && ( depth === realDepth ) && ui.position.left > 30 ) {

							ui.placeholder.attr( 'data-depth', 1 );

							AMC.Dom.menuItemsContainer.sortable( 'refresh' );

						} else if ( '0' === depth && ( depth !== realDepth ) && ui.position.left > 0 ) {

							ui.placeholder.attr( 'data-depth', 1 );

							AMC.Dom.menuItemsContainer.sortable( 'refresh' );

						} else if ( '1' === depth && ( depth === realDepth ) && ui.position.left < 0 ) {

							ui.placeholder.attr( 'data-depth', 0 );

							AMC.Dom.menuItemsContainer.sortable( 'refresh' );

						} else if ( '1' === depth && ( depth !== realDepth ) && ui.position.left < 30 ) {

							ui.placeholder.attr( 'data-depth', 0 );

							AMC.Dom.menuItemsContainer.sortable( 'refresh' );

						}

					},
					change: function( event, ui ) {

						// Check if it's a child, but not a last child
						if ( '0' === depth && ui.placeholder.nextUntil( '[data-depth="0"]:not(.ui-sortable-helper)' ).not( '.ui-sortable-helper' ).length ) {

							console.log( 'not a last child' );

							ui.placeholder.attr( 'data-depth', 1 );

							AMC.Dom.menuItemsContainer.sortable( 'refresh' );

							return;

						}

					}
				});

			},
			transportChildren: function( ui ) {

				var $parents,
					$children,
					$transportContainer,
					depth;

				$parents = AMC.Dom.menuItemsContainer.children( '[data-depth="0"]' ).not( '.ui-sortable-placeholder' );

				if ( ! $parents.length ) {

					return;

				}

				$parents.each( function() {

					var $this = $( this );

					$transportContainer = $this.children( '.menu_menu-item__transport' );
					$children = $this.nextUntil( '[data-depth="0"]:not(.ui-sortable-placeholder)' ).not( '.ui-sortable-placeholder' );

					if ( ! $children.length ) {

						return true;

					}

					$transportContainer.append( $children );

					if ( ui.item[0] === $this[0] ) {

						ui.placeholder.height( ui.item.outerHeight() + $transportContainer.outerHeight() - 3 - ( $children.length * 4 ) );
						ui.placeholder.width( ui.item.find( '.-js-menu-item-handle-amc' ).outerWidth() + parseInt( $children.first().css( 'margin-left' ), 10 ) - 2 );

					}

					AMC.Dom.menuItemsContainer.sortable( 'refresh' );

				});

			},
			releaseChildren: function( ui ) {

				var $parents,
					$children,
					$transportContainer,
					depth;

				$parents = AMC.Dom.menuItemsContainer.children( '[data-depth="0"]' ).not( '.ui-sortable-placeholder' );

				if ( ! $parents.length ) {

					return;

				}

				$parents.each( function() {

					var $this = $( this );

					$transportContainer = $this.children( '.menu_menu-item__transport' );

					$transportContainer
								.children()
									.insertAfter( $this );

					AMC.Dom.menuItemsContainer.sortable( 'refresh' );

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