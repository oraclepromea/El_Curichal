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

// Enhanced Language Toggle Functionality - COMPLETELY REWRITTEN for bidirectional translation
let currentLanguage = 'en';

document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    // Initialize translation system
    initializeTranslationSystem();
    
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

// Store original text content for bidirectional translation
let originalTexts = new Map();

function initializeTranslationSystem() {
    // Store all original texts for elements that need translation
    document.querySelectorAll('h1, h2, h3, h4, p, span, li, a').forEach(element => {
        // Skip elements that already have data attributes
        if (element.hasAttribute('data-en') || element.hasAttribute('data-es')) return;
        
        // Skip elements with no text or only whitespace
        const text = element.textContent.trim();
        if (!text) return;
        
        // Skip specific elements (phone numbers, prices, etc.)
        if (element.closest('.whatsapp-book, .social-links') || 
            text.match(/^[+\d\s\-()\.]+$/) ||
            text.match(/^[\d.,\s°²³ft²m²]+$/) ||
            text.match(/^Bs\.\s*\d+$/) ||
            text.match(/^[\d\s\/]+$/)) {
            return;
        }
        
        // Skip if element has child elements with significant content
        if (element.children.length > 0) {
            const hasSignificantChildren = Array.from(element.children).some(child => 
                child.textContent.trim().length > 5 && 
                !child.classList.contains('flag') && 
                child.tagName !== 'I'
            );
            if (hasSignificantChildren) return;
        }
        
        // Store original text with unique identifier
        const elementId = getElementId(element);
        originalTexts.set(elementId, {
            element: element,
            originalText: text,
            currentLang: 'en' // assuming original is English
        });
    });
    
    console.log(`Initialized translation system with ${originalTexts.size} translatable elements`);
}

function getElementId(element) {
    // Create a unique identifier for each element
    if (element.id) return element.id;
    
    // Use combination of tag, class, and position
    const tag = element.tagName.toLowerCase();
    const classes = element.className ? `.${element.className.split(' ').join('.')}` : '';
    const parent = element.parentElement ? element.parentElement.tagName.toLowerCase() : '';
    const index = Array.from(element.parentElement?.children || []).indexOf(element);
    
    return `${parent}-${tag}${classes}-${index}`;
}

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
    
    // Handle elements with data attributes first (most reliable method)
    document.querySelectorAll('[data-en], [data-es]').forEach(element => {
        const englishText = element.getAttribute('data-en');
        const spanishText = element.getAttribute('data-es');
        
        if (lang === 'es' && spanishText) {
            element.textContent = spanishText;
        } else if (lang === 'en' && englishText) {
            element.textContent = englishText;
        }
    });
    
    // Handle remaining content using stored originals and translation dictionary
    translateStoredContent(lang);
    
    // Update current language
    currentLanguage = lang;
    
    console.log(`Language switched to: ${lang}`);
}

