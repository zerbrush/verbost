<?php
/**
 * Verbost AI Theme Functions
 */

// Theme setup
function verbost_theme_setup() {
    // Add theme support for various features
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    add_theme_support('custom-logo');
    add_theme_support('customize-selective-refresh-widgets');

    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'verbost'),
        'footer' => __('Footer Menu', 'verbost'),
    ));
}
add_action('after_setup_theme', 'verbost_theme_setup');

// Enqueue styles and scripts
function verbost_scripts() {
    // Google Fonts
    wp_enqueue_style('verbost-fonts', 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap');
    
    // Theme stylesheet
    wp_enqueue_style('verbost-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Custom JavaScript
    wp_enqueue_script('verbost-script', get_template_directory_uri() . '/js/main.js', array('jquery'), '1.0.0', true);
    
    // Localize script for AJAX
    wp_localize_script('verbost-script', 'verbost_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('verbost_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'verbost_scripts');

// Register widget areas
function verbost_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar', 'verbost'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here.', 'verbost'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Footer 1', 'verbost'),
        'id'            => 'footer-1',
        'description'   => __('Footer widget area 1.', 'verbost'),
        'before_widget' => '<div class="footer-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3>',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Footer 2', 'verbost'),
        'id'            => 'footer-2',
        'description'   => __('Footer widget area 2.', 'verbost'),
        'before_widget' => '<div class="footer-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3>',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Footer 3', 'verbost'),
        'id'            => 'footer-3',
        'description'   => __('Footer widget area 3.', 'verbost'),
        'before_widget' => '<div class="footer-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3>',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Footer 4', 'verbost'),
        'id'            => 'footer-4',
        'description'   => __('Footer widget area 4.', 'verbost'),
        'before_widget' => '<div class="footer-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3>',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'verbost_widgets_init');

// Custom post types
function verbost_custom_post_types() {
    // Services post type
    register_post_type('services', array(
        'labels' => array(
            'name' => __('Services', 'verbost'),
            'singular_name' => __('Service', 'verbost'),
            'add_new' => __('Add New Service', 'verbost'),
            'add_new_item' => __('Add New Service', 'verbost'),
            'edit_item' => __('Edit Service', 'verbost'),
            'new_item' => __('New Service', 'verbost'),
            'view_item' => __('View Service', 'verbost'),
            'search_items' => __('Search Services', 'verbost'),
            'not_found' => __('No services found', 'verbost'),
            'not_found_in_trash' => __('No services found in trash', 'verbost'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-admin-tools',
        'rewrite' => array('slug' => 'services'),
    ));

    // Team Members post type
    register_post_type('team', array(
        'labels' => array(
            'name' => __('Team Members', 'verbost'),
            'singular_name' => __('Team Member', 'verbost'),
            'add_new' => __('Add New Team Member', 'verbost'),
            'add_new_item' => __('Add New Team Member', 'verbost'),
            'edit_item' => __('Edit Team Member', 'verbost'),
            'new_item' => __('New Team Member', 'verbost'),
            'view_item' => __('View Team Member', 'verbost'),
            'search_items' => __('Search Team Members', 'verbost'),
            'not_found' => __('No team members found', 'verbost'),
            'not_found_in_trash' => __('No team members found in trash', 'verbost'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-groups',
        'rewrite' => array('slug' => 'team'),
    ));

    // Testimonials post type
    register_post_type('testimonials', array(
        'labels' => array(
            'name' => __('Testimonials', 'verbost'),
            'singular_name' => __('Testimonial', 'verbost'),
            'add_new' => __('Add New Testimonial', 'verbost'),
            'add_new_item' => __('Add New Testimonial', 'verbost'),
            'edit_item' => __('Edit Testimonial', 'verbost'),
            'new_item' => __('New Testimonial', 'verbost'),
            'view_item' => __('View Testimonial', 'verbost'),
            'search_items' => __('Search Testimonials', 'verbost'),
            'not_found' => __('No testimonials found', 'verbost'),
            'not_found_in_trash' => __('No testimonials found in trash', 'verbost'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-format-quote',
        'rewrite' => array('slug' => 'testimonials'),
    ));
}
add_action('init', 'verbost_custom_post_types');

// Custom meta boxes
function verbost_add_meta_boxes() {
    // Service meta box
    add_meta_box(
        'service_details',
        __('Service Details', 'verbost'),
        'verbost_service_meta_box_callback',
        'services',
        'normal',
        'high'
    );

    // Team member meta box
    add_meta_box(
        'team_details',
        __('Team Member Details', 'verbost'),
        'verbost_team_meta_box_callback',
        'team',
        'normal',
        'high'
    );

    // Testimonial meta box
    add_meta_box(
        'testimonial_details',
        __('Testimonial Details', 'verbost'),
        'verbost_testimonial_meta_box_callback',
        'testimonials',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'verbost_add_meta_boxes');

// Service meta box callback
function verbost_service_meta_box_callback($post) {
    wp_nonce_field('verbost_save_service_meta', 'verbost_service_meta_nonce');
    
    $pricing = get_post_meta($post->ID, '_service_pricing', true);
    $timeline = get_post_meta($post->ID, '_service_timeline', true);
    $features = get_post_meta($post->ID, '_service_features', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="service_pricing">Pricing</label></th>';
    echo '<td><input type="text" id="service_pricing" name="service_pricing" value="' . esc_attr($pricing) . '" /></td></tr>';
    echo '<tr><th><label for="service_timeline">Timeline</label></th>';
    echo '<td><input type="text" id="service_timeline" name="service_timeline" value="' . esc_attr($timeline) . '" /></td></tr>';
    echo '<tr><th><label for="service_features">Features (one per line)</label></th>';
    echo '<td><textarea id="service_features" name="service_features" rows="5" cols="50">' . esc_textarea($features) . '</textarea></td></tr>';
    echo '</table>';
}

// Team member meta box callback
function verbost_team_meta_box_callback($post) {
    wp_nonce_field('verbost_save_team_meta', 'verbost_team_meta_nonce');
    
    $role = get_post_meta($post->ID, '_team_role', true);
    $expertise = get_post_meta($post->ID, '_team_expertise', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="team_role">Role</label></th>';
    echo '<td><input type="text" id="team_role" name="team_role" value="' . esc_attr($role) . '" /></td></tr>';
    echo '<tr><th><label for="team_expertise">Expertise (comma separated)</label></th>';
    echo '<td><input type="text" id="team_expertise" name="team_expertise" value="' . esc_attr($expertise) . '" /></td></tr>';
    echo '</table>';
}

// Testimonial meta box callback
function verbost_testimonial_meta_box_callback($post) {
    wp_nonce_field('verbost_save_testimonial_meta', 'verbost_testimonial_meta_nonce');
    
    $client_name = get_post_meta($post->ID, '_testimonial_client_name', true);
    $client_role = get_post_meta($post->ID, '_testimonial_client_role', true);
    $rating = get_post_meta($post->ID, '_testimonial_rating', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="testimonial_client_name">Client Name</label></th>';
    echo '<td><input type="text" id="testimonial_client_name" name="testimonial_client_name" value="' . esc_attr($client_name) . '" /></td></tr>';
    echo '<tr><th><label for="testimonial_client_role">Client Role</label></th>';
    echo '<td><input type="text" id="testimonial_client_role" name="testimonial_client_role" value="' . esc_attr($client_role) . '" /></td></tr>';
    echo '<tr><th><label for="testimonial_rating">Rating (1-5)</label></th>';
    echo '<td><select id="testimonial_rating" name="testimonial_rating">';
    for ($i = 1; $i <= 5; $i++) {
        echo '<option value="' . $i . '"' . selected($rating, $i, false) . '>' . $i . '</option>';
    }
    echo '</select></td></tr>';
    echo '</table>';
}

// Save meta box data
function verbost_save_meta_boxes($post_id) {
    // Service meta
    if (isset($_POST['verbost_service_meta_nonce']) && wp_verify_nonce($_POST['verbost_service_meta_nonce'], 'verbost_save_service_meta')) {
        if (isset($_POST['service_pricing'])) {
            update_post_meta($post_id, '_service_pricing', sanitize_text_field($_POST['service_pricing']));
        }
        if (isset($_POST['service_timeline'])) {
            update_post_meta($post_id, '_service_timeline', sanitize_text_field($_POST['service_timeline']));
        }
        if (isset($_POST['service_features'])) {
            update_post_meta($post_id, '_service_features', sanitize_textarea_field($_POST['service_features']));
        }
    }

    // Team meta
    if (isset($_POST['verbost_team_meta_nonce']) && wp_verify_nonce($_POST['verbost_team_meta_nonce'], 'verbost_save_team_meta')) {
        if (isset($_POST['team_role'])) {
            update_post_meta($post_id, '_team_role', sanitize_text_field($_POST['team_role']));
        }
        if (isset($_POST['team_expertise'])) {
            update_post_meta($post_id, '_team_expertise', sanitize_text_field($_POST['team_expertise']));
        }
    }

    // Testimonial meta
    if (isset($_POST['verbost_testimonial_meta_nonce']) && wp_verify_nonce($_POST['verbost_testimonial_meta_nonce'], 'verbost_save_testimonial_meta')) {
        if (isset($_POST['testimonial_client_name'])) {
            update_post_meta($post_id, '_testimonial_client_name', sanitize_text_field($_POST['testimonial_client_name']));
        }
        if (isset($_POST['testimonial_client_role'])) {
            update_post_meta($post_id, '_testimonial_client_role', sanitize_text_field($_POST['testimonial_client_role']));
        }
        if (isset($_POST['testimonial_rating'])) {
            update_post_meta($post_id, '_testimonial_rating', intval($_POST['testimonial_rating']));
        }
    }
}
add_action('save_post', 'verbost_save_meta_boxes');

// Customizer settings
function verbost_customize_register($wp_customize) {
    // Hero section
    $wp_customize->add_section('verbost_hero', array(
        'title' => __('Hero Section', 'verbost'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hero_title', array(
        'default' => 'Optimize Your Website for the AI Future',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('hero_title', array(
        'label' => __('Hero Title', 'verbost'),
        'section' => 'verbost_hero',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hero_subtitle', array(
        'default' => 'AI-driven website assessments, content strategy, and ongoing monitoring to ensure your business thrives in search engines and AI platforms',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));

    $wp_customize->add_control('hero_subtitle', array(
        'label' => __('Hero Subtitle', 'verbost'),
        'section' => 'verbost_hero',
        'type' => 'textarea',
    ));

    // Contact information
    $wp_customize->add_section('verbost_contact', array(
        'title' => __('Contact Information', 'verbost'),
        'priority' => 35,
    ));

    $wp_customize->add_setting('contact_email', array(
        'default' => 'hello@verbost.ai',
        'sanitize_callback' => 'sanitize_email',
    ));

    $wp_customize->add_control('contact_email', array(
        'label' => __('Email Address', 'verbost'),
        'section' => 'verbost_contact',
        'type' => 'email',
    ));

    $wp_customize->add_setting('contact_phone', array(
        'default' => '+1 (555) 123-4567',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('contact_phone', array(
        'label' => __('Phone Number', 'verbost'),
        'section' => 'verbost_contact',
        'type' => 'text',
    ));
}
add_action('customize_register', 'verbost_customize_register');

// AJAX handler for assessment form
function verbost_handle_assessment_form() {
    check_ajax_referer('verbost_nonce', 'nonce');
    
    $url = sanitize_url($_POST['url']);
    $email = sanitize_email($_POST['email']);
    
    if (empty($url) || empty($email)) {
        wp_send_json_error('Please fill in all required fields.');
    }
    
    // Here you would typically save to database or send email
    // For now, we'll just return success
    wp_send_json_success('Assessment request submitted successfully!');
}
add_action('wp_ajax_submit_assessment', 'verbost_handle_assessment_form');
add_action('wp_ajax_nopriv_submit_assessment', 'verbost_handle_assessment_form');

// Helper function to get SVG icon
function verbost_get_svg_icon($icon_name) {
    $icons = array(
        'zap' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon></svg>',
        'search' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>',
        'users' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
        'trending-up' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline><polyline points="16,7 22,7 22,13"></polyline></svg>',
        'arrow-right' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12,5 19,12 12,19"></polyline></svg>',
    );
    
    return isset($icons[$icon_name]) ? $icons[$icon_name] : '';
}