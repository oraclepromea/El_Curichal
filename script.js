// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            hideNotification(notification);
        }
    }, 5000);
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.remove();
        }
    }, 300);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.room-card, .amenity, .tour-card, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Image lazy loading fallback
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder if image fails to load
            this.style.background = 'linear-gradient(135deg, #f8f9fa, #e9ecef)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#6c757d';
            this.style.fontSize = '1rem';
            this.style.textAlign = 'center';
            
            // Add placeholder text
            if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('image-placeholder')) {
                const placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                placeholder.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #6c757d;
                    font-size: 1rem;
                    text-align: center;
                `;
                placeholder.innerHTML = '<i class="fas fa-image" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>Image coming soon';
                
                this.parentElement.style.position = 'relative';
                this.parentElement.appendChild(placeholder);
            }
        });
    });
});

// Room price calculator (simple example)
function calculateStayPrice(roomType, nights) {
    const prices = {
        'dorm': 12,
        'private': 25,
        'family': 40
    };
    
    const basePrice = prices[roomType] || 12;
    const total = basePrice * nights;
    
    // Add discount for longer stays
    let discount = 0;
    if (nights >= 7) discount = 0.1; // 10% discount for week+
    if (nights >= 14) discount = 0.15; // 15% discount for 2 weeks+
    
    return {
        basePrice: basePrice,
        nights: nights,
        subtotal: total,
        discount: Math.round(total * discount),
        total: Math.round(total * (1 - discount))
    };
}

// Add WhatsApp floating button
document.addEventListener('DOMContentLoaded', () => {
    const whatsappButton = document.createElement('a');
    whatsappButton.href = 'https://wa.me/59168988729'; // Updated with actual WhatsApp number
    whatsappButton.target = '_blank';
    whatsappButton.className = 'whatsapp-float';
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
    
    whatsappButton.style.cssText = `
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 40px;
        right: 40px;
        background-color: #25d366;
        color: white;
        border-radius: 50px;
        text-align: center;
        font-size: 30px;
        box-shadow: 2px 2px 3px #999;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        text-decoration: none;
    `;
    
    whatsappButton.addEventListener('mouseenter', () => {
        whatsappButton.style.transform = 'scale(1.1)';
        whatsappButton.style.boxShadow = '2px 2px 10px #999';
    });
    
    whatsappButton.addEventListener('mouseleave', () => {
        whatsappButton.style.transform = 'scale(1)';
        whatsappButton.style.boxShadow = '2px 2px 3px #999';
    });
    
    document.body.appendChild(whatsappButton);
});

// Simple visitor counter (localStorage based)
document.addEventListener('DOMContentLoaded', () => {
    let visits = localStorage.getItem('hostelVisits') || 0;
    visits++;
    localStorage.setItem('hostelVisits', visits);
    
    // You could display this somewhere if needed
    console.log(`Page visits: ${visits}`);
});

// Language Translation System - Enhanced Version
const translations = {
    en: {
        // Navigation
        "Inicio": "Home",
        "Habitaciones": "Rooms", 
        "Servicios": "Amenities",
        "Tours": "Tours",
        "Ubicación": "Location",
        "Contacto": "Contact",
        
        // Hero Section
        "Bienvenidos a El Curichal Hostel": "Welcome to El Curichal Hostel",
        "Tu puerta de entrada a las aventuras de la selva amazónica y los pampas en Rurrenabaque, Bolivia": "Your gateway to the Amazon rainforest and pampas adventures in Rurrenabaque, Bolivia",
        "Reservar Ahora": "Book Now",
        "Explorar Tours": "Explore Tours",
        
        // About Section
        "Acerca de El Curichal Hostel": "About El Curichal Hostel",
        "Calificación Excelente": "Excellent Rating",
        "Reseñas": "Reviews",
        "Recepción": "Reception",
        
        // Rooms Section
        "Nuestras Habitaciones": "Our Rooms",
        "Elige entre 9 tipos diferentes de habitaciones para adaptarse a tu estilo de viaje y presupuesto": "Choose from 9 different room types to suit your travel style and budget",
        "por noche": "per night",
        "Reservar por WhatsApp": "Book via WhatsApp",
        
        // Amenities Section
        "Comodidades y Servicios": "Amenities & Facilities",
        "Todo lo que necesitas para una estancia cómoda en Rurrenabaque": "Everything you need for a comfortable stay in Rurrenabaque",
        "Servicios Adicionales": "Additional Services",
        "Idiomas que Hablamos": "Languages Spoken",
        "Seguridad": "Safety",
        "Conveniencia": "Convenience",
        
        // Tours Section
        "Aventuras Te Esperan": "Adventures Await",
        "Descubre las maravillas de la selva amazónica y los pampas bolivianos": "Discover the wonders of the Amazon rainforest and Bolivian pampas",
        
        // Location Section
        "Ubicación Privilegiada": "Prime Location",
        
        // Contact Section
        "Contáctanos": "Contact Us",
        "Ponte en Contacto": "Get in Touch",
        "Dirección": "Address",
        "Teléfono": "Phone",
        "Horarios de Recepción": "Reception Hours",
        "Disponible 24/7": "24/7 Available",
        "Síguenos": "Follow Us"
    },
    es: {
        // Navigation
        "Home": "Inicio",
        "Rooms": "Habitaciones",
        "Amenities": "Servicios", 
        "Tours": "Tours",
        "Location": "Ubicación",
        "Contact": "Contacto",
        
        // Hero Section
        "Welcome to El Curichal Hostel": "Bienvenidos a El Curichal Hostel",
        "Your gateway to the Amazon rainforest and pampas adventures in Rurrenabaque, Bolivia": "Tu puerta de entrada a las aventuras de la selva amazónica y los pampas en Rurrenabaque, Bolivia",
        "Book Now": "Reservar Ahora",
        "Explore Tours": "Explorar Tours",
        
        // About Section
        "About El Curichal Hostel": "Acerca de El Curichal Hostel",
        "Excellent Rating": "Calificación Excelente",
        "Reviews": "Reseñas",
        "Reception": "Recepción",
        
        // Rooms Section
        "Our Rooms": "Nuestras Habitaciones",
        "Choose from 9 different room types to suit your travel style and budget": "Elige entre 9 tipos diferentes de habitaciones para adaptarse a tu estilo de viaje y presupuesto",
        "per night": "por noche",
        "Book via WhatsApp": "Reservar por WhatsApp",
        
        // Amenities Section
        "Amenities & Facilities": "Comodidades y Servicios",
        "Everything you need for a comfortable stay in Rurrenabaque": "Todo lo que necesitas para una estancia cómoda en Rurrenabaque",
        "Additional Services": "Servicios Adicionales",
        "Languages Spoken": "Idiomas que Hablamos",
        "Safety": "Seguridad",
        "Convenience": "Conveniencia",
        
        // Tours Section
        "Adventures Await": "Aventuras Te Esperan",
        "Discover the wonders of the Amazon rainforest and Bolivian pampas": "Descubre las maravillas de la selva amazónica y los pampas bolivianos",
        
        // Location Section
        "Prime Location": "Ubicación Privilegiada", 
        "Rurrenabaque, Bolivia": "Rurrenabaque, Bolivia",
        
        // Contact Section
        "Contact Us": "Contáctanos",
        "Get in Touch": "Ponte en Contacto",
        "Address": "Dirección",
        "Phone": "Teléfono", 
        "Reception Hours": "Horarios de Recepción",
        "24/7 Available": "Disponible 24/7",
        "Follow Us": "Síguenos"
    }
};

// Enhanced Language Toggle Functionality
let currentLanguage = 'en';

document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    // Set initial language
    setLanguage(currentLanguage);
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');
            if (selectedLang !== currentLanguage) {
                setLanguage(selectedLang);
                localStorage.setItem('selectedLanguage', selectedLang);
                currentLanguage = selectedLang;
            }
        });
    });
});

function setLanguage(lang) {
    console.log(`Switching to language: ${lang}`);
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // First, translate all elements with data attributes (navigation items)
    document.querySelectorAll('[data-en]').forEach(element => {
        const englishText = element.getAttribute('data-en');
        const spanishText = element.getAttribute('data-es');
        
        if (lang === 'es' && spanishText) {
            element.textContent = spanishText;
        } else if (lang === 'en' && englishText) {
            element.textContent = englishText;
        }
    });
    
    // Then translate all other text elements
    const elementsToTranslate = document.querySelectorAll('h1, h2, h3, h4, p, span, a:not([data-en]), button:not(.lang-btn)');
    
    elementsToTranslate.forEach(element => {
        // Skip if element has children with text (to avoid translating parent when child should be translated)
        if (element.children.length > 0) {
            // Check if all children are just icons/images
            const hasTextChildren = Array.from(element.children).some(child => 
                child.textContent.trim().length > 0 && !child.classList.contains('flag')
            );
            if (hasTextChildren) return;
        }
        
        // Skip elements that are part of WhatsApp links or contain only symbols
        if (element.closest('.whatsapp-book, .social-links') || 
            element.textContent.trim().match(/^[+\d\s\-()\.]+$/) ||
            element.textContent.trim().match(/^[\d.,\s°²³ft²m²]+$/)) {
            return;
        }
        
        const text = element.textContent.trim();
        if (text && translations[lang] && translations[lang][text]) {
            element.textContent = translations[lang][text];
        }
    });
    
    // Update document title
    if (lang === 'es') {
        document.title = 'El Curichal Hostel - Rurrenabaque, Bolivia';
    } else {
        document.title = 'El Curichal Hostel - Rurrenabaque, Bolivia';
    }
    
    console.log(`Language switched to: ${lang}`);
}