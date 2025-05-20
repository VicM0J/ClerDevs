
    // Configuración de partículas
    tsParticles.load("particles-js", {
      particles: {
        number: {
          value: 60,
          density: {
            enable: true,
            area: 800
          }
        },
        color: {
          value: "#00fff0"
        },
        links: {
          color: "#00fff0",
          opacity: 0.3,
          distance: 150,
          enable: true
        },
        move: {
          enable: true,
          speed: 1
        },
        size: {
          value: 3
        }
      }
    });

    // Menú móvil
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, .card, .section-header, .contact-form').forEach(el => {
      observer.observe(el);
    });

    // Efecto hover para tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.card-icon i');
        if (icon) {
          icon.style.transform = 'scale(1.2)';
          icon.style.color = '#0084ff';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.card-icon i');
        if (icon) {
          icon.style.transform = 'scale(1)';
          icon.style.color = '#00fff0';
        }
      });
    });

    // ------------------
     // Reemplaza el script de partículas con este
tsParticles.load("particles-js", {
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse"
      }
    }
  },
  particles: {
    color: {
      value: ["#00FFF0", "#0084FF", "#00C9B7"]
    },
    links: {
      color: "#00FFF0",
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1
    },
    move: {
      direction: "none",
      enable: true,
      outModes: "bounce",
      random: true,
      speed: 2,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      value: { min: 1, max: 5 }
    }
  },
  detectRetina: true
});

// Añade este script para efectos avanzados en tarjetas
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const x = e.clientX - card.getBoundingClientRect().left;
    const y = e.clientY - card.getBoundingClientRect().top;
    
    const centerX = card.offsetWidth / 2;
    const centerY = card.offsetHeight / 2;
    
    const angleX = (y - centerY) / 10;
    const angleY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
  
  // Efecto de iluminación al pasar el mouse
  const light = document.createElement('div');
  light.style.position = 'absolute';
  light.style.width = '100%';
  light.style.height = '100%';
  light.style.background = 'radial-gradient(circle at var(--x) var(--y), rgba(0, 255, 240, 0.1), transparent)';
  light.style.top = '0';
  light.style.left = '0';
  light.style.pointerEvents = 'none';
  light.style.opacity = '0';
  light.style.transition = 'opacity 0.3s';
  card.appendChild(light);
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    light.style.setProperty('--x', `${x}px`);
    light.style.setProperty('--y', `${y}px`);
    light.style.opacity = '1';
  });
  
  card.addEventListener('mouseleave', () => {
    light.style.opacity = '0';
  });
});
