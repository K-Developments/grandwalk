  document.addEventListener('DOMContentLoaded', function() {
      // Hero Slider
      const slides = document.querySelectorAll('.slide');
      const dots = document.querySelectorAll('.dot');
      const prevArrow = document.querySelector('.prev-arrow');
      const nextArrow = document.querySelector('.next-arrow');
      const scrollIndicator = document.querySelector('.scroll-indicator');
      let currentSlide = 0;
      let slideInterval;
      
      // Initialize the slider
      function initSlider() {
        // Start auto-rotation
        slideInterval = setInterval(nextSlide, 6000);
        
        // Add click events to dots
        dots.forEach(dot => {
          dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
            resetInterval();
          });
        });
        
        // Arrow navigation
        prevArrow.addEventListener('click', prevSlide);
        nextArrow.addEventListener('click', nextSlide);
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
          if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
          } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
          }
        });
        
        // Scroll indicator click
        scrollIndicator.addEventListener('click', function() {
          window.scrollBy({
            top: window.innerHeight - 100,
            behavior: 'smooth'
          });
        });
      }
      
      function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
      }
      
      function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
      }
      
      function goToSlide(index) {
        // Update slides
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentSlide = index;
      }
      
      function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 6000);
      }
      
      // Initialize the slider
      initSlider();
      
      // Mobile Menu Toggle
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const mobileMenu = document.querySelector('.mobile-menu');
      
      mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
      });
      
      // Dropdown Menus for Desktop
      const dropdowns = document.querySelectorAll('.dropdown');
      
      dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        toggle.addEventListener('click', function(e) {
          if (window.innerWidth > 991) {
            e.preventDefault();
            dropdown.classList.toggle('active');
          }
        });
      });
      
      // Close dropdowns when clicking outside
      document.addEventListener('click', function(e) {
        if (window.innerWidth > 991) {
          dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
              dropdown.classList.remove('active');
            }
          });
        }
      });
      
      // Mobile Dropdown Toggles
      const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
      
      mobileDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.mobile-dropdown-toggle');
        
        toggle.addEventListener('click', function() {
          dropdown.classList.toggle('active');
        });
      });
      
      // Header Scroll Effect
      const header = document.querySelector('.header');
      
      window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
      
      // Show footer when scrolling down
      const footer = document.querySelector('.footer');
      
      window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
          footer.classList.remove('hidden');
        } else {
          footer.classList.add('hidden');
        }
      });
    });

      // Header Scroll Effect
      const header = document.querySelector('.header');
      
      window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });