// =================================================================
// PORTFOLIO WEBSITE FUNCTIONALITY
// =================================================================

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {

  // =================================================================
  // CAROUSEL FUNCTIONALITY (Fade-in/out image carousel)
  // =================================================================
  
  const images = document.querySelectorAll('.carousel-image');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentIndex = 0;
  let autoplayInterval = null;
  
  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }
  
  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextImage, 4000);
  }
  
  // Initialize carousel if images exist
  if (images.length > 0) {
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextImage();
        startAutoplay();
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
        startAutoplay();
      });
    }
    
    startAutoplay();
  }
  
  // =================================================================
  // SLIDING CAROUSEL FUNCTIONALITY (Alternative implementation)
  // =================================================================
  
  const track = document.querySelector('.carousel-track');
  const slides = track ? Array.from(track.children) : [];
  const nextButton = document.querySelector('.carousel-button.next');
  const prevButton = document.querySelector('.carousel-button.prev');
  const slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;
  
  let currentSlideIndex = 0;
  
  const moveToSlide = (track, targetIndex) => {
    track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
    currentSlideIndex = targetIndex;
  };
  
  // Initialize sliding carousel if elements exist
  if (track && nextButton && prevButton && slides.length > 0) {
    nextButton.addEventListener('click', () => {
      const nextIndex = (currentSlideIndex + 1) % slides.length;
      moveToSlide(track, nextIndex);
    });
    
    prevButton.addEventListener('click', () => {
      const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      moveToSlide(track, prevIndex);
    });
  }
  
  // =================================================================
  // PROJECT CARD EXPANSION FUNCTIONALITY
  // =================================================================
  
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't expand if user clicked on a link
      if (e.target.closest('a')) return;
      
      // Close all other expanded cards (accordion behavior)
      document.querySelectorAll('.project-card.active').forEach(otherCard => {
        if (otherCard !== this) {
           otherCard.classList.remove('active');
        }
      });
      
      // Toggle the clicked card
      this.classList.toggle('active');
    });
  });
  
  // =================================================================
  // DARK MODE TOGGLE FUNCTIONALITY
  // =================================================================
  
  const toggleDarkBtn = document.getElementById("toggleDark");
  const html = document.documentElement;
  
  // Check for saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
  }
  
  function updateButtonText() {
    if (toggleDarkBtn) {
      if (html.classList.contains('dark')) {
        toggleDarkBtn.innerHTML = "☀️ Light Mode";
      } else {
        toggleDarkBtn.innerHTML = "🌙 Dark Mode";
      }
    }
  }
  
  // Initialize button text
  updateButtonText();
  
  // Add dark mode toggle functionality
  if (toggleDarkBtn) {
    toggleDarkBtn.addEventListener("click", () => {
      html.classList.toggle("dark");
      
      // Save theme preference
      const theme = html.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      
      updateButtonText();
    });
  }
  
  // =================================================================
  // UTILITY FUNCTIONS
  // =================================================================
  
  // Scroll to top on page load
  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
  });
  
  // Project image toggle function
  function toggleImage(card) {
    const imgDiv = card.querySelector(".project-image");
    if (imgDiv) {
      imgDiv.style.display = imgDiv.style.display === "block" ? "none" : "block";
    }
  }
  
  // Make toggleImage function globally available if needed
  window.toggleImage = toggleImage;
  
  // =================================================================
  // ERROR HANDLING & DEBUGGING
  // =================================================================
  
  // Log initialization status for debugging
  console.log('Portfolio script initialized');
  console.log('Carousel images found:', images.length);
  console.log('Project cards found:', document.querySelectorAll('.project-card').length);
  console.log('Dark mode button found:', !!toggleDarkBtn);
  
});

// =================================================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// =================================================================

document.addEventListener('click', function(e) {
  // Handle smooth scrolling for anchor links
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});
