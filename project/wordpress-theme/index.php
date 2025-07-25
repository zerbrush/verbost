<?php get_header(); ?>

<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <div class="text-center">
            <span class="badge badge-coral mb-4">
                The Agency Built for the AI Future
            </span>
            <h1 class="mb-6">
                <?php echo get_theme_mod('hero_title', 'Optimize Your Website for the <span class="highlight">AI Future</span>'); ?>
            </h1>
            <p class="body-text mb-8">
                <?php echo get_theme_mod('hero_subtitle', 'AI-driven website assessments, content strategy, and ongoing monitoring to ensure your business thrives in search engines and AI platforms'); ?>
            </p>
            <div class="flex justify-center items-center space-x-4 mb-12">
                <a href="#assessment" class="btn btn-primary btn-lg">
                    Get Free Website Assessment
                    <?php echo verbost_get_svg_icon('arrow-right'); ?>
                </a>
                <a href="#demo" class="btn btn-outline btn-lg">
                    Watch Demo
                </a>
            </div>
            
            <!-- Quick Assessment Form -->
            <div class="card" style="max-width: 600px; margin: 0 auto;">
                <div class="card-header">
                    <h3 class="card-title">Start Your Free Assessment</h3>
                    <p class="card-description">
                        Enter your website URL to begin your AI-powered analysis
                    </p>
                </div>
                <div class="card-content">
                    <form id="assessment-form" class="flex space-x-4">
                        <input type="url" name="url" placeholder="Enter your website URL" required style="flex: 1; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem;">
                        <button type="submit" class="btn btn-primary">
                            Analyze
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Stats Section -->
<section class="section section-white">
    <div class="container">
        <div class="grid grid-cols-4">
            <div class="text-center">
                <div style="font-size: 2rem; font-weight: bold; color: var(--coral); margin-bottom: 0.5rem;">500+</div>
                <div class="secondary-text">Websites Analyzed</div>
            </div>
            <div class="text-center">
                <div style="font-size: 2rem; font-weight: bold; color: var(--coral); margin-bottom: 0.5rem;">150%</div>
                <div class="secondary-text">Avg. Traffic Increase</div>
            </div>
            <div class="text-center">
                <div style="font-size: 2rem; font-weight: bold; color: var(--coral); margin-bottom: 0.5rem;">24/7</div>
                <div class="secondary-text">Monitoring Service</div>
            </div>
            <div class="text-center">
                <div style="font-size: 2rem; font-weight: bold; color: var(--coral); margin-bottom: 0.5rem;">98%</div>
                <div class="secondary-text">Client Satisfaction</div>
            </div>
        </div>
    </div>
</section>

<!-- Services Section -->
<section class="section">
    <div class="container">
        <div class="text-center mb-12">
            <h2 class="mb-4">Why Choose Verbost?</h2>
            <p class="body-text">
                We combine cutting-edge AI technology with expert human insight to deliver unparalleled website optimization results
            </p>
        </div>
        
        <div class="grid grid-cols-3">
            <?php
            $services_query = new WP_Query(array(
                'post_type' => 'services',
                'posts_per_page' => 3,
                'post_status' => 'publish'
            ));
            
            if ($services_query->have_posts()) :
                while ($services_query->have_posts()) : $services_query->the_post();
            ?>
            <div class="card">
                <div class="card-header">
                    <div class="mb-4">
                        <?php echo verbost_get_svg_icon('zap'); ?>
                    </div>
                    <h3 class="card-title"><?php the_title(); ?></h3>
                </div>
                <div class="card-content">
                    <p class="body-text"><?php the_excerpt(); ?></p>
                </div>
            </div>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
                // Default services if none exist
                $default_services = array(
                    array(
                        'title' => 'AI-Powered Assessment',
                        'description' => 'Comprehensive website health analysis using advanced AI algorithms to identify optimization opportunities.'
                    ),
                    array(
                        'title' => 'Expert CX Strategy',
                        'description' => 'Professional content and user experience optimization from industry experts with proven results.'
                    ),
                    array(
                        'title' => 'Continuous Monitoring',
                        'description' => 'Ongoing performance tracking and recommendations to ensure sustained growth and optimization.'
                    )
                );
                
                foreach ($default_services as $service) :
            ?>
            <div class="card">
                <div class="card-header">
                    <div class="mb-4">
                        <?php echo verbost_get_svg_icon('zap'); ?>
                    </div>
                    <h3 class="card-title"><?php echo $service['title']; ?></h3>
                </div>
                <div class="card-content">
                    <p class="body-text"><?php echo $service['description']; ?></p>
                </div>
            </div>
            <?php
                endforeach;
            endif;
            ?>
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section class="section section-white">
    <div class="container">
        <div class="text-center mb-12">
            <h2 class="mb-4">What Our Clients Say</h2>
            <p class="body-text">
                Don't just take our word for it - hear from businesses that have transformed their online presence
            </p>
        </div>
        
        <div class="grid grid-cols-3">
            <?php
            $testimonials_query = new WP_Query(array(
                'post_type' => 'testimonials',
                'posts_per_page' => 3,
                'post_status' => 'publish'
            ));
            
            if ($testimonials_query->have_posts()) :
                while ($testimonials_query->have_posts()) : $testimonials_query->the_post();
                    $client_name = get_post_meta(get_the_ID(), '_testimonial_client_name', true);
                    $client_role = get_post_meta(get_the_ID(), '_testimonial_client_role', true);
                    $rating = get_post_meta(get_the_ID(), '_testimonial_rating', true);
            ?>
            <div class="card">
                <div class="card-content">
                    <div class="flex mb-4">
                        <?php for ($i = 1; $i <= 5; $i++) : ?>
                            <span style="color: <?php echo $i <= $rating ? 'var(--soft-gold)' : '#ddd'; ?>;">★</span>
                        <?php endfor; ?>
                    </div>
                    <p class="body-text mb-4">"<?php the_content(); ?>"</p>
                    <div>
                        <p style="font-weight: 600; color: var(--navy);"><?php echo $client_name; ?></p>
                        <p class="secondary-text"><?php echo $client_role; ?></p>
                    </div>
                </div>
            </div>
            <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="section" style="background-color: var(--coral);">
    <div class="container text-center">
        <h2 class="mb-4" style="color: white;">Ready to Optimize for the AI Future?</h2>
        <p class="mb-8" style="color: rgba(255, 255, 255, 0.9); font-size: 1.25rem;">
            Join the businesses already preparing for tomorrow's search landscape. Get your free assessment today.
        </p>
        <div class="flex justify-center space-x-4">
            <a href="#assessment" class="btn btn-lg" style="background-color: white; color: var(--coral);">
                Get Free Assessment
                <?php echo verbost_get_svg_icon('arrow-right'); ?>
            </a>
            <a href="/contact" class="btn btn-outline btn-lg" style="border-color: white; color: white;">
                Schedule Consultation
            </a>
        </div>
    </div>
</section>

<?php get_footer(); ?>