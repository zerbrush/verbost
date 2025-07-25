</div><!-- #content -->

    <footer id="colophon" class="footer">
        <div class="container">
            <div class="grid grid-cols-4">
                <div>
                    <div class="flex items-center mb-4">
                        <div class="navbar-logo" style="background-color: var(--coral); margin-right: 0.75rem;">
                            <?php echo verbost_get_svg_icon('zap'); ?>
                        </div>
                        <span style="font-size: 1.25rem; font-weight: 700; color: white;">
                            <?php bloginfo('name'); ?>
                        </span>
                    </div>
                    <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 1rem;">
                        The agency built for the AI future. Optimize your website for both traditional search and AI platforms.
                    </p>
                </div>
                
                <div>
                    <?php if (is_active_sidebar('footer-1')) : ?>
                        <?php dynamic_sidebar('footer-1'); ?>
                    <?php else : ?>
                        <h3>Services</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 0.5rem;"><a href="/services">Website Assessment</a></li>
                            <li style="margin-bottom: 0.5rem;"><a href="/services">MCP Server Hosting</a></li>
                            <li style="margin-bottom: 0.5rem;"><a href="/services">Ongoing Monitoring</a></li>
                            <li style="margin-bottom: 0.5rem;"><a href="/services">CX Strategy</a></li>
                        </ul>
                    <?php endif; ?>
                </div>
                
                <div>
                    <?php if (is_active_sidebar('footer-2')) : ?>
                        <?php dynamic_sidebar('footer-2'); ?>
                    <?php else : ?>
                        <h3>Resources</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 0.5rem;"><a href="/blog">Blog</a></li>
                            <li style="margin-bottom: 0.5rem;"><a href="/case-studies">Case Studies</a></li>
                            <li style="margin-bottom: 0.5rem;"><a href="/whitepapers">Whitepapers</a></li>
                            <li style="margin-bottom: 0.5rem;"><a href="/guides">Guides</a></li>
                        </ul>
                    <?php endif; ?>
                </div>
                
                <div>
                    <?php if (is_active_sidebar('footer-3')) : ?>
                        <?php dynamic_sidebar('footer-3'); ?>
                    <?php else : ?>
                        <h3>Company</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 0.5rem;"><a href="/about">About Us</a></li>
                            <li style="margin-bottom: 0.5rem;"><a href="/contact">Contact</a></li>
                            <li style="margin-bottom: 0.5rem;"><a href="/support">Support</a></li>
                            <li style="margin-bottom: 0.5rem;"><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    <?php endif; ?>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
            </div>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>