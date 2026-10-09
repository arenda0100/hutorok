// ========================================
// ХУТОРОК - Premium Eco-Hotel JavaScript
// Полностью переработанный под новый дизайн
// ========================================

// ============================= 
// CONFIGURATION
// ============================= 
const CONFIG = {
  TELEGRAM_BOT_TOKEN: '8588992267:AAHTlbpjvS93-9i-nwVpvMHgWMb6IVbiUjQ',
  TELEGRAM_CHAT_ID: '1098084258',
  SCROLL_THRESHOLD: 60,
  ANIMATION_THRESHOLD: 0.1,
  BACK_TO_TOP_THRESHOLD: 500,
  LOADER_DELAY: 1000,
  MODAL_ANIMATION_DELAY: 200
};

// ============================= 
// PRELOADER
// ============================= 
function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Trigger scroll animations after loader
        setTimeout(() => {
          triggerInitialAnimations();
        }, 100);
      }
    }, CONFIG.LOADER_DELAY);
  });
}

function triggerInitialAnimations() {
  const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
  elements.forEach(el => {
    el.classList.add('animated');
  });
}

// ============================= 
// HEADER SCROLL EFFECT
// ============================= 
function initHeaderScroll() {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;

    const scrolled = window.scrollY > CONFIG.SCROLL_THRESHOLD;
    
    if (scrolled) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ============================= 
// MOBILE MENU
// ============================= 
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const body = document.body;
  
  if (!mobileMenuBtn || !mobileNav) return;

  function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
  }

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking on nav links
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      body.style.overflow = 'auto';
    });
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      body.style.overflow = 'auto';
    }
  });

  // Close mobile menu when clicking outside
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      body.style.overflow = 'auto';
    }
  });
}

// ============================= 
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================= 
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileMenuBtn.classList.remove('active');
          mobileNav.classList.remove('active');
          document.body.style.overflow = 'auto';
        }
      }
    });
  });
}

// ============================= 
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================= 
function initScrollAnimations() {
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, {
    threshold: CONFIG.ANIMATION_THRESHOLD,
    rootMargin: '0px 0px -50px 0px'
  });

  // Elements to animate on scroll
  const elementsToAnimate = [
    '.section-head',
    '.about-text',
    '.about-image',
    '.nature-content',
    '.nature-feature',
    '.gallery-grid',
    '.gallery-item',
    '.house-card',
    '.water-card',
    '.room-card',
    '.price-card',
    '.rule',
    '.contact',
    '.cta',
    '.pay-note',
    '.hero-features',
    '.hero-feature'
  ];

  document.addEventListener('DOMContentLoaded', () => {
    elementsToAnimate.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        // Add animation class based on element position
        const isLeft = el.classList.contains('fade-in-left');
        const isRight = el.classList.contains('fade-in-right');
        const isUp = el.classList.contains('fade-in-up');
        
        if (!isLeft && !isRight && !isUp) {
          // Auto-detect animation type based on position
          const rect = el.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          
          // For grid items, use fade-in-up
          if (el.closest('.houses-grid, .gallery-grid, .water-cards, .rooms-grid, .prices, .rules-grid, .contacts, .footer-grid')) {
            el.classList.add('fade-in-up');
          } else if (rect.left < viewportWidth / 2) {
            el.classList.add('fade-in-left');
          } else {
            el.classList.add('fade-in-right');
          }
        }
        
        animateOnScroll.observe(el);
      });
    });
  });
}

// ============================= 
// BACK TO TOP BUTTON
// ============================= 
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > CONFIG.BACK_TO_TOP_THRESHOLD) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================= 
// MODAL WINDOW
// ============================= 
function openModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initModal() {
  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Close modal when clicking on background
  document.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if (modal && e.target.classList.contains('modal-bg')) {
      closeModal();
    }
  });

  // Close modal when clicking close button
  const modalClose = document.querySelector('.modal-close');
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
}