function translateStoredContent(lang) {
    // Comprehensive translation dictionary
    const translations = {
        en: {
            // Room names and descriptions
            "Cama Individual en Dormitorio Mixto": "Single Bed in Mixed Dormitory",
            "Dormitorio económico con vistas a la montaña, baño privado, balcón/terraza y aire acondicionado. Perfecto para mochileros.": "Budget-friendly dormitory with mountain views, private bathroom, balcony/terrace, and air conditioning. Perfect for backpackers.",
            "Habitación Individual con Baño Privado": "Single Room With Private Bathroom",
            "Acogedora habitación individual privada con vistas a la montaña, baño privado, balcón y todas las comodidades modernas.": "Cozy private single room with mountain views, private bathroom, balcony, and all modern amenities.",
            "Habitación Doble Estándar con Baño Compartido": "Standard Twin Room with Shared Bathroom",
            "Cómoda habitación doble con vistas a la montaña, baño compartido, balcón y muebles de exterior. Gran valor para amigos.": "Comfortable twin room with mountain views, shared bathroom, balcony, and outdoor furniture. Great value for friends.",
            "Habitación Doble con Baño Privado": "Double Room with Private Bathroom",
            "Íntima habitación doble con vistas a la montaña, baño privado con bañera, balcón y aire acondicionado. Perfecta para parejas.": "Intimate double room with mountain views, private bathroom with bathtub, balcony, and air conditioning. Perfect for couples.",
            "Habitación Doble Estándar con Ventilador": "Standard Double Room with Fan",
            "Habitación espaciosa con cama individual y doble, vistas a la montaña, baño privado con bañera y espacio exterior.": "Spacious room with single and double bed, mountain views, private bathroom with bathtub, and outdoor space.",
            "Habitación Familiar Estándar": "Standard Family Room",
            "Habitación familiar con vistas a la montaña, 3 camas individuales, baño compartido, balcón y aire acondicionado.": "Family-friendly room with mountain views, 3 single beds, shared bathroom, balcony, and air conditioning.",
            "Habitación Cuádruple Estándar": "Standard Quadruple Room",
            "Habitación grande para grupos con 4 camas individuales, baño privado con bañera y ducha, aire acondicionado, acceso a planta baja.": "Large room for groups with 4 single beds, private bathroom with bathtub and shower, air conditioning, ground floor access.",
            "Habitación Familiar con Baño Privado": "Family Room with Private Bathroom",
            "Perfecta para familias con vistas a la montaña, 2 camas individuales + 1 cama doble, baño privado con bañera, balcón y muebles de exterior.": "Perfect for families with mountain views, 2 single beds + 1 double bed, private bathroom with bathtub, balcony and outdoor furniture.",
            "Espaciosa habitación doble con vistas a la montaña, baño privado con bañera, balcón, muebles de exterior y aire acondicionado.": "Spacious double room with mountain views, private bathroom with bathtub, balcony, outdoor furniture, and air conditioning.",
            
            // Room features
            "1 cama individual": "1 single bed",
            "2 camas individuales": "2 single beds",
            "3 camas individuales": "3 single beds",
            "4 camas individuales": "4 single beds",
            "1 cama doble": "1 double bed",
            "2 individuales + 1 cama doble": "2 single + 1 double bed",
            "1 individual + 1 cama doble": "1 single + 1 double bed",
            "Vista a la montaña": "Mountain view",
            "Baño privado": "Private bathroom",
            "Baño compartido": "Shared bathroom",
            "Aire acondicionado": "Air conditioning",
            "Balcón/terraza": "Balcony/terrace",
            "Bañera": "Bathtub",
            "Bañera y ducha": "Bathtub & shower",
            "Ventilador": "Fan cooling",
            "Reservar por WhatsApp": "Book via WhatsApp",
            
            // Amenities
            "WiFi Gratuito": "Free WiFi",
            "Internet de alta velocidad gratuito en todas las habitaciones y áreas públicas": "Complimentary high-speed internet in all rooms and public areas",
            "Piscina al Aire Libre": "Outdoor Swimming Pool",
            "Refrescante piscina al aire libre con jardín circundante y áreas de hamacas": "Refreshing outdoor pool with surrounding garden and hammock areas",
            "Recepción 24 Horas": "24-Hour Front Desk",
            "Servicio de recepción las 24 horas con personal multilingüe servicial": "Round-the-clock reception service with helpful multilingual staff",
            "Bar y Restaurante": "Bar & Restaurant",
            "Bar en el lugar con bebidas, aperitivos y servicio de desayuno continental": "On-site bar with drinks, snacks, and continental breakfast service",
            "Traslado al Aeropuerto": "Airport Transfer",
            "Conveniente servicio de traslado al aeropuerto - a solo 3km del Aeropuerto de Rurrenabaque": "Convenient airport transfer service - just 3km from Rurrenabaque Airport",
            "Depósito de Equipaje": "Luggage Storage",
            "Almacenamiento seguro gratuito para tus pertenencias durante los tours y después del check-out": "Free secure storage for your belongings during tours and after checkout",
            "Servicios de Masaje": "Massage Services",
            "Tratamientos de masaje relajantes disponibles para relajarse después de tus aventuras": "Relaxing massage treatments available to unwind after your adventures",
            "Servicios de Tours": "Tour Services",
            "Asistencia experta para reservar tours de selva, pampas y aventuras de senderismo": "Expert tour booking assistance for jungle, pampas, and hiking adventures",
            "Karaoke y Entretenimiento": "Karaoke & Entertainment",
            "Noches de karaoke divertidas y entretenimiento para socializar con otros viajeros": "Fun karaoke nights and entertainment for socializing with fellow travelers",
            "Sala de Juegos": "Game Room",
            "Área de recreación con dardos, juegos y opciones de entretenimiento": "Recreation area with darts, games, and entertainment options",
            "Cabalgatas": "Horseback Riding",
            "Organizar excursiones a caballo por el hermoso campo": "Arrange horseback riding excursions through the beautiful countryside",
            "Deportes Acuáticos": "Water Sports",
            "Actividades de deportes acuáticos no motorizados y equipo disponible": "Non-motorized water sports activities and equipment available",
            "Campo de Golf Cercano": "Golf Course Nearby",
            "Campo de golf a 3km para huéspedes que disfrutan de una ronda de golf": "Golf course within 3km for guests who enjoy a round of golf",
            "Salón Compartido y Terraza": "Shared Lounge & Terrace",
            "Áreas comunes con terraza soleada, jardín y asientos cómodos": "Common areas with sun terrace, garden, and comfortable seating",
            "Servicio de Lavandería": "Laundry Service",
            "Instalaciones de lavandería convenientes y servicio de limpieza diario": "Convenient laundry facilities and daily housekeeping service",
            "Familiar": "Family Friendly",
            "Habitaciones familiares disponibles con parque infantil e instalaciones para niños": "Family rooms available with playground and child-friendly facilities",
            
            // Tours
            "Aventuras en la Selva": "Jungle Adventures",
            "Explora la densa selva amazónica, observa vida silvestre exótica y aprende sobre plantas medicinales con guías locales experimentados.": "Explore the dense Amazon rainforest, spot exotic wildlife, and learn about medicinal plants with experienced local guides.",
            "Observación de vida silvestre": "Wildlife spotting",
            "Caminatas de plantas medicinales": "Medicinal plant walks",
            "Expediciones nocturnas": "Night expeditions",
            "Visitas a comunidades indígenas": "Indigenous community visits",
            "Safari en los Pampas": "Pampas Safari",
            "Navega por los humedales de los pampas, encuentra caimanes, delfines rosados e innumerables especies de aves en su hábitat natural.": "Navigate the wetlands of the pampas, encounter caimans, pink dolphins, and countless bird species in their natural habitat.",
            "Observación de delfines rosados": "Pink dolphin watching",
            "Avistamiento de caimanes": "Caiman spotting",
            "Pesca de pirañas": "Piranha fishing",
            "Observación de aves": "Bird watching",
            "Experiencias Culturales": "Cultural Experiences",
            "Sumérgete en la cultura boliviana local, visita comunidades tradicionales y aprende sobre costumbres y tradiciones ancestrales.": "Immerse yourself in local Bolivian culture, visit traditional communities, and learn about ancient customs and traditions.",
            "Visitas a pueblos indígenas": "Indigenous village visits",
            "Talleres de artesanías tradicionales": "Traditional craft workshops",
            "Degustación de cocina local": "Local cuisine tasting",
            "Espectáculos culturales": "Cultural performances",
            
            // Location
            "El Curichal Hostel está estratégicamente ubicado en el corazón de Rurrenabaque, la puerta de entrada tanto a la selva amazónica como a la región de los pampas. Nuestra ubicación ofrece fácil acceso a:": "El Curichal Hostel is strategically located in the heart of Rurrenabaque, the gateway to both the Amazon rainforest and the pampas region. Our location offers easy access to:",
            "Aeropuerto de Rurrenabaque (5 minutos caminando)": "Rurrenabaque Airport (5 minutes walk)",
            "Mercados locales y tiendas (2 minutos caminando)": "Local markets and shops (2 minutes walk)",
            "Restaurantes y cafés (1 minuto caminando)": "Restaurants and cafes (1 minute walk)",
            "Puerto fluvial para tours en bote (3 minutos caminando)": "River port for boat tours (3 minutes walk)",
            "Terminal de autobuses (10 minutos caminando)": "Bus terminal (10 minutes walk)",
            
            // Footer
            "Tu puerta de entrada a la aventura en Rurrenabaque, Bolivia. Experimenta la selva amazónica y los pampas como nunca antes.": "Your gateway to adventure in Rurrenabaque, Bolivia. Experience the Amazon rainforest and pampas like never before.",
            "Enlaces Rápidos": "Quick Links",
            "Servicios": "Services",
            "Tours de Selva": "Jungle Tours",
            "Tours de Pampas": "Pampas Tours",
            "Información de Contacto": "Contact Info",
            "Todos los derechos reservados.": "All rights reserved."
        },
        es: {
            // Room names and descriptions
            "Single Bed in Mixed Dormitory": "Cama Individual en Dormitorio Mixto",
            "Budget-friendly dormitory with mountain views, private bathroom, balcony/terrace, and air conditioning. Perfect for backpackers.": "Dormitorio económico con vistas a la montaña, baño privado, balcón/terraza y aire acondicionado. Perfecto para mochileros.",
            "Single Room With Private Bathroom": "Habitación Individual con Baño Privado",
            "Cozy private single room with mountain views, private bathroom, balcony, and all modern amenities.": "Acogedora habitación individual privada con vistas a la montaña, baño privado, balcón y todas las comodidades modernas.",
            "Standard Twin Room with Shared Bathroom": "Habitación Doble Estándar con Baño Compartido",
            "Comfortable twin room with mountain views, shared bathroom, balcony, and outdoor furniture. Great value for friends.": "Cómoda habitación doble con vistas a la montaña, baño compartido, balcón y muebles de exterior. Gran valor para amigos.",
            "Double Room with Private Bathroom": "Habitación Doble con Baño Privado",
            "Intimate double room with mountain views, private bathroom with bathtub, balcony, and air conditioning. Perfect for couples.": "Íntima habitación doble con vistas a la montaña, baño privado con bañera, balcón y aire acondicionado. Perfecta para parejas.",
            "Standard Double Room with Fan": "Habitación Doble Estándar con Ventilador",
            "Spacious room with single and double bed, mountain views, private bathroom with bathtub, and outdoor space.": "Habitación espaciosa con cama individual y doble, vistas a la montaña, baño privado con bañera y espacio exterior.",
            "Standard Family Room": "Habitación Familiar Estándar",
            "Family-friendly room with mountain views, 3 single beds, shared bathroom, balcony, and air conditioning.": "Habitación familiar con vistas a la montaña, 3 camas individuales, baño compartido, balcón y aire acondicionado.",
            "Standard Quadruple Room": "Habitación Cuádruple Estándar",
            "Large room for groups with 4 single beds, private bathroom with bathtub and shower, air conditioning, ground floor access.": "Habitación grande para grupos con 4 camas individuales, baño privado con bañera y ducha, aire acondicionado, acceso a planta baja.",
            "Family Room with Private Bathroom": "Habitación Familiar con Baño Privado",
            "Perfect for families with mountain views, 2 single beds + 1 double bed, private bathroom with bathtub, balcony and outdoor furniture.": "Perfecta para familias con vistas a la montaña, 2 camas individuales + 1 cama doble, baño privado con bañera, balcón y muebles de exterior.",
            "Spacious double room with mountain views, private bathroom with bathtub, balcony, outdoor furniture, and air conditioning.": "Espaciosa habitación doble con vistas a la montaña, baño privado con bañera, balcón, muebles de exterior y aire acondicionado.",
            
            // Room features
            "1 single bed": "1 cama individual",
            "2 single beds": "2 camas individuales",
            "3 single beds": "3 camas individuales",
            "4 single beds": "4 camas individuales",
            "1 double bed": "1 cama doble",
            "2 single + 1 double bed": "2 individuales + 1 cama doble",
            "1 single + 1 double bed": "1 individual + 1 cama doble",
            "Mountain view": "Vista a la montaña",
            "Private bathroom": "Baño privado",
            "Shared bathroom": "Baño compartido",
            "Air conditioning": "Aire acondicionado",
            "Balcony/terrace": "Balcón/terraza",
            "Bathtub": "Bañera",
            "Bathtub & shower": "Bañera y ducha",
            "Fan cooling": "Ventilador",
            "Book via WhatsApp": "Reservar por WhatsApp",
            
            // Amenities
            "Free WiFi": "WiFi Gratuito",
            "Complimentary high-speed internet in all rooms and public areas": "Internet de alta velocidad gratuito en todas las habitaciones y áreas públicas",
            "Outdoor Swimming Pool": "Piscina al Aire Libre",
            "Refreshing outdoor pool with surrounding garden and hammock areas": "Refrescante piscina al aire libre con jardín circundante y áreas de hamacas",
            "24-Hour Front Desk": "Recepción 24 Horas",
            "Round-the-clock reception service with helpful multilingual staff": "Servicio de recepción las 24 horas con personal multilingüe servicial",
            "Bar & Restaurant": "Bar y Restaurante",
            "On-site bar with drinks, snacks, and continental breakfast service": "Bar en el lugar con bebidas, aperitivos y servicio de desayuno continental",
            "Airport Transfer": "Traslado al Aeropuerto",
            "Convenient airport transfer service - just 3km from Rurrenabaque Airport": "Conveniente servicio de traslado al aeropuerto - a solo 3km del Aeropuerto de Rurrenabaque",
            "Luggage Storage": "Depósito de Equipaje",
            "Free secure storage for your belongings during tours and after checkout": "Almacenamiento seguro gratuito para tus pertenencias durante los tours y después del check-out",
            "Massage Services": "Servicios de Masaje",
            "Relaxing massage treatments available to unwind after your adventures": "Tratamientos de masaje relajantes disponibles para relajarse después de tus aventuras",
            "Tour Services": "Servicios de Tours",
            "Expert tour booking assistance for jungle, pampas, and hiking adventures": "Asistencia experta para reservar tours de selva, pampas y aventuras de senderismo",
            "Karaoke & Entertainment": "Karaoke y Entretenimiento",
            "Fun karaoke nights and entertainment for socializing with fellow travelers": "Noches de karaoke divertidas y entretenimiento para socializar con otros viajeros",
            "Game Room": "Sala de Juegos",
            "Recreation area with darts, games, and entertainment options": "Área de recreación con dardos, juegos y opciones de entretenimiento",
            "Horseback Riding": "Cabalgatas",
            "Arrange horseback riding excursions through the beautiful countryside": "Organizar excursiones a caballo por el hermoso campo",
            "Water Sports": "Deportes Acuáticos",
            "Non-motorized water sports activities and equipment available": "Actividades de deportes acuáticos no motorizados y equipo disponible",
            "Golf Course Nearby": "Campo de Golf Cercano",
            "Golf course within 3km for guests who enjoy a round of golf": "Campo de golf a 3km para huéspedes que disfrutan de una ronda de golf",
            "Shared Lounge & Terrace": "Salón Compartido y Terraza",
            "Common areas with sun terrace, garden, and comfortable seating": "Áreas comunes con terraza soleada, jardín y asientos cómodos",
            "Laundry Service": "Servicio de Lavandería",
            "Convenient laundry facilities and daily housekeeping service": "Instalaciones de lavandería convenientes y servicio de limpieza diario",
            "Family Friendly": "Familiar",
            "Family rooms available with playground and child-friendly facilities": "Habitaciones familiares disponibles con parque infantil e instalaciones para niños",
            
            // Tours
            "Jungle Adventures": "Aventuras en la Selva",
            "Explore the dense Amazon rainforest, spot exotic wildlife, and learn about medicinal plants with experienced local guides.": "Explora la densa selva amazónica, observa vida silvestre exótica y aprende sobre plantas medicinales con guías locales experimentados.",
            "Wildlife spotting": "Observación de vida silvestre",
            "Medicinal plant walks": "Caminatas de plantas medicinales",
            "Night expeditions": "Expediciones nocturnas",
            "Indigenous community visits": "Visitas a comunidades indígenas",
            "Pampas Safari": "Safari en los Pampas",
            "Navigate the wetlands of the pampas, encounter caimans, pink dolphins, and countless bird species in their natural habitat.": "Navega por los humedales de los pampas, encuentra caimanes, delfines rosados e innumerables especies de aves en su hábitat natural.",
            "Pink dolphin watching": "Observación de delfines rosados",
            "Caiman spotting": "Avistamiento de caimanes",
            "Piranha fishing": "Pesca de pirañas",
            "Bird watching": "Observación de aves",
            "Cultural Experiences": "Experiencias Culturales",
            "Immerse yourself in local Bolivian culture, visit traditional communities, and learn about ancient customs and traditions.": "Sumérgete en la cultura boliviana local, visita comunidades tradicionales y aprende sobre costumbres y tradiciones ancestrales.",
            "Indigenous village visits": "Visitas a pueblos indígenas",
            "Traditional craft workshops": "Talleres de artesanías tradicionales",
            "Local cuisine tasting": "Degustación de cocina local",
            "Cultural performances": "Espectáculos culturales",
            
            // Location
            "El Curichal Hostel está estratégicamente ubicado en el corazón de Rurrenabaque, la puerta de entrada tanto a la selva amazónica como a la región de los pampas. Nuestra ubicación ofrece fácil acceso a:": "El Curichal Hostel is strategically located in the heart of Rurrenabaque, the gateway to both the Amazon rainforest and the pampas region. Our location offers easy access to:",
            "Aeropuerto de Rurrenabaque (5 minutos caminando)": "Rurrenabaque Airport (5 minutes walk)",
            "Mercados locales y tiendas (2 minutos caminando)": "Local markets and shops (2 minutes walk)",
            "Restaurantes y cafés (1 minuto caminando)": "Restaurants and cafes (1 minute walk)",
            "Puerto fluvial para tours en bote (3 minutos caminando)": "River port for boat tours (3 minutes walk)",
            "Terminal de autobuses (10 minutos caminando)": "Bus terminal (10 minutes walk)",
            
            // Footer
            "Tu puerta de entrada a la aventura en Rurrenabaque, Bolivia. Experimenta la selva amazónica y los pampas como nunca antes.": "Your gateway to adventure in Rurrenabaque, Bolivia. Experience the Amazon rainforest and pampas like never before.",
            "Enlaces Rápidos": "Quick Links",
            "Servicios": "Services",
            "Tours de Selva": "Jungle Tours",
            "Tours de Pampas": "Pampas Tours",
            "Información de Contacto": "Contact Info",
            "Todos los derechos reservados.": "All rights reserved."
        }
    };
    
    // Apply translations to stored content
    originalTexts.forEach((data, elementId) => {
        const element = data.element;
        const originalText = data.originalText;
        
        // Determine what text to use based on target language
        let targetText = originalText;
        
        if (lang === 'es') {
            // Translating to Spanish
            if (translations.es[originalText]) {
                targetText = translations.es[originalText];
            } else if (data.currentLang === 'es') {
                // Already in Spanish, keep current text
                targetText = element.textContent.trim();
            }
        } else {
            // Translating to English
            if (data.currentLang === 'es' && translations.en[element.textContent.trim()]) {
                targetText = translations.en[element.textContent.trim()];
            } else if (data.currentLang === 'en') {
                // Already in English, use original
                targetText = originalText;
            }
        }
        
        // Update element text and track current language
        if (targetText !== element.textContent.trim()) {
            element.textContent = targetText;
            data.currentLang = lang;
        }
    });
}