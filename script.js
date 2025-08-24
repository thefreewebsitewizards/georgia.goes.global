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

// Close lightbox function
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close lightbox when clicking outside video
document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Initialize portfolio video hover functionality
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

// Initialize map with travel locations
function initializeMap() {
    try {
        // Initialize the map
        const map = L.map('map', {
            center: [20, 0], // Center on world view
            zoom: 2,
            zoomControl: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
            keyboard: true,
            dragging: true,
            touchZoom: true
        });

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        // Travel locations data
        const locations = [
            {
                coords: [54.7023545, -3.2765753],
                name: "United Kingdom",
                description: "Home base and content creation hub"
            },
            {
                coords: [56.7861112, -4.1140516],
                name: "Scotland",
                description: "Stunning landscapes and cultural content"
            },
            {
                coords: [13.7563309, 100.5017651],
                name: "Thailand",
                description: "Vibrant street life and cultural experiences"
            },
            {
                coords: [16.0544068, 107.8337663],
                name: "Vietnam",
                description: "Rich culture and breathtaking scenery"
            },
            {
                coords: [35.6828387, 139.7594549],
                name: "Japan",
                description: "Modern culture meets traditional beauty"
            },
            {
                coords: [-8.4095178, 115.188916],
                name: "Bali, Indonesia",
                description: "Tropical paradise and spiritual retreats"
            },
            {
                coords: [12.7503486, 122.7312101],
                name: "Philippines",
                description: "Island adventures and pristine beaches"
            },
            {
                coords: [18.1239696, 103.8160051],
                name: "Laos",
                description: "Serene landscapes and authentic experiences"
            },
            {
                coords: [11.5564372, 104.9282099],
                name: "Cambodia",
                description: "Ancient temples and cultural heritage"
            },
            {
                coords: [4.5693754, 102.2656823],
                name: "Malaysia",
                description: "Diverse culture and urban exploration"
            },
            {
                coords: [7.5554942, 80.7137847],
                name: "Sri Lanka",
                description: "Tea plantations and coastal beauty"
            },
            {
                coords: [38.9597594, 34.9249653],
                name: "Turkey",
                description: "Where Europe meets Asia - rich history"
            },
            {
                coords: [1.357107, 103.8194992],
                name: "Singapore",
                description: "Modern city-state and culinary adventures"
            },
            {
                coords: [38.9953683, 21.9877132],
                name: "Greece",
                description: "Ancient history and Mediterranean charm"
            }
        ];

        // Create custom pink pin icon
        const pinkIcon = L.divIcon({
            className: 'custom-pin',
            html: '<div style="width: 20px; height: 20px; background-color: #e91e63; border: 3px solid white; border-radius: 50%; box-shadow: 0 3px 10px rgba(233, 30, 99, 0.4); position: relative;"><div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 8px; height: 8px; background-color: white; border-radius: 50%;"></div></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        // Add markers for each location
        locations.forEach((location, index) => {
            const marker = L.marker(location.coords, { icon: pinkIcon }).addTo(map);
            
            // Create popup content
            const popupContent = `
                <div class="custom-popup">
                    <div class="popup-title">${location.name}</div>
                    <div class="popup-description">${location.description}</div>
                </div>
            `;
            
            marker.bindPopup(popupContent);
            
            // Add click event to country items in the sidebar
            const countryItems = document.querySelectorAll('.country-item');
            if (countryItems[index]) {
                countryItems[index].addEventListener('click', () => {
                    // Remove active class from all items
                    countryItems.forEach(item => item.classList.remove('active'));
                    // Add active class to clicked item
                    countryItems[index].classList.add('active');
                    // Fly to location and open popup
                    map.flyTo(location.coords, 6, {
                        animate: true,
                        duration: 1.5
                    });
                    marker.openPopup();
                });
            }
        });

        // Make map responsive
        function resizeMap() {
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        }

        // Listen for window resize
        window.addEventListener('resize', resizeMap);
        
        // Initial resize to ensure proper display
        resizeMap();
        
        console.log('Map initialized successfully with', locations.length, 'locations');
        
    } catch (error) {
        console.error('Error initializing map:', error);
        // Fallback: show a message if map fails to load
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f5dc; color: #8b7355; font-size: 18px;">Map loading... Please refresh if it doesn\'t appear.</div>';
        }
    }
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
    
    // Initialize portfolio video hover functionality
    initializePortfolioVideos();
    
    // Setup service buttons
    setupServiceButtons();
});