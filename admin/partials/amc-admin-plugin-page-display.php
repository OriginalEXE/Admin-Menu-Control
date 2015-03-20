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

<div class="wrap wrap-amc">

	<h2><?php _e( 'Admin Menu Control', 'admin-menu-control' ); ?></h2>

	<h2 class="nav-tab-wrapper">
		<a href="options-general.php?page=admin-menu-control" class="nav-tab nav-tab-active">
			<?php _e( 'Menu Control', 'admin-menu-control' ); ?>
		</a>
		<a href="options-general.php?page=admin-menu-control" class="nav-tab">
			<?php _e( 'Settings', 'admin-menu-control' ); ?>
		</a>
	</h2>

	<section class="tab-amc" data-content="menu-control">

		<div class="menu-control-container-amc">
			<header class="menu-control-container-amc__header">
				<div class="h-pull-right-amc">
					<?php submit_button( __( 'Save Menu', 'admin-menu-control' ) ); ?>
				</div>
			</header>
			<footer class="menu-control-container-amc__footer"></footer>
		</div>

	</section>

</div>