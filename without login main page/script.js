// Initialize Hero2 Card Slider with enhanced effects
const cardSwiper = new Swiper('.card-wrapper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    
    // Enhanced Coverflow Effect
    coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
    },
    
    // Autoplay with pause on hover
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    
    // Custom Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"><span class="bullet-inner"></span></span>';
        }, 
    },
    
    // Navigation arrows
    navigation: {   
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // Responsive breakpoints
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 40,
            coverflowEffect: {
                rotate: 15,
                depth: 100,
            }
        }
    }
});

// Add hover pause functionality
const cardContainer = document.querySelector('.card-wrapper');
if (cardContainer) {
    cardContainer.addEventListener('mouseenter', () => {
        cardSwiper.autoplay.stop();
    });
    
    cardContainer.addEventListener('mouseleave', () => {
        cardSwiper.autoplay.start();
    });
}

// Initialize Testimonial Slider
const testimonialSwiper = new Swiper('.testimonial-container', {
    loop: true,
    spaceBetween: 30,
    grabCursor: true,
    
    // Autoplay
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    
    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    
    // Navigation
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // Responsive breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

// Add hover pause functionality
const sliders = [
    { el: '.card-wrapper', swiper: cardSwiper },
    { el: '.testimonial-container', swiper: testimonialSwiper }
];

sliders.forEach(({ el, swiper }) => {
    const container = document.querySelector(el);
    if (container) {
        container.addEventListener('mouseenter', () => swiper.autoplay.stop());
        container.addEventListener('mouseleave', () => swiper.autoplay.start());
    }
});

// Search functionality
const searchContainer = document.querySelector('.search-container');
const searchInput = searchContainer.querySelector('.search-input');
const searchTags = searchContainer.querySelectorAll('.search-tag');
const searchSuggestions = searchContainer.querySelector('.search-suggestions');
const suggestionItems = searchContainer.querySelectorAll('.suggestion-item');

// Show suggestions when input is focused
searchInput.addEventListener('focus', () => {
    searchSuggestions.classList.add('active');
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
        searchSuggestions.classList.remove('active');
    }
});

// Handle tag clicks
searchTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const category = tag.dataset.category;
        searchInput.value = `Category: ${category}`;
        searchInput.focus();
    });
});

// Handle suggestion clicks
suggestionItems.forEach(item => {
    item.addEventListener('click', () => {
        searchInput.value = item.textContent;
        searchInput.focus();
        searchSuggestions.classList.remove('active');
    });
});

// Search input handling with debounce
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase();
        
        // Filter suggestions based on input
        suggestionItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Show/hide suggestions container
        const hasVisibleSuggestions = Array.from(suggestionItems)
            .some(item => item.style.display !== 'none');
        
        if (hasVisibleSuggestions && searchTerm) {
            searchSuggestions.classList.add('active');
        } else {
            searchSuggestions.classList.remove('active');
        }
    }, 300);
});

// Add ripple effect to search button
const searchBtn = searchContainer.querySelector('.search-btn');
searchBtn.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
    
    // Perform search
    handleSearch(searchInput.value);
});

function handleSearch(searchTerm) {
    console.log('Searching for:', searchTerm);
    // Add your search logic here
}

// Button click handlers
document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log('Button clicked:', e.target.textContent);
    });
});

// Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const interval = duration / (target / increment);

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, interval);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCard = entry.target;
            const counter = statCard.querySelector('.counter');
            const target = parseInt(statCard.dataset.target);
            animateCounter(counter, target);
            observer.unobserve(statCard);
        }
    });
}, observerOptions);

// Observe all stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (validateForm(formData)) {
            // Show success message
            showFormMessage('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Here you would typically send the data to your server
            console.log('Form Data:', formData);
        }
    });
}

// Form validation
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name.trim()) {
        showFormMessage('Please enter your name', 'error');
        return false;
    }
    
    if (!emailRegex.test(data.email)) {
        showFormMessage('Please enter a valid email', 'error');
        return false;
    }
    
    if (!data.subject.trim()) {
        showFormMessage('Please enter a subject', 'error');
        return false;
    }
    
    if (!data.message.trim()) {
        showFormMessage('Please enter your message', 'error');
        return false;
    }
    
    return true;
}

// Show form message
function showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    contactForm.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Add floating label effect
document.querySelectorAll('.input-wrapper input, .input-wrapper textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Enhanced floating card animations
document.querySelectorAll('.floating-card').forEach((card, index) => {
    // Add mouse parallax effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        card.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px) scale(1.05)`;
    });
    
    // Reset position on mouse leave
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
    
    // Add random starting delays to animations
    card.style.animationDelay = `${Math.random() * 2}s`;
});

// Optional: Add intersection observer for entrance animation
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.floating-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    cardObserver.observe(card);
});

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll navigation
    const navButtons = document.querySelectorAll('.btn-ghost[data-section]');
    
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = button.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                // Add active state to clicked button
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Smooth scroll to section
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Highlight active section on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.btn-ghost[data-section="${sectionId}"]`)
                    ?.classList.add('active');
            } else {
                document.querySelector(`.btn-ghost[data-section="${sectionId}"]`)
                    ?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
});

