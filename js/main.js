    document.addEventListener('DOMContentLoaded', function () {
      // GSAP animation for mobile menu button
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const lines = document.querySelectorAll('.line');
      const cross1 = document.querySelector('.cross-line-1');
      const cross2 = document.querySelector('.cross-line-2');

      // Animation timeline
      const tl = gsap.timeline({ paused: true });

      // Hide regular lines and show cross lines
      tl.to([lines[0], lines[2]], {
        duration: 0.2,
        opacity: 0,
        ease: "power2.in"
      })
        .to([cross1, cross2], {
          duration: 0.2,
          opacity: 1,
          scale: 1,
          ease: "power2.out"
        }, "<0.1");

      // Toggle animation


      // Slider functionality
      // Slider functionality
      const slides = document.querySelectorAll('.slide');
      const sliderDots = document.querySelector('.slider-dots');
      const prevArrow = document.querySelector('.prev-arrow');
      const nextArrow = document.querySelector('.next-arrow');
      const scrollIndicator = document.querySelector('.scroll-indicator');
      const selectorItems = document.querySelectorAll('.selector-item');
      let currentSlide = 0;
      let slideInterval;
      let currentCategory = 'images'; // Default category

      // Initialize slider with dots for current category
      function initSlider() {
        // Filter slides by current category
        const categorySlides = Array.from(slides).filter(slide =>
          slide.dataset.category === currentCategory
        );

        // Create dots for current category
        sliderDots.innerHTML = '';
        categorySlides.forEach((slide, index) => {
          const dot = document.createElement('div');
          dot.className = 'dot';
          dot.setAttribute('data-slide', index);
          if (index === 0) dot.classList.add('active');
          sliderDots.appendChild(dot);
        });

        // Show only slides from current category
        slides.forEach(slide => {
          slide.style.display = 'none';
          if (slide.dataset.category === currentCategory) {
            slide.style.display = 'block';
          }
        });

        // Reset to first slide of category
        currentSlide = 0;
        showSlide(currentSlide);

        // Start auto-sliding
        resetInterval();
      }

      function showSlide(index) {
        const categorySlides = Array.from(slides).filter(slide =>
          slide.dataset.category === currentCategory
        );

        // Hide all slides in current category
        categorySlides.forEach(slide => slide.classList.remove('active'));

        // Show selected slide
        if (categorySlides[index]) {
          categorySlides[index].classList.add('active');
        }

        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
      }

      function nextSlide() {
        const categorySlides = Array.from(slides).filter(slide =>
          slide.dataset.category === currentCategory
        );
        currentSlide = (currentSlide + 1) % categorySlides.length;
        showSlide(currentSlide);
      }

      function prevSlide() {
        const categorySlides = Array.from(slides).filter(slide =>
          slide.dataset.category === currentCategory
        );
        currentSlide = (currentSlide - 1 + categorySlides.length) % categorySlides.length;
        showSlide(currentSlide);
      }

      function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 6000);
      }

      // Initialize with default category
      initSlider();

      // Event listeners for dots
      sliderDots.addEventListener('click', function (e) {
        if (e.target.classList.contains('dot')) {
          const slideIndex = parseInt(e.target.getAttribute('data-slide'));
          currentSlide = slideIndex;
          showSlide(currentSlide);
          resetInterval();
        }
      });

      // Event listeners for arrows
      prevArrow.addEventListener('click', function () {
        prevSlide();
        resetInterval();
      });

      nextArrow.addEventListener('click', function () {
        nextSlide();
        resetInterval();
      });

      // Keyboard navigation
      document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
          resetInterval();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          resetInterval();
        }
      });

      // Scroll indicator
      scrollIndicator.addEventListener('click', function () {
        window.scrollBy({
          top: window.innerHeight - 100,
          behavior: 'smooth'
        });
      });

      // Category selector functionality
      selectorItems.forEach(item => {
        item.addEventListener('click', function () {
          // Update active selector
          selectorItems.forEach(i => i.classList.remove('active'));
          this.classList.add('active');

          // Change category
          currentCategory = this.dataset.category;

          // Reinitialize slider with new category
          initSlider();
        });
      });

      // Mobile menu functionality
      const mobileMenu = document.querySelector('.mobile-menu');
      const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
      const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
      const mobileBtnDropdown = document.querySelector('.mobile-btn-dropdown');

      let isMobileView = window.innerWidth <= 991;

      mobileMenuBtn.addEventListener('click', function (e) {
        e.stopPropagation();

        if (isMobileView) {
          mobileMenu.classList.toggle('active');
          mobileMenuOverlay.classList.toggle('active');
          document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

          if (mobileMenu.classList.contains('active')) {
            tl.play();
            mobileMenuBtn.classList.add('active');
          } else {
            tl.reverse();
            mobileMenuBtn.classList.remove('active');
          }
        } else {
          const isVisible = mobileBtnDropdown.style.display === 'block';

          if (isVisible) {
            gsap.to(mobileBtnDropdown, {
              duration: 0.3,
              opacity: 0,
              y: -10,
              onComplete: () => {
                mobileBtnDropdown.style.display = 'none';
              }
            });
            tl.reverse();
            mobileMenuBtn.classList.remove('active');
          } else {
            mobileBtnDropdown.style.display = 'block';
            gsap.fromTo(mobileBtnDropdown,
              { opacity: 0, y: -10 },
              { duration: 0.3, opacity: 1, y: 0 }
            );
            tl.play();
            mobileMenuBtn.classList.add('active');
          }
        }
      });

      document.addEventListener('click', function () {
        if (!isMobileView && mobileBtnDropdown.style.display === 'block') {
          gsap.to(mobileBtnDropdown, {
            duration: 0.3,
            opacity: 0,
            y: -10,
            onComplete: () => {
              mobileBtnDropdown.style.display = 'none';
            }
          });
          tl.reverse();
          mobileMenuBtn.classList.remove('active');
        }
      });

      mobileBtnDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
      });

      function checkScreenSize() {
        const newIsMobileView = window.innerWidth <= 991;

        if (newIsMobileView !== isMobileView) {
          isMobileView = newIsMobileView;

          if (!isMobileView) {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            tl.reverse();
            mobileMenuBtn.classList.remove('active');
          } else {
            mobileBtnDropdown.style.display = 'none';
          }
        }
      }

      window.addEventListener('resize', checkScreenSize);

      mobileMenuOverlay.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        tl.reverse();
        mobileMenuBtn.classList.remove('active');
      });

      // Mobile dropdown animation
      dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
          if (isMobileView) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            const parent = this.parentElement;
            const isActive = parent.classList.contains('active');

            if (isActive) {
              gsap.to(dropdown, { height: 0, duration: 0.3, ease: "power2.in" });
              parent.classList.remove('active');
            } else {
              gsap.set(dropdown, { height: 'auto' });
              const height = dropdown.offsetHeight;
              gsap.fromTo(dropdown,
                { height: 0 },
                { height: height, duration: 0.3, ease: "power2.out" }
              );
              parent.classList.add('active');
            }
          }
        });
      });

      // Close mobile menu on nav-link click
      document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
          if (!this.classList.contains('dropdown-toggle')) {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            tl.reverse();
            mobileMenuBtn.classList.remove('active');
          }
        });
      });



    });

    function toggleAccordion(element) {
      const content = element.nextElementSibling;
      const icon = element.querySelector('i');

      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
      }
    }

    // Show/hide mobile timeline on screen size
    function toggleMobileTimelineDisplay() {
      const mobileTimeline = document.querySelector('.mobile-story-timeline');
      if (window.innerWidth <= 768) {
        mobileTimeline.style.display = 'block';
      } else {
        mobileTimeline.style.display = 'none';
      }
    }

    // Run when the page loads and whenever it's resized
    window.addEventListener('load', toggleMobileTimelineDisplay);
    window.addEventListener('resize', toggleMobileTimelineDisplay);

    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      freeMode: true,
      grabCursor: true,
      resistance: true,
      resistanceRatio: 0.7,
      lazy: {
        loadPrevNext: true,     // preloads previous/next images for smoother UX
        loadOnTransitionStart: true
      },
      preloadImages: false,      // this must be false for lazy loading to work
      watchSlidesVisibility: true, // ensures Swiper knows which slides are in view
    });


    // Initialize Vertical Gallery Slider
const gallerySwiper = new Swiper('.gallery-vertical-slider', {
  direction: 'vertical',
  slidesPerView: 2,
  spaceBetween: 10,
  freeMode:true,
  mousewheel: true,
  speed: 1000,
  loop: false,
  grabCursor:false,
  lazy: {
    loadPrevNext: true,
    loadOnTransitionStart: true
  },
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  
});


   var blogHorizontalSlider = new Swiper('.blog-horizontal-slider', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      centeredSlides: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
     
    });

  
