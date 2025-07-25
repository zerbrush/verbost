<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <header id="masthead" class="navbar">
        <div class="navbar-container">
            <div class="navbar-brand">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="navbar-brand">
                    <div class="navbar-logo">
                        <?php echo verbost_get_svg_icon('zap'); ?>
                    </div>
                    <span class="navbar-title">
                        <?php bloginfo('name'); ?>
                    </span>
                </a>
            </div>
            
            <nav id="site-navigation" class="main-navigation">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                    'container'      => false,
                    'menu_class'     => 'navbar-nav',
                    'fallback_cb'    => 'verbost_default_menu',
                ));
                ?>
            </nav>
            
            <div class="navbar-actions">
                <a href="/login" class="btn btn-outline btn-sm">Sign In</a>
                <a href="/contact" class="btn btn-primary btn-sm">Get Started</a>
            </div>
        </div>
    </header>

    <div id="content" class="site-content">