// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Portfolio filtering with iPhone-style videos
function filterPortfolio(category) {
    const sections = document.querySelectorAll('.portfolio-section');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category || 
            (category === 'all' && btn.getAttribute('data-filter') === 'all')) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide sections based on filter
    sections.forEach(section => {
        const sectionId = section.id;
        if (category === 'all') {
            section.style.display = 'block';
        } else {
            const categoryMap = {
                'beauty-fashion': 'beauty-fashion-section',
                'hotel-airbnb': 'hotel-airbnb-section',
                'places-experiences': 'places-experiences-section',
                'restaurants-cafes': 'restaurants-cafes-section',
                'storytelling-vlogs': 'storytelling-vlogs-section'
            };
            
            if (sectionId === categoryMap[category]) {
                section.style.display = 'block';
                // Scroll to the portfolio section
                const portfolioSection = document.getElementById('portfolio');
                if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                section.style.display = 'none';
            }
        }
    });
}

// Lightbox functionality
function openLightbox(videoPath) {
    const lightbox = document.getElementById('lightbox');
    const videoContainer = document.getElementById('lightbox-video');
    
    if (videoPath === 'placeholder') {
        videoContainer.innerHTML = `
            <div style="padding: 56.25% 0 0 0; position: relative; display: flex; align-items: center; justify-content: center; background: #f5f5dc;">
                <p style="color: #8b7355; font-size: 18px;">Content coming soon</p>
            </div>
        `;
    } else {
        videoContainer.innerHTML = `
            <video controls autoplay style="width: 100%; height: auto; max-height: 80vh;">
                <source src="${videoPath}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const videoContainer = document.getElementById('lightbox-video');
    lightbox.style.display = 'none';
    videoContainer.innerHTML = '';
    document.body.style.overflow = 'auto';
}

// Close lightbox when clicking outside the content
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Create mailto link
    const subject = encodeURIComponent(`New inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:georgia.burr@icloud.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(250, 249, 247, 0.98)';
    } else {
        navbar.style.background = 'rgba(250, 249, 247, 0.95)';
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to sections and observe them
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Remove the dynamic style injection section (lines 132-165)
// The mobile navigation styles are now in the CSS file


// Travel Map Implementation
function initializeMap() {
    // Initialize the map
    const map = L.map('map', {
        center: [20, 0], // Center on world view
        zoom: 2,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true
    });

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        tileSize: 256,
        zoomOffset: 0
    }).addTo(map);

    // Location data with coordinates
    const locations = [
        { name: 'United Kingdom', coords: [54.7023545, -3.2765753], description: 'Home base and content creation hub' },
        { name: 'Scotland', coords: [56.7861112, -4.1140516], description: 'Stunning landscapes and cultural content' },
        { name: 'Thailand', coords: [13.7563309, 100.5017651], description: 'Vibrant street life and cultural experiences' },
        { name: 'Vietnam', coords: [16.0544068, 107.8337663], description: 'Rich culture and breathtaking scenery' },
        { name: 'Japan', coords: [35.6828387, 139.7594549], description: 'Modern culture meets traditional beauty' },
        { name: 'Bali, Indonesia', coords: [-8.4095178, 115.188916], description: 'Tropical paradise and spiritual retreats' },
        { name: 'Philippines', coords: [12.7503486, 122.7312101], description: 'Island adventures and pristine beaches' },
        { name: 'Laos', coords: [18.1239696, 103.8160051], description: 'Serene landscapes and authentic experiences' },
        { name: 'Cambodia', coords: [11.5564372, 104.9282099], description: 'Ancient temples and cultural heritage' },
        { name: 'Malaysia', coords: [4.5693754, 102.2656823], description: 'Diverse culture and urban exploration' },
        { name: 'Sri Lanka', coords: [7.5554942, 80.7137847], description: 'Tea plantations and coastal beauty' },
        { name: 'Turkey', coords: [38.9597594, 34.9249653], description: 'Where Europe meets Asia - rich history' },
        { name: 'Singapore', coords: [1.357107, 103.8194992], description: 'Modern city-state and culinary adventures' },
        { name: 'Greece', coords: [38.9953683, 21.9877132], description: 'Ancient history and Mediterranean charm' }
    ];

    // Custom icon for pins
    const customIcon = L.divIcon({
        className: 'custom-pin',
        html: '<div style="background-color: #e91e63; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(233, 30, 99, 0.6);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    // Store markers for interaction
    const markers = {};

    // Add markers for each location
    locations.forEach((location, index) => {
        const marker = L.marker(location.coords, { icon: customIcon }).addTo(map);
        
        // Create popup content
        const popupContent = `
            <div class="custom-popup">
                <div class="popup-title">${location.name}</div>
                <div class="popup-description">${location.description}</div>
            </div>
        `;
        
        marker.bindPopup(popupContent, {
            maxWidth: 250,
            className: 'custom-popup'
        });
        
        // Store marker reference
        markers[location.name] = marker;
    });

    // Add click interaction for country list items
    document.querySelectorAll('.country-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            document.querySelectorAll('.country-item').forEach(el => el.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get coordinates and zoom to location
            const coords = JSON.parse(this.dataset.coords);
            const countryName = this.querySelector('h4').textContent;
            
            // Pan and zoom to the location
            map.setView(coords, 6, { animate: true, duration: 1 });
            
            // Open popup for the corresponding marker
            if (markers[countryName]) {
                setTimeout(() => {
                    markers[countryName].openPopup();
                }, 500);
            }
        });
    });

    // Fit map to show all markers initially
    const group = new L.featureGroup(locations.map(loc => L.marker(loc.coords)));
    map.fitBounds(group.getBounds().pad(0.1));

    return map;
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if map container exists
    if (document.getElementById('map')) {
        initializeMap();
    }
});

