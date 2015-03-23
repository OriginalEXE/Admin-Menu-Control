<?php

/**
 * Display main plugin page
 *
 * @link       https://github.com/OriginalEXE
 * @since      1.0.0
 *
 * @package    AdminMenuControl
 * @subpackage AdminMenuControl/admin/partials
 */

?>

<!-- Backbone templates -->
<script id="menu-item-template-amc" type="text/template">
	<dl class="menu__menu-item__bar-amc">
		<dt class="menu__menu-item__handle-amc <%= ( '<hr>' === title ) ? 'menu__menu-item__handle-amc--separator -js-menu-item-separator-amc' : '' %> -js-menu-item-handle-amc">
			<span class="menu__menu-item__title-amc">
				<%= title %>
			</span>
			<span class="menu__menu-item__edit-amc -js-menu__menu-item__edit-amc"></span>
		</dt>
	</dl>
	<div class="menu__menu-item__body-amc">
		<p>
			<label>
				<?php _e( 'Navigation Label', 'admin-menu-control' ); ?>
				<input type="text" class="widefat" name="title" value="<%= title %>">
			</label>
		</p>
		<p>
			<label>
				<?php _e( 'Page', 'admin-menu-control' ); ?>
				<select name="page" class="widefat">
					<option value="custom" data-url="url" <%= ( 'custom' === page ) ? 'selected="selected"' : '' %>><?php _e( 'Custom', 'admin-menu-control' ); ?></option>
					<option value="none" data-url="#amc" <%= ( 'none' === page ) ? 'selected="selected"' : '' %>><?php _e( 'None', 'admin-menu-control' ); ?></option>
					<% _.each( AMClocalize.admin_pages, function( registeredPage ) { %>
						<option value="<%= registeredPage.title %>" data-url="<%= registeredPage.url %>" <%= ( registeredPage.title === page ) ? 'selected="selected"' : '' %>><%= registeredPage.title %></option>
					<% }) %>
				</select>
			</label>
		</p>
		<p>
			<label>
				<?php _e( 'URL', 'admin-menu-control' ); ?>
				<input type="text" class="widefat" name="url" value="<%= url %>">
			</label>
		</p>
	</div>
	<ul class="menu_menu-item__transport"></ul>
</script>

<script id="inactive-menu-item-template-amc" type="text/template">
	<label class="menu-item-title">
		<input type="checkbox"> <%= title %>
	</label>
</script>
<!-- / Backbone templates -->

<div class="wrap wrap-amc">

	<h2><?php _e( 'Admin Menu Control', 'admin-menu-control' ); ?></h2>

	<h2 class="nav-tab-wrapper">
		<a href="#/" class="nav-tab nav-tab-active">
			<?php _e( 'Menu Control', 'admin-menu-control' ); ?>
		</a>
		<a href="#/plugin-settings" class="nav-tab">
			<?php _e( 'Settings', 'admin-menu-control' ); ?>
		</a>
	</h2>

	<section class="tab-amc h-clearfix-amc" data-content="menu-control">

		<div class="menu-control-aside-amc">
			<ul class="menu-control-aside-amc__accordions">
				<li class="menu-control-aside-amc__accordions__accordion is-open-amc -js-menu-control-aside-amc__accordions__accordion">
					<h3 class="menu-control-aside-amc__accordions__accordion__title -js-menu-control-aside-amc__accordions__accordion__title">
						<?php _e( 'Links', 'admin-menu-control' ); ?>
					</h3>
					<div class="menu-control-aside-amc__accordions__accordion__body -js-menu-control-aside-amc__accordions__accordion__body">
						<p>
							<label>
								<span><?php _e( 'URL', 'admin-menu-control' ); ?></span>
								<input type="text" name="-js-menu-item-url" value="http://">
							</label>
						</p>
						<p>
							<label>
								<span><?php _e( 'Link Text', 'admin-menu-control' ); ?></span>
								<input type="text" name="-js-menu-item-title" placeholder="<?php echo esc_attr( __( 'Menu Item', 'admin-menu-control' ) ); ?>">
							</label>
						</p>
						<p class="button-controls">
							<button class="button-secondary -js-add-menu-item-amc"><?php _e( 'Add to Menu', 'admin-menu-control' ); ?></button>
						</p>
					</div>
				</li>
				<li class="menu-control-aside-amc__accordions__accordion -js-menu-control-aside-amc__accordions__accordion">
					<h3 class="menu-control-aside-amc__accordions__accordion__title -js-menu-control-aside-amc__accordions__accordion__title">
						<?php _e( 'Inactive', 'admin-menu-control' ); ?>
					</h3>
					<div class="menu-control-aside-amc__accordions__accordion__body -js-menu-control-aside-amc__accordions__accordion__body">
						<ul class="inactive-menu-amc -js-inactive-menu-item-amc"></ul>
						<p class="button-controls">
							<button class="button-secondary -js-restore-menu-items-amc"><?php _e( 'Add to Menu', 'admin-menu-control' ); ?></button>
						</p>
					</div>
				</li>
			</ul>
		</div>

		<div class="menu-control-container-amc">
			<header class="menu-control-container-amc__header">
				<div class="h-pull-right-amc">
					<?php submit_button( __( 'Save Menu', 'admin-menu-control' ) ); ?>
				</div>
			</header>
			<div class="menu-control-container-amc__body">

				<?php

				global $menu, $submenu;

				?>

				<div class="menu-control-sortable-container">

					<ul class="menu-amc -js-menu-sortable-amc">

					</ul>

				</div>

			</div>
			<footer class="menu-control-container-amc__footer">
				<div class="h-pull-left-amc">
					<a class="text--danger-amc -js-restore-config-amc" href="#">
						<?php _e( 'Restore menu', 'admin-menu-control' ); ?>
					</a>
				</div>
				<div class="h-pull-right-amc">
					<?php submit_button( __( 'Save Menu', 'admin-menu-control' ) ); ?>
				</div>				
			</footer>
		</div>

	</section>

	<section class="tab-amc" data-content="plugin-settings">

	</section>

</div>