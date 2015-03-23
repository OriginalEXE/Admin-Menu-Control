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
				url  : '',
				depth: 0,
				page : 'Appearance : Editor'
			}
		});

		// Menu items collection
		AMC.Collections.MenuItems = Backbone.Collection.extend({
			model: AMC.Models.MenuItem
		});

		var activeMenuItemsCollection = new AMC.Collections.MenuItems();
		var inactiveMenuItemsCollection = new AMC.Collections.MenuItems();

		// Add links view
		AMC.Dom.inactiveMenuItemsContainer = $( '.-js-inactive-menu-item-amc' );

		AMC.Views.AddLinks = Backbone.View.extend({
			events: {
				'click .-js-menu-control-aside-amc__accordions__accordion__title': 'toggleAccordion',
				'click .-js-add-menu-item-amc': 'addMenuItem',
				'click .-js-restore-menu-items-amc': 'restoreMenuItem'
			},
			initialize: function() {

				this.listenTo( this.collection, 'add', this.render );

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

				var menuItemView = new AMC.Views.InactiveMenuItem({ model: menuItem });

				AMC.Dom.inactiveMenuItemsContainer.append( menuItemView.el );

			},
			toggleAccordion: function( event ) {

				var $title  = $( event.currentTarget ),
					$body   = $title.next( '.-js-menu-control-aside-amc__accordions__accordion__body' ),
					$target = $title.parent( '.-js-menu-control-aside-amc__accordions__accordion' );

				if ( $target.is( '.is-open-amc' ) ) {

					$body.slideUp( 200, function() {

						$target.removeClass( 'is-open-amc' );

					});

				} else {

					var $activeTargets = $target.siblings( '.is-open-amc' );

					if ( $activeTargets.length ) {

						$activeTargets.each( function() {

							var $activeTarget = $( this ),
								$activeTitle  = $activeTarget.children( '.-js-menu-control-aside-amc__accordions__accordion__title' ),
								$activeBody   = $activeTarget.children( '.-js-menu-control-aside-amc__accordions__accordion__body' );

							$activeBody.slideUp( 200, function() {

								$activeTarget.removeClass( 'is-open-amc' );

							});

						});

					}

					$body.slideDown( 200, function() {

						$target.addClass( 'is-open-amc' );

					});

				}

			},
			addMenuItem: function( event ) {

				var $button    = $( event.currentTarget ),
					$container = $button.closest( '.-js-menu-control-aside-amc__accordions__accordion__body' ),
					$url       = $container.find( 'input[name="-js-menu-item-url"]' ),
					$title     = $container.find( 'input[name="-js-menu-item-title"]' ),
					url        = $url.val().trim(),
					title      = $title.val().trim();

				// Check if url field is empty
				if ( ! url.length ) {

					$url.focus();

					return;

				}

				// Check if title field is empty
				if ( ! title.length ) {

					$title.focus();

					return;

				}

				var menuItem = {
					title: _.escape( title ),
					url  : url,
					depth: 0
				};

				var newMenuItem = new AMC.Models.MenuItem( menuItem );

				activeMenuItemsCollection.add( newMenuItem );

				$title.val( '' );
				$url.val( 'http://' );

			},
			restoreMenuItem: function( event ) {

				var $button    = $( event.currentTarget ),
					$container = $button.closest( '.-js-menu-control-aside-amc__accordions__accordion__body' ),
					$menuItems = $container.find( 'input[type="checkbox"]:checked' ).parent();

				if ( ! $menuItems.length ) {

					return;

				}

				$menuItems.each( function() {

					$( this ).trigger( 'restore.amc' );

				});

			}
		});
		
		AMC.Dom.menuControlAside = $( '.menu-control-aside-amc' );

		var addLinksView = new AMC.Views.AddLinks({ collection: inactiveMenuItemsCollection, el: AMC.Dom.menuControlAside });

		// Inactive menu item view
		AMC.Dom.inactiveMenuItemTemplate = $( '#inactive-menu-item-template-amc' );

		AMC.Views.InactiveMenuItem = Backbone.View.extend({
			events: {
				'restore.amc': 'restore'
			},
			tagName: 'li',
			amcTemplate: _.template( AMC.Dom.inactiveMenuItemTemplate.html() ),
			initialize: function() {

				this.render();

			},
			render: function() {

				this.$el.html( this.amcTemplate( this.model.toJSON() ) );

			},
			restore: function( event ) {

				inactiveMenuItemsCollection.remove( this.model );
				activeMenuItemsCollection.add( this.model );

				$( event.currentTarget ).remove();

			}
		});

		// Active menu item view
		AMC.Dom.activeMenuItemTemplate = $( '#menu-item-template-amc' );

		AMC.Views.ActiveMenuItem = Backbone.View.extend({
			events: {
				'depth_change': 'updateDepth',
				'click .-js-menu__menu-item__edit-amc': 'toggleEdit',
				'change input': 'inputChanged'
			},
			tagName: 'li',
			className: 'menu__menu-item-amc',
			amcTemplate: _.template( AMC.Dom.activeMenuItemTemplate.html() ),
			initialize: function() {

				this.render();

				this.model.on( 'change', this.render, this );

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

			},
			toggleEdit: function( event ) {

				var $trigger = $( event.currentTarget ),
					$bar     = $trigger.closest( '.menu__menu-item__bar-amc' ),
					$item    = $bar.closest( '.menu__menu-item-amc' ),
					$body    = $bar.next( '.menu__menu-item__body-amc' );

				$body.slideToggle( 200, function() {

					$item.toggleClass( 'is-open-amc' );

				});

			},
			inputChanged: function( event ) {

				var $input   = $( event.currentTarget ),
					property = $input.attr( 'name' );

				this.model.set( property, _.escape( $input.val().trim() ) );

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

				var menuItemView = new AMC.Views.ActiveMenuItem({ model: menuItem });

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

		var menuItemsView = new AMC.Views.MenuItems({ collection: activeMenuItemsCollection });

		// Menu control view
		AMC.Views.MenuControl = Backbone.View.extend({
			events: {
				
			},
			initialize: function() {

				_.each( AMClocalize.menu_items, function( menuItem ) {

					var newMenuItem = new AMC.Models.MenuItem( menuItem );

					activeMenuItemsCollection.add( newMenuItem );

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