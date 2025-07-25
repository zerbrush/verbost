# Verbost AI WordPress Theme

A modern, responsive WordPress theme designed for AI-driven website optimization agencies.

## Features

- **Responsive Design**: Mobile-first approach with clean, modern aesthetics
- **Custom Post Types**: Services, Team Members, and Testimonials
- **Customizer Integration**: Easy customization through WordPress Customizer
- **SEO Optimized**: Built with SEO best practices
- **Performance Focused**: Lightweight and fast-loading
- **Accessibility Ready**: WCAG 2.1 compliant

## Installation

1. Upload the theme folder to `/wp-content/themes/`
2. Activate the theme through the WordPress admin
3. Customize through Appearance > Customize

## Custom Post Types

### Services
- Title, Description, Features, Pricing, Timeline
- Used on homepage and services page

### Team Members
- Name, Role, Bio, Expertise, Photo
- Used on about page

### Testimonials
- Client Name, Role, Rating, Testimonial
- Used on homepage

## Page Templates

- `page-about.php` - About page template
- `page-contact.php` - Contact page template
- `page-services.php` - Services page template (create as needed)

## Customization

### Colors
The theme uses CSS custom properties for easy color customization:
- `--coral`: #FF4A5C (Primary brand color)
- `--navy`: #003B5C (Text and headings)
- `--light-gray`: #F8F8F8 (Background)
- `--deep-teal`: #006F6A (Secondary actions)
- `--soft-gold`: #FFB800 (Accents)

### Typography
- Primary: Poppins (headings and UI)
- Secondary: Roboto (body text)

### Customizer Options
- Hero section title and subtitle
- Contact information (email, phone)
- Logo upload
- Color scheme customization

## Required Plugins

### Recommended
- **Contact Form 7**: For contact forms
- **Yoast SEO**: For SEO optimization
- **Advanced Custom Fields**: For additional custom fields (optional)

### Optional
- **Elementor**: For advanced page building
- **WooCommerce**: If e-commerce functionality is needed

## Widget Areas

- Sidebar
- Footer 1-4 (Four footer widget areas)

## Menu Locations

- Primary Navigation
- Footer Navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11+ (basic support)

## Performance

- Optimized CSS and JavaScript
- Minimal external dependencies
- Lazy loading ready
- WebP image support

## Development

### File Structure
```
wordpress-theme/
├── style.css (Main stylesheet)
├── functions.php (Theme functions)
├── index.php (Homepage template)
├── header.php (Header template)
├── footer.php (Footer template)
├── page-about.php (About page template)
├── page-contact.php (Contact page template)
├── js/
│   └── main.js (Custom JavaScript)
└── README.md
```

### Hooks and Filters
The theme provides several hooks for customization:
- `verbost_before_header`
- `verbost_after_header`
- `verbost_before_footer`
- `verbost_after_footer`

## Support

For theme support and customization requests, please contact the development team.

## Changelog

### Version 1.0
- Initial release
- Custom post types for Services, Team, Testimonials
- Responsive design
- Customizer integration
- SEO optimization

## License

This theme is licensed under GPL v2 or later.