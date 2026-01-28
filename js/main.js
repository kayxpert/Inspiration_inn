/**
 * ============================================
 * INSPIRATION INN - Main JavaScript
 * Vanilla JS for navigation, animations, and forms
 * ============================================
 */

(function () {
  'use strict';

  // ============================================
  // DOM ELEMENTS
  // ============================================
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const accordionItems = document.querySelectorAll('.accordion-item');
  const fadeElements = document.querySelectorAll('.fade-in');

  // ============================================
  // MOBILE NAVIGATION
  // ============================================
  function initMobileNav() {
    if (!navToggle || !nav) return;

    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close nav on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        navToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // STICKY HEADER
  // ============================================
  function initStickyHeader() {
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = header ? header.offsetHeight : 0;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ============================================
  // ACCORDION
  // ============================================
  function initAccordion() {
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        accordionItems.forEach(i => i.classList.remove('active'));

        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });

      // Keyboard accessibility
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    });
  }

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  function initScrollAnimations() {
    if (!fadeElements.length) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
  }

  // ============================================
  // FORM VALIDATION
  // ============================================
  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
      form.addEventListener('submit', function (e) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        // Clear previous errors
        form.querySelectorAll('.form-error').forEach(el => el.remove());
        form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            showError(field, 'This field is required');
          } else if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            showError(field, 'Please enter a valid email address');
          } else if (field.type === 'tel' && !isValidPhone(field.value)) {
            isValid = false;
            showError(field, 'Please enter a valid phone number');
          }
        });

        if (!isValid) {
          e.preventDefault();
          // Focus first error
          const firstError = form.querySelector('.error');
          if (firstError) firstError.focus();
        }
      });
    });
  }

  function showError(field, message) {
    field.classList.add('error');
    const error = document.createElement('span');
    error.className = 'form-error';
    error.textContent = message;
    field.parentNode.appendChild(error);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\d\s\-+()]{10,}$/.test(phone);
  }

  // ============================================
  // ACTIVE NAV LINK
  // ============================================
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ============================================
  // JOB DETAILS - Position Auto-Select
  // ============================================
  const jobData = {
    'dsp': {
      title: 'Direct Support Professional (DSP)',
      description: 'Make a meaningful difference in the lives of adults with disabilities by providing compassionate, person-centered care in a supportive group home environment.',
      responsibilities: [
        'Provide direct care and support to residents in daily activities',
        'Assist with personal care, meal preparation, and medication reminders',
        'Support residents in community activities and outings',
        'Document care activities and maintain accurate records',
        'Communicate with team members and families'
      ],
      requirements: [
        'High school diploma or equivalent',
        'Experience in disability support preferred',
        'Valid driver\'s license',
        'Ability to pass background check',
        'CPR/First Aid certification (or willingness to obtain)'
      ],
      schedule: 'Full-time and part-time positions available. Various shifts including days, evenings, weekends, and overnight opportunities.'
    },
    'manager': {
      title: 'Residential Manager',
      description: 'Lead our residential care team in providing exceptional support services while ensuring compliance with regulations and maintaining a safe, nurturing environment.',
      responsibilities: [
        'Oversee daily operations of the residential home',
        'Supervise and mentor support staff',
        'Coordinate individualized care plans for residents',
        'Ensure compliance with state and federal regulations',
        'Maintain communication with families and external agencies'
      ],
      requirements: [
        'Bachelor\'s degree in related field',
        '3+ years experience in residential care',
        'Supervisory experience required',
        'Valid driver\'s license',
        'Strong organizational and leadership skills'
      ],
      schedule: 'Full-time position with on-call responsibilities.'
    },
    'overnight': {
      title: 'Overnight Support Staff',
      description: 'Provide essential overnight supervision and support to residents, ensuring their safety and comfort during nighttime hours.',
      responsibilities: [
        'Provide overnight supervision and support to residents',
        'Respond to resident needs and emergencies',
        'Assist with nighttime personal care as needed',
        'Complete overnight documentation and reports',
        'Ensure safety and security of the residence'
      ],
      requirements: [
        'High school diploma or equivalent',
        'Previous caregiving experience preferred',
        'Ability to stay alert during overnight hours',
        'Ability to pass background check',
        'CPR/First Aid certification (or willingness to obtain)'
      ],
      schedule: 'Part-time overnight shifts available. Various schedules including weekdays and weekends.'
    }
  };

  function initJobDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const position = urlParams.get('position');
    const positionInput = document.getElementById('position');
    const jobTitleEl = document.getElementById('job-title');

    if (!positionInput || !position) return;

    // Set the hidden position field
    positionInput.value = position;

    // Update job details if the data exists
    if (jobData[position] && jobTitleEl) {
      const job = jobData[position];

      // Update title
      jobTitleEl.textContent = job.title;

      // Update page title
      document.title = `${job.title} | Inspiration Inn`;

      // Update description
      const descEl = jobTitleEl.nextElementSibling;
      if (descEl && descEl.classList.contains('text-lead')) {
        descEl.textContent = job.description;
      }

      // Update responsibilities list
      const responsibilitiesHeader = document.querySelector('h3:first-of-type');
      if (responsibilitiesHeader) {
        const responsibilitiesList = responsibilitiesHeader.nextElementSibling;
        if (responsibilitiesList && responsibilitiesList.tagName === 'UL') {
          responsibilitiesList.innerHTML = job.responsibilities.map(r => `<li>${r}</li>`).join('');
        }
      }

      // Update requirements list
      const requirementsHeader = document.querySelectorAll('h3')[1];
      if (requirementsHeader) {
        const requirementsList = requirementsHeader.nextElementSibling;
        if (requirementsList && requirementsList.tagName === 'UL') {
          requirementsList.innerHTML = job.requirements.map(r => `<li>${r}</li>`).join('');
        }
      }

      // Update schedule
      const scheduleHeader = document.querySelectorAll('h3')[2];
      if (scheduleHeader) {
        const scheduleP = scheduleHeader.nextElementSibling;
        if (scheduleP && scheduleP.tagName === 'P') {
          scheduleP.textContent = job.schedule;
        }
      }
    }
  }

  // ============================================
  // INITIALIZE
  // ============================================
  function init() {
    initMobileNav();
    initStickyHeader();
    initSmoothScroll();
    initAccordion();
    initScrollAnimations();
    initFormValidation();
    setActiveNavLink();
    initJobDetails();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