// ============================= 
// TELEGRAM FORM SUBMISSION
// ============================= 
async function sendToTelegram(event) {
  if (event) event.preventDefault();

  const nameEl = document.getElementById('tg-name');
  const phoneEl = document.getElementById('tg-phone');
  const commentEl = document.getElementById('tg-comment');

  if (!nameEl || !phoneEl || !commentEl) return;

  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();
  const comment = commentEl.value.trim();

  const message = `🏡 НОВАЯ ЗАЯВКА С САЙТА «ХУТОРОК»

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment || '—'}

📅 Дата: ${new Date().toLocaleDateString('ru-RU')}
⏰ Время: ${new Date().toLocaleTimeString('ru-RU')}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CONFIG.TELEGRAM_CHAT_ID,
          text: message
        })
      }
    );

    if (response.ok) {
      closeModal();
      nameEl.value = '';
      phoneEl.value = '';
      commentEl.value = '';

      setTimeout(() => {
        alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами.');
      }, CONFIG.MODAL_ANIMATION_DELAY);
    } else {
      alert('Ошибка отправки. Пожалуйста, позвоните нам: +375 29 796-82-48');
    }
  } catch (error) {
    console.error('Telegram API Error:', error);
    alert('Ошибка соединения. Позвоните нам: +375 29 796-82-48');
  }
}

// ============================= 
// WHATSAPP FLOATING BUTTON
// ============================= 
function initWhatsAppFloat() {
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (!whatsappFloat) return;

  // Add hover effect
  whatsappFloat.addEventListener('mouseenter', () => {
    whatsappFloat.style.transform = 'scale(1.1)';
  });

  whatsappFloat.addEventListener('mouseleave', () => {
    whatsappFloat.style.transform = 'scale(1)';
  });
}

// ============================= 
// GALLERY LIGHTBOX
// ============================= 
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        const imgSrc = img.src;
        const imgAlt = img.alt || item.getAttribute('data-caption') || 'Хуторок';
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
          <div class="lightbox-bg" onclick="this.parentNode.remove()"></div>
          <div class="lightbox-content">
            <button class="lightbox-close" onclick="this.parentNode.parentNode.remove()">×</button>
            <img src="${imgSrc}" alt="${imgAlt}">
            <p class="lightbox-caption">${imgAlt}</p>
          </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close on escape
        document.addEventListener('keydown', function closeLightbox(e) {
          if (e.key === 'Escape') {
            lightbox.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', closeLightbox);
          }
        });
      }
    });
  });
}

// ============================= 
// PARALLAX EFFECT FOR NATURE SECTION
// ============================= 
function initParallax() {
  const natureSection = document.querySelector('.nature-section');
  const natureBg = document.querySelector('.nature-bg');
  
  if (!natureSection || !natureBg) return;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const sectionTop = natureSection.offsetTop;
    const sectionHeight = natureSection.offsetHeight;
    
    // Only apply parallax when section is in view
    if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionTop + sectionHeight) {
      const parallaxOffset = (scrollPosition - sectionTop) * 0.3;
      natureBg.style.transform = `translateY(${parallaxOffset}px)`;
    }
  });
}

// ============================= 
// HOVER EFFECTS ENHANCEMENT
// ============================= 
function initHoverEffects() {
  // Add ripple effect to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      
      // Get click position
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      btn.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // House card hover - show more images
  document.querySelectorAll('.house-card').forEach(card => {
    const thumbs = card.querySelector('.house-thumbs');
    if (!thumbs) return;
    
    const showThumbs = () => {
      thumbs.style.maxHeight = '100px';
      thumbs.style.opacity = '1';
    };
    
    const hideThumbs = () => {
      thumbs.style.maxHeight = '0';
      thumbs.style.opacity = '0';
    };
    
    card.addEventListener('mouseenter', showThumbs);
    card.addEventListener('mouseleave', hideThumbs);
    
    // Initialize thumb styles
    thumbs.style.maxHeight = '0';
    thumbs.style.opacity = '0';
    thumbs.style.transition = 'all 0.3s ease';
    thumbs.style.overflow = 'hidden';
  });

  // Water card hover effects
  document.querySelectorAll('.water-card').forEach(card => {
    const thumbs = card.querySelector('.water-thumbs');
    if (!thumbs) return;
    
    const showThumbs = () => {
      thumbs.style.maxHeight = '60px';
      thumbs.style.opacity = '1';
    };
    
    const hideThumbs = () => {
      thumbs.style.maxHeight = '0';
      thumbs.style.opacity = '0';
    };
    
    card.addEventListener('mouseenter', showThumbs);
    card.addEventListener('mouseleave', hideThumbs);
    
    // Initialize thumb styles
    thumbs.style.maxHeight = '0';
    thumbs.style.opacity = '0';
    thumbs.style.transition = 'all 0.3s ease';
    thumbs.style.overflow = 'hidden';
  });

  // Room card hover effects
  document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
      card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}

// ============================= 
// FORM VALIDATION
// ============================= 
function initFormValidation() {
  const form = document.querySelector('form');
  if (!form) return;

  const phoneInput = document.getElementById('tg-phone');
  if (phoneInput) {
    // Auto-format phone number
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      // Belarus phone format: +375 XX XXX XX XX
      if (value.startsWith('375') && value.length > 3) {
        value = `+375 ${value.slice(3, 5)} ${value.slice(5, 8)} ${value.slice(8, 10)} ${value.slice(10)}`;
      } else if (value.length > 0) {
        // If starts with 8 or other
        if (value.startsWith('8') && value.length > 1) {
          value = `+375 ${value.slice(1)}`;
        }
      }
      
      e.target.value = value.substring(0, 18); // Limit length
    });

    // Remove formatting on focus for easier editing
    phoneInput.addEventListener('focus', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Reformat on blur
    phoneInput.addEventListener('blur', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.startsWith('375') && value.length === 11) {
        value = `+375 ${value.slice(1, 3)} ${value.slice(3, 6)} ${value.slice(6, 8)} ${value.slice(8)}`;
      }
      e.target.value = value;
    });
  }
}

// ============================= 
// LAZY LOADING IMAGES
// ============================= 
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.removeAttribute('loading');
          lazyImageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      lazyImageObserver.observe(img);
    });
  }
}

// ============================= 
// SCROLL SPY FOR NAVIGATION
// ============================= 
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// ============================= 
// SMOOTH IMAGE SLIDER FOR HOUSES
// ============================= 
function initHouseImageSlider() {
  document.querySelectorAll('.house-card').forEach(card => {
    const mainImg = card.querySelector('.house-img img');
    const thumbs = card.querySelectorAll('.house-thumbs img');
    
    if (!mainImg || !thumbs.length) return;
    
    const originalSrc = mainImg.src;
    
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        mainImg.style.opacity = '0';
        setTimeout(() => {
          mainImg.src = thumb.src;
          mainImg.style.opacity = '1';
        }, 200);
      });
    });
    
    // Reset to original on card click
    card.addEventListener('click', (e) => {
      if (e.target === mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
          mainImg.src = originalSrc;
          mainImg.style.opacity = '1';
        }, 200);
      }
    });
  });
}

// ============================= 
// INITIALIZE ALL FUNCTIONS
// ============================= 
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  initLoader();
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  
  // Additional features
  initBackToTop();
  initModal();
  initWhatsAppFloat();
  initGalleryLightbox();
  initParallax();
  initHoverEffects();
  initFormValidation();
  initLazyLoading();
  initScrollSpy();
  initHouseImageSlider();
});

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;
window.sendToTelegram = sendToTelegram;
