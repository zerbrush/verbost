<?php
/*
Template Name: About Page
*/
get_header(); ?>

<section class="hero">
    <div class="container">
        <div class="text-center">
            <span class="badge badge-coral mb-4">About Verbost</span>
            <h1 class="mb-6">
                The Agency Built for the <span class="highlight">AI Future</span>
            </h1>
            <p class="body-text mb-8">
                We're pioneers in AI-driven website optimization, helping businesses thrive in both traditional search engines and emerging AI platforms.
            </p>
        </div>
    </div>
</section>

<!-- Mission Statement -->
<section class="section">
    <div class="container">
        <div class="text-center mb-12">
            <h2 class="mb-4">Our Mission</h2>
            <p style="font-size: 1.5rem; color: rgba(0, 59, 92, 0.7); line-height: 1.6;">
                "To empower businesses with the tools, strategies, and insights they need to optimize their digital presence for the AI future, ensuring sustained growth and competitive advantage."
            </p>
        </div>
        
        <div class="grid grid-cols-2" style="align-items: center;">
            <div>
                <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--navy); margin-bottom: 1rem;">Why We Started Verbost</h3>
                <p class="body-text mb-4">
                    The digital landscape is evolving rapidly. Traditional SEO strategies, while still important, are no longer sufficient to ensure long-term success. AI-powered search engines and content discovery platforms are changing how users find and interact with information.
                </p>
                <p class="body-text mb-4">
                    We founded Verbost to bridge this gap, providing businesses with the expertise and tools needed to optimize for both current search engines and the AI platforms of tomorrow.
                </p>
                <p class="body-text">
                    Our team combines deep technical expertise with practical business acumen, ensuring that every strategy we develop is both innovative and actionable.
                </p>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(255, 74, 92, 0.05) 0%, rgba(0, 111, 106, 0.05) 100%); border-radius: 1rem; padding: 2rem;">
                <div class="grid grid-cols-2" style="gap: 1.5rem;">
                    <div class="text-center">
                        <div style="font-size: 2rem; font-weight: 700; color: var(--coral); margin-bottom: 0.5rem;">500+</div>
                        <div class="secondary-text">Websites Optimized</div>
                    </div>
                    <div class="text-center">
                        <div style="font-size: 2rem; font-weight: 700; color: var(--deep-teal); margin-bottom: 0.5rem;">150%</div>
                        <div class="secondary-text">Avg. Traffic Increase</div>
                    </div>
                    <div class="text-center">
                        <div style="font-size: 2rem; font-weight: 700; color: var(--soft-gold); margin-bottom: 0.5rem;">98%</div>
                        <div class="secondary-text">Client Satisfaction</div>
                    </div>
                    <div class="text-center">
                        <div style="font-size: 2rem; font-weight: 700; color: var(--coral); margin-bottom: 0.5rem;">25+</div>
                        <div class="secondary-text">Countries Served</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Team Section -->
<section class="section section-white">
    <div class="container">
        <div class="text-center mb-12">
            <h2 class="mb-4">Meet Our Team</h2>
            <p class="body-text">
                Industry experts and AI pioneers dedicated to your success
            </p>
        </div>
        
        <div class="grid grid-cols-4">
            <?php
            $team_query = new WP_Query(array(
                'post_type' => 'team',
                'posts_per_page' => 4,
                'post_status' => 'publish'
            ));
            
            if ($team_query->have_posts()) :
                while ($team_query->have_posts()) : $team_query->the_post();
                    $role = get_post_meta(get_the_ID(), '_team_role', true);
                    $expertise = get_post_meta(get_the_ID(), '_team_expertise', true);
                    $expertise_array = explode(',', $expertise);
            ?>
            <div class="card">
                <div class="card-header text-center">
                    <?php if (has_post_thumbnail()) : ?>
                        <div style="width: 6rem; height: 6rem; border-radius: 50%; margin: 0 auto 1rem; overflow: hidden;">
                            <?php the_post_thumbnail('thumbnail', array('style' => 'width: 100%; height: 100%; object-fit: cover;')); ?>
                        </div>
                    <?php endif; ?>
                    <h3 class="card-title"><?php the_title(); ?></h3>
                    <p style="color: var(--coral); font-weight: 500;"><?php echo $role; ?></p>
                </div>
                <div class="card-content">
                    <p class="body-text" style="font-size: 0.875rem; margin-bottom: 1rem;"><?php the_content(); ?></p>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <?php foreach ($expertise_array as $skill) : ?>
                            <span class="badge" style="font-size: 0.75rem; border: 1px solid rgba(0, 59, 92, 0.2); color: var(--navy);">
                                <?php echo trim($skill); ?>
                            </span>
                        <?php endforeach; ?>
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
        <h2 class="mb-4" style="color: white;">Ready to Work with Us?</h2>
        <p class="mb-8" style="color: rgba(255, 255, 255, 0.9); font-size: 1.25rem;">
            Join hundreds of businesses that have transformed their digital presence with our AI-driven optimization strategies.
        </p>
        <div class="flex justify-center space-x-4">
            <a href="/contact" class="btn btn-lg" style="background-color: white; color: var(--coral);">
                Get Started Today
                <?php echo verbost_get_svg_icon('arrow-right'); ?>
            </a>
            <a href="/contact" class="btn btn-outline btn-lg" style="border-color: white; color: white;">
                Schedule a Call
            </a>
        </div>
    </div>
</section>

<?php get_footer(); ?>