// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category').split(' ');
            if (filter === 'all' || categories.includes(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

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