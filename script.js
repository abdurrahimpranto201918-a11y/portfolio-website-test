/* ============================================
   PORTFOLIO — MAIN JAVASCRIPT
   Premium Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ============ LOADER ============
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
            initParticles();
        }, 2500);
    });

    // Fallback: remove loader after 4 seconds max
    setTimeout(() => {
        if (!loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
            initParticles();
        }
    }, 4000);

    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';

    // ============ AOS INIT ============
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            disable: window.innerWidth < 768 ? 'phone' : false
        });
    }

    // ============ THEME TOGGLE ============
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // ============ NAVBAR ============
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');

    // Scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                // Navbar shrink
                navbar.classList.toggle('scrolled', scrollY > 50);
                
                // Scroll progress
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (scrollY / docHeight) * 100;
                scrollProgress.style.width = progress + '%';
                
                // Back to top
                backToTop.classList.toggle('visible', scrollY > 400);
                
                // Active nav link
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    if (scrollY >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
                
                // Animate skill bars on scroll
                animateSkillBars();
                
                // Animate stat counters
                animateCounters();
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Back to top
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============ TYPING ANIMATION ============
    const typingText = document.getElementById('typingText');
    const phrases = [
        'Frontend Developer',
        'React Developer',
        'MERN Stack Learner',
        'UI Enthusiast',
        'Creative Problem Solver',
        'Open to Freelance'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // Pause before next word
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start typing after loader
    setTimeout(typeWriter, 2800);

    // ============ CURSOR GLOW ============
    const cursorGlow = document.getElementById('cursorGlow');
    
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            });
        });
    }

    // ============ PARTICLES ============
    function initParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;
        
        const particleCount = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 6) + 's';
            
            const size = 2 + Math.random() * 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            const colors = ['#06B6D4', '#7C3AED', '#EC4899', '#22D3EE', '#A78BFA'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            container.appendChild(particle);
        }
    }

    // ============ SKILL BARS ANIMATION ============
    let skillBarsAnimated = false;
    
    function animateSkillBars() {
        if (skillBarsAnimated) return;
        
        const skillSection = document.getElementById('skills');
        if (!skillSection) return;
        
        const rect = skillSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            const items = document.querySelectorAll('.skill-bar-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animated');
                }, index * 150);
            });
            skillBarsAnimated = true;
        }
    }

    // ============ STAT COUNTER ANIMATION ============
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const start = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);
                    
                    counter.textContent = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                
                requestAnimationFrame(updateCounter);
            });
            countersAnimated = true;
        }
    }

    // ============ CONTACT FORM ============
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            btnText.textContent = 'Sending...';
            btnIcon.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;
            
            // Simulate send (replace with EmailJS in production)
            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                formSuccess.style.animation = 'fadeInUp 0.5s ease';
            }, 1500);
        });
    }

    // ============ SMOOTH SCROLL FOR ALL ANCHOR LINKS ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
                const top = target.offsetTop - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ============ PROFILE IMAGE FALLBACK ============
    const heroImage = document.getElementById('heroImage');
    if (heroImage) {
        heroImage.addEventListener('error', () => {
            // Create a gradient placeholder with initials
            const wrapper = heroImage.parentElement;
            heroImage.style.display = 'none';
            
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #7C3AED, #06B6D4);
                font-family: 'Space Grotesk', sans-serif;
                font-size: 64px;
                font-weight: 800;
                color: white;
            `;
            placeholder.textContent = 'AP';
            wrapper.appendChild(placeholder);
        });
    }

    // ============ FADE IN UP ANIMATION (CSS HELPER) ============
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // ============ INTERSECTION OBSERVER FOR EXTRA ANIMATIONS ============
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards
    document.querySelectorAll('.experience-card, .cert-card, .about-card, .soft-skill-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // ============ TILT EFFECT ON CARDS ============
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.experience-card, .stat-card, .cert-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ============ PARALLAX ON HERO IMAGE ============
    if (window.matchMedia('(pointer: fine)').matches) {
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            document.addEventListener('mousemove', (e) => {
                const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
                const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
                
                requestAnimationFrame(() => {
                    heroVisual.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            });
        }
    }

    console.log('%c🚀 Pranto Portfolio Loaded!', 'color: #06B6D4; font-size: 16px; font-weight: bold;');
});
