jQuery(document).ready(function($) {
    // Assessment form handler
    $('#assessment-form').on('submit', function(e) {
        e.preventDefault();
        
        var url = $(this).find('input[name="url"]').val();
        var email = $(this).find('input[name="email"]').val();
        
        if (!url || !email) {
            alert('Please fill in all required fields.');
            return;
        }
        
        $.ajax({
            url: verbost_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'submit_assessment',
                url: url,
                email: email,
                nonce: verbost_ajax.nonce
            },
            beforeSend: function() {
                $('#assessment-form button').prop('disabled', true).text('Processing...');
            },
            success: function(response) {
                if (response.success) {
                    alert('Assessment request submitted successfully!');
                    $('#assessment-form')[0].reset();
                } else {
                    alert('Error: ' + response.data);
                }
            },
            error: function() {
                alert('An error occurred. Please try again.');
            },
            complete: function() {
                $('#assessment-form button').prop('disabled', false).text('Analyze');
            }
        });
    });
    
    // Contact form handler (fallback)
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        var formData = {
            name: $(this).find('input[name="name"]').val(),
            email: $(this).find('input[name="email"]').val(),
            subject: $(this).find('input[name="subject"]').val(),
            message: $(this).find('textarea[name="message"]').val()
        };
        
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Here you would typically send the form data to your server
        alert('Thank you for your message! We will get back to you soon.');
        $(this)[0].reset();
    });
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });
    
    // Mobile menu toggle (if needed)
    $('.mobile-menu-toggle').on('click', function() {
        $('.navbar-nav').toggleClass('active');
    });
    
    // Show fallback contact form if Contact Form 7 is not available
    if ($('.wpcf7').length === 0) {
        $('#contact-form').show();
    }
});

// Intersection Observer for animations
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe cards and sections
    document.querySelectorAll('.card, .section').forEach(el => {
        observer.observe(el);
    });
}