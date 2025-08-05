
        document.addEventListener('DOMContentLoaded', () => {
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Mobile menu toggle logic
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Close mobile menu when a link is clicked
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });

            // Form submission logic
            const contactForm = document.getElementById('contact-form');
            const formMessage = document.getElementById('form-message');

            contactForm.addEventListener('submit', async function(e) { // Added 'async' keyword
                e.preventDefault();

                // Get form data
                const formData = new FormData(contactForm);

                try {
                    // Send the form data to Formspree
                    const response = await fetch(contactForm.action, {
                        method: contactForm.method,
                        body: formData,
                        headers: {
                            'Accept': 'application/json' // Important for Formspree to return JSON
                        }
                    });

                    if (response.ok) { // Check if the response was successful (status 200-299)
                        formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-700');
                        formMessage.classList.add('bg-green-100', 'text-green-700');
                        formMessage.innerHTML = 'Thank you for your message! We will get back to you soon.';
                        contactForm.reset();
                    } else {
                        // Handle errors from Formspree or other server issues
                        const data = await response.json();
                        if (data.errors) {
                            formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                            formMessage.classList.add('bg-red-100', 'text-red-700');
                            formMessage.innerHTML = 'Oops! There was an error sending your message: ' + data.errors.map(err => err.message).join(', ');
                        } else {
                            formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                            formMessage.classList.add('bg-red-100', 'text-red-700');
                            formMessage.innerHTML = 'Oops! Something went wrong. Please try again later.';
                        }
                    }
                } catch (error) {
                    console.error('Error during form submission:', error);
                    formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                    formMessage.classList.add('bg-red-100', 'text-red-700');
                    formMessage.innerHTML = 'Oops! Network error. Please check your internet connection and try again.';
                }
            });
        });