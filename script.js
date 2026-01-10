function showMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #64ffda;
        color: #0a192f;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-weight: 500;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 300);
    }, 3000);
}

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

const sections = document.querySelectorAll('.section');

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

sections.forEach(section => {
    observer.observe(section);
});

const downloadBtn = document.querySelector('.download-cv');

if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        showMessage('Starting CV download...');
        
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        downloadBtn.disabled = true;
        
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }, 2000);
    });
}

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            e.preventDefault();
            showMessage('Please fill in all fields.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            showMessage('Please enter a valid email address.');
            return;
        }
        
        showMessage(`Sending your message to Lea...`);
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
    });
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

const modal = document.getElementById('imageGalleryModal');
const closeModal = document.querySelector('.close-modal');
const viewProjectBtns = document.querySelectorAll('.view-project-btn');
const galleryContainer = document.getElementById('galleryContainer');

const projectImages = {
    'baby-monitor': [
        'images/prototype1.webp',
        'images/prototype2.webp',
        'images/prototype3.webp',
        'images/prototype5.webp',
        'images/prototype6.webp'
    ],
    'kids-education': [
        'images/kiddielearn.webp',
        'images/main_menu.webp',
        'images/alphabet_writing.webp',
        'images/shapes.webp',
        'images/videos.webp',
        'images/color_games.webp',
        'images/number_games.webp',
        'images/score.webp'
    ]
};

viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        const images = projectImages[projectId];
        
        if (images) {
            galleryContainer.innerHTML = '';
       
            images.forEach((imageUrl, index) => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Project image ${index + 1}`;
                img.className = 'gallery-image';
                img.loading = 'lazy';
                
                img.addEventListener('click', () => {
                    window.open(imageUrl, '_blank');
                });
                
                galleryContainer.appendChild(img);
            });
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

window.addEventListener('load', () => {
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.8) {
            section.classList.add('visible');
        }
    });
    
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

document.addEventListener('DOMContentLoaded', () => {
    const emailDisplay = document.getElementById('email-display');
    if (emailDisplay) {
        const email = 'leagudilla' + '@' + 'gmail.com';
        emailDisplay.textContent = email;
        emailDisplay.addEventListener('click', () => {
            window.location.href = 'mailto:' + email;
        });
        emailDisplay.style.cursor = 'pointer';
        emailDisplay.title = 'Click to send email';
    }
    
    const phoneDisplay = document.getElementById('phone-display');
    if (phoneDisplay) {
        const phone = '09947809598';
        phoneDisplay.textContent = phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
        phoneDisplay.addEventListener('click', () => {
            window.location.href = 'tel:+63' + phone.substring(1);
        });
        phoneDisplay.style.cursor = 'pointer';
        phoneDisplay.title = 'Click to call';
    }
    
    const linkedinLink = document.getElementById('linkedin-link');
    const githubLink = document.getElementById('github-link');
    
    if (linkedinLink) {
        linkedinLink.href = 'https://www.linkedin.com/in/lea-agudilla/';
    }
    
    if (githubLink) {
        githubLink.href = 'https://github.com/leagudilla';
    }
});

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.onerror = null;
        this.src = 'data:image/svg+xml;base64,' + btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                <rect width="400" height="300" fill="#112240"/>
                <text x="200" y="150" text-anchor="middle" fill="#64ffda" font-family="Arial" font-size="16">
                    Image preview
                </text>
            </svg>
        `);
        this.alt = 'Image preview';
    });
});