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
			<div class="menu-control-container-amc__body">

				<?php

				global $menu, $submenu;

				?>

				<div class="menu-control-sortable-container">

					<ul class="menu-amc -js-menu-sortable-amc">

						<?php foreach ( $menu as $menu_item ) : ?>

							<?php $is_separator = ( empty( $menu_item[0] ) ) ? true : false; ?>

							<li class="menu__menu-item-amc">
								<dl class="menu__menu-item__bar-amc">
									<dt class="menu__menu-item__handle-amc <?php echo ( $is_separator ) ? 'menu__menu-item__handle-amc--separator' : ''; ?> -js-menu-item-handle-amc">
										<span class="menu__menu-item__title-amc">
											<?php echo ( $is_separator ) ? '<hr>' : preg_replace( '!<\s*(span).*?>((.*?)</\1>)?!is', '', $menu_item[0] ); ?>
										</span>
									</dt>
								</dl>
							</li>

							<?php if ( ! empty( $submenu[ $menu_item[2] ] ) ) : ?>

								<?php foreach ( $submenu[ $menu_item[2] ] as $submenu_item ) : ?>

									<li class="menu__menu-item-amc menu__menu-item-amc--depth-1">
										<dl class="menu__menu-item__bar-amc">
											<dt class="menu__menu-item__handle-amc -js-menu-item-handle-amc">
												<span class="menu__menu-item__title-amc">
													<?php echo preg_replace( '!<\s*(span).*?>((.*?)</\1>)?!is', '', $submenu_item[0] ); ?>
												</span>
											</dt>
										</dl>
									</li>

								<?php endforeach; ?>

							<?php endif; ?>

						<?php endforeach; ?>

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

</div>