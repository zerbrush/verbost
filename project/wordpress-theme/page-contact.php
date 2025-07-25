<?php
/*
Template Name: Contact Page
*/
get_header(); ?>

<section class="hero">
    <div class="container">
        <div class="text-center">
            <span class="badge badge-coral mb-4">Get In Touch</span>
            <h1 class="mb-6">
                Let's Optimize Your Website for the <span class="highlight">AI Future</span>
            </h1>
            <p class="body-text mb-8">
                Ready to transform your digital presence? Our experts are here to help you succeed in the AI-driven landscape.
            </p>
        </div>
    </div>
</section>

<!-- Contact Information -->
<section class="section">
    <div class="container">
        <div class="grid grid-cols-4">
            <div class="card text-center">
                <div class="card-header">
                    <div style="margin: 0 auto 1rem;">
                        <?php echo verbost_get_svg_icon('mail'); ?>
                    </div>
                    <h3 class="card-title">Email Us</h3>
                    <p class="card-description">Get in touch via email</p>
                </div>
                <div class="card-content">
                    <p style="font-weight: 600; color: var(--navy); margin-bottom: 1rem;">
                        <?php echo get_theme_mod('contact_email', 'hello@verbost.ai'); ?>
                    </p>
                    <a href="mailto:<?php echo get_theme_mod('contact_email', 'hello@verbost.ai'); ?>" class="btn btn-outline btn-sm" style="width: 100%;">
                        Send Email
                    </a>
                </div>
            </div>
            
            <div class="card text-center">
                <div class="card-header">
                    <div style="margin: 0 auto 1rem;">
                        <?php echo verbost_get_svg_icon('phone'); ?>
                    </div>
                    <h3 class="card-title">Call Us</h3>
                    <p class="card-description">Speak with our team</p>
                </div>
                <div class="card-content">
                    <p style="font-weight: 600; color: var(--navy); margin-bottom: 1rem;">
                        <?php echo get_theme_mod('contact_phone', '+1 (555) 123-4567'); ?>
                    </p>
                    <a href="tel:<?php echo get_theme_mod('contact_phone', '+1 (555) 123-4567'); ?>" class="btn btn-outline btn-sm" style="width: 100%;">
                        Call Now
                    </a>
                </div>
            </div>
            
            <div class="card text-center">
                <div class="card-header">
                    <div style="margin: 0 auto 1rem;">
                        <?php echo verbost_get_svg_icon('map-pin'); ?>
                    </div>
                    <h3 class="card-title">Visit Us</h3>
                    <p class="card-description">Our office location</p>
                </div>
                <div class="card-content">
                    <p style="font-weight: 600; color: var(--navy); margin-bottom: 1rem;">San Francisco, CA</p>
                    <a href="#" class="btn btn-outline btn-sm" style="width: 100%;">
                        Get Directions
                    </a>
                </div>
            </div>
            
            <div class="card text-center">
                <div class="card-header">
                    <div style="margin: 0 auto 1rem;">
                        <?php echo verbost_get_svg_icon('clock'); ?>
                    </div>
                    <h3 class="card-title">Office Hours</h3>
                    <p class="card-description">When we're available</p>
                </div>
                <div class="card-content">
                    <p style="font-weight: 600; color: var(--navy); margin-bottom: 1rem;">Mon-Fri: 9AM-6PM PST</p>
                    <a href="/contact" class="btn btn-outline btn-sm" style="width: 100%;">
                        Schedule Call
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Contact Form -->
<section class="section section-white">
    <div class="container">
        <div class="grid grid-cols-2" style="gap: 3rem;">
            <div>
                <h2 class="mb-6">Send Us a Message</h2>
                <div class="card">
                    <div class="card-content">
                        <?php echo do_shortcode('[contact-form-7 id="1" title="Contact form 1"]'); ?>
                        
                        <!-- Fallback form if Contact Form 7 is not installed -->
                        <form id="contact-form" method="post" style="display: none;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                                <div>
                                    <label for="name" style="display: block; font-weight: 500; color: var(--navy); margin-bottom: 0.5rem;">Full Name *</label>
                                    <input type="text" id="name" name="name" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem;">
                                </div>
                                <div>
                                    <label for="email" style="display: block; font-weight: 500; color: var(--navy); margin-bottom: 0.5rem;">Email Address *</label>
                                    <input type="email" id="email" name="email" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem;">
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 1.5rem;">
                                <label for="subject" style="display: block; font-weight: 500; color: var(--navy); margin-bottom: 0.5rem;">Subject</label>
                                <input type="text" id="subject" name="subject" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem;">
                            </div>
                            
                            <div style="margin-bottom: 1.5rem;">
                                <label for="message" style="display: block; font-weight: 500; color: var(--navy); margin-bottom: 0.5rem;">Message *</label>
                                <textarea id="message" name="message" rows="5" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem;"></textarea>
                            </div>
                            
                            <button type="submit" class="btn btn-primary" style="width: 100%;">
                                Send Message
                                <?php echo verbost_get_svg_icon('arrow-right'); ?>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            <div>
                <h2 class="mb-6">Get Started Today</h2>
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <div class="card">
                        <div class="card-header">
                            <div class="flex items-center mb-4">
                                <?php echo verbost_get_svg_icon('globe'); ?>
                                <h3 class="card-title" style="margin-left: 0.75rem;">Free Website Assessment</h3>
                            </div>
                            <p class="body-text">
                                Get a comprehensive analysis of your website's AI readiness and optimization opportunities.
                            </p>
                        </div>
                        <div class="card-content">
                            <a href="/assessment" class="btn btn-primary" style="width: 100%;">
                                Start Assessment
                                <?php echo verbost_get_svg_icon('arrow-right'); ?>
                            </a>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <div class="flex items-center mb-4">
                                <?php echo verbost_get_svg_icon('calendar'); ?>
                                <h3 class="card-title" style="margin-left: 0.75rem;">Schedule Consultation</h3>
                            </div>
                            <p class="body-text">
                                Book a 30-minute strategy call with our experts to discuss your specific needs and goals.
                            </p>
                        </div>
                        <div class="card-content">
                            <a href="#" class="btn btn-primary" style="width: 100%;">
                                Book Call
                                <?php echo verbost_get_svg_icon('arrow-right'); ?>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>