// iPhone-style Portfolio Video Hover Functionality
function initializePortfolioVideos() {
    const videoContainers = document.querySelectorAll('.iphone-video-container');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('.portfolio-video');
        const overlay = container.querySelector('.video-overlay');
        
        if (video && overlay) {
            // Hover to play
            container.addEventListener('mouseenter', () => {
                video.play().catch(e => {
                    console.log('Video play failed:', e);
                });
            });
            
            // Stop on mouse leave
            container.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
            
            // Click to open lightbox
            container.addEventListener('click', () => {
                const videoSrc = video.querySelector('source').src;
                openLightbox(videoSrc);
            });
            
            // Ensure video is muted and ready
            video.muted = true;
            video.preload = 'metadata';
        }
    });
}

// Portfolio filtering with iPhone-style videos
function filterPortfolio(category) {
    const sections = document.querySelectorAll('.portfolio-section');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category || 
            (category === 'all' && btn.getAttribute('data-filter') === 'all')) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide sections based on filter
    sections.forEach(section => {
        const sectionId = section.id;
        if (category === 'all') {
            section.style.display = 'block';
        } else {
            const categoryMap = {
                'beauty-fashion': 'beauty-fashion-section',
                'hotel-airbnb': 'hotel-airbnb-section',
                'places-experiences': 'places-experiences-section',
                'restaurants-cafes': 'restaurants-cafes-section',
                'storytelling-vlogs': 'storytelling-vlogs-section'
            };
            
            if (sectionId === categoryMap[category]) {
                section.style.display = 'block';
                // Scroll to the portfolio section
                document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                section.style.display = 'none';
            }
        }
    });
}

// Update the filter button event listeners to use the same function
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterPortfolio(filter);
    });
});

// Enhanced lightbox for iPhone videos
function openLightbox(videoPath) {
    const lightbox = document.getElementById('lightbox');
    const videoContainer = document.getElementById('lightbox-video');
    
    if (videoPath === 'placeholder') {
        videoContainer.innerHTML = `
            <div style="padding: 56.25% 0 0 0; position: relative; display: flex; align-items: center; justify-content: center; background: #f5f5dc;">
                <p style="color: #8b7355; font-size: 18px;">Content coming soon</p>
            </div>
        `;
    } else {
        videoContainer.innerHTML = `
            <video controls autoplay style="width: 100%; height: auto; max-height: 80vh; border-radius: 10px;">
                <source src="${videoPath}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Service button functionality to link to portfolio sections
function setupServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-btn');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const onclick = button.getAttribute('onclick');
            
            if (onclick) {
                // Extract the category from onclick attribute
                const match = onclick.match(/filterPortfolio\('([^']+)'\)/);
                if (match) {
                    const category = match[1];
                    filterPortfolio(category);
                }
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if map container exists
    if (document.getElementById('map')) {
        initializeMap();
    }
});