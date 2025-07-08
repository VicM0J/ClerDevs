document.addEventListener('DOMContentLoaded', function() {
  // Cursor personalizado mejorado
  const cursor = document.querySelector('.cursor');
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    if (cursor) {
      cursor.style.left = cursorX - 10 + 'px';
      cursor.style.top = cursorY - 10 + 'px';
    }

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Efectos hover para elementos interactivos
  const interactiveElements = document.querySelectorAll('a, button, .card');

  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      if (cursor) {
        cursor.style.transform = 'scale(2)';
        cursor.style.backgroundColor = 'rgba(255, 107, 107, 0.3)';
      }
    });

    element.addEventListener('mouseleave', () => {
      if (cursor) {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = '';
      }
    });
  });

  // Menú móvil
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.className = 'fas fa-bars';
      });
    });
  }

  // Scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer para animaciones
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');

        // Añadir stagger effect a las tarjetas
        if (entry.target.classList.contains('card')) {
          const cards = entry.target.parentElement.querySelectorAll('.card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 150);
          });
        }
      }
    });
  }, observerOptions);

  // Observar elementos para animaciones
  document.querySelectorAll('section, .card, .section-header, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });

  // Efectos avanzados para tarjetas
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    // Efecto de inclinación 3D
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });

    // Efecto de brillo siguiendo el mouse
    const glowEffect = document.createElement('div');
    glowEffect.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 107, 107, 0.1) 0%, transparent 50%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      border-radius: var(--border-radius);
    `;

    card.style.position = 'relative';
    card.appendChild(glowEffect);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      glowEffect.style.setProperty('--mouse-x', `${x}%`);
      glowEffect.style.setProperty('--mouse-y', `${y}%`);
      glowEffect.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      glowEffect.style.opacity = '0';
    });
  });

  // Parallax suave para hero
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent) {
      const speed = scrolled * 0.5;
      heroContent.style.transform = `translateY(${speed}px)`;
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);

  // Efectos de navbar al hacer scroll
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(20px)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';

      // Cambiar colores de texto en navbar cuando tiene fondo
      const navLinks = navbar.querySelectorAll('.nav-links a, .logo');
      navLinks.forEach(link => {
        link.style.color = 'var(--dark)';
        link.style.textShadow = 'none';
      });
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.15)';
      navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
      navbar.style.boxShadow = 'none';

      // Restaurar colores originales
      const navLinks = navbar.querySelectorAll('.nav-links a, .logo');
      navLinks.forEach(link => {
        link.style.color = 'var(--light)';
        link.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.3)';
      });
    }

    lastScrollTop = scrollTop;
  });

  // Animación de escritura para el título del hero
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    setTimeout(typeWriter, 1000);
  }

  // Efecto de ondas al hacer clic
  document.addEventListener('click', (e) => {
    // Solo en elementos interactivos
    if (e.target.closest('a, button, .card')) {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: rgba(255, 107, 107, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        animation: rippleExpand 0.6s ease-out forwards;
        left: ${e.clientX - 3}px;
        top: ${e.clientY - 3}px;
      `;

      // Crear animación de expansión
      const style = document.createElement('style');
      style.textContent = `
        @keyframes rippleExpand {
          to {
            transform: scale(50);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);

      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
        style.remove();
      }, 600);
    }
  });

  // Animación de entrada para elementos del formulario
  const formInputs = document.querySelectorAll('.form-control');
  formInputs.forEach((input, index) => {
    input.style.opacity = '0';
    input.style.transform = 'translateY(20px)';

    setTimeout(() => {
      input.style.transition = 'all 0.5s ease';
      input.style.opacity = '1';
      input.style.transform = 'translateY(0)';
    }, 200 * index);
  });

  console.log('🚀 ClerDevs - Nuevo diseño cargado exitosamente!');
});