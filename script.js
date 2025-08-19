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

// Initialize map (placeholder function)
function initializeMap() {
    // Map initialization code would go here
    console.log('Map initialized');
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