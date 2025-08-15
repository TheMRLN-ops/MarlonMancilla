
  // =================================================================
  // CAROUSEL FUNCTIONALITY (Fade-in/out image carousel)
  // =================================================================
  
  // Get all carousel images that will fade in and out
  const images = document.querySelectorAll('.carousel-image');
  
  // Get the previous button (left arrow) for manual navigation
  const prevBtn = document.querySelector('.carousel-btn.prev');
  
  // Get the next button (right arrow) for manual navigation
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  // Track which image is currently being displayed (starts at 0)
  let currentIndex = 0;
  
  // Store the interval ID for autoplay functionality
  let autoplayInterval = null;
  
  // Function to show a specific image by index and hide all others
  function showImage(index) {
    // Loop through all images and toggle 'active' class based on current index
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index); // Add 'active' class only to current image
    });
  }
  
  // Function to advance to the next image in sequence
  function nextImage() {
    // Use modulo operator to loop back to 0 when reaching the end
    currentIndex = (currentIndex + 1) % images.length;
    // Display the new current image
    showImage(currentIndex);
  }
  
  // Function to start or restart the automatic slideshow
  function startAutoplay() {
    // Clear any existing interval to prevent multiple timers running
    if (autoplayInterval) clearInterval(autoplayInterval);
    // Set new interval to advance image every 4 seconds (4000ms)
    autoplayInterval = setInterval(nextImage, 4000);
  }
  
  // Only set up carousel if images exist on the page
  if (images.length > 0) {
    // Event listener for next button click
    nextBtn.addEventListener('click', () => {
      nextImage(); // Advance to next image
      startAutoplay(); // Restart autoplay timer after manual interaction
    });
    
    // Event listener for previous button click
    prevBtn.addEventListener('click', () => {
      // Calculate previous index, using modulo to wrap around to end when at beginning
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex); // Display the previous image
      startAutoplay(); // Restart autoplay timer after manual interaction
    });
    
    // Start the automatic slideshow when page loads
    startAutoplay();
  }
  
  // =================================================================
  // SLIDING CAROUSEL FUNCTIONALITY (Alternative implementation)
  // =================================================================
  
  // Get the main carousel container that holds all slides
  const track = document.querySelector('.carousel-track');
  
  // Convert the HTMLCollection of slide elements into an array for easier manipulation
  const slides = Array.from(track.children);
  
  // Get the next button element (right arrow) for sliding carousel
  const nextButton = document.querySelector('.carousel-button.next');
  
  // Get the previous button element (left arrow) for sliding carousel
  const prevButton = document.querySelector('.carousel-button.prev');
  
  // Calculate the width of a single slide by getting its bounding rectangle width
  const slideWidth = slides[0]?.getBoundingClientRect().width || 0;
  
  // Function to position each slide horizontally based on its index
  // This arranges slides side by side, each offset by slideWidth * index pixels
  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  
  // Apply positioning to all slides (commented out as it's often not needed with flexbox)
  // slides.forEach(setSlidePosition); // This is often not needed with flexbox
  
  // Track the currently visible slide for sliding carousel (starts at 0 for first slide)
  let currentSlideIndex = 0;
  
  // Function to move the carousel to show a specific slide
  // Uses CSS transform translateX to slide the track horizontally
  const moveToSlide = (track, targetIndex) => {
    // Move the entire track left by (slideWidth * targetIndex) pixels
    track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
    // Update the current index to keep track of which slide is showing
    currentSlideIndex = targetIndex;
  }
  
  // Only set up sliding carousel if track and buttons exist
  if (track && nextButton && prevButton && slides.length > 0) {
    // Event listener for next button (right arrow) click
    nextButton.addEventListener('click', e => {
      // Calculate the index of the next slide
      let nextIndex = currentSlideIndex + 1;
      
      // If we're at the last slide, loop back to the first slide (index 0)
      if (nextIndex >= slides.length) {
        nextIndex = 0; // Loop back to the start
      }
      
      // Move the carousel to show the next slide
      moveToSlide(track, nextIndex);
    });
    
    // Event listener for previous button (left arrow) click
    prevButton.addEventListener('click', e => {
      // Calculate the index of the previous slide
      let prevIndex = currentSlideIndex - 1;
      
      // If we're at the first slide, loop to the last slide
      if (prevIndex < 0) {
        prevIndex = slides.length - 1; // Loop to the end
      }
      
      // Move the carousel to show the previous slide
      moveToSlide(track, prevIndex);
    });
  }
  
  // =================================================================
  // PROJECT CARD EXPANSION FUNCTIONALITY
  // =================================================================
  
  // Add click event listeners to all project cards for expand/collapse functionality
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't expand card if user clicked on a link inside the card
      if (e.target.closest('a')) return;
      
      // Check if this card is currently expanded
      const isActive = this.classList.contains('active');
      
      // Close all other expanded cards before opening this one (accordion behavior)
      document.querySelectorAll('.project-card.active').forEach(otherCard => {
        if (otherCard !== this) {
           otherCard.classList.remove('active'); // Close other cards
        }
      });
      
      // Toggle the active state of the clicked card (expand/collapse)
      this.classList.toggle('active');
    });
  });
  
  // =================================================================
  // DARK MODE TOGGLE FUNCTIONALITY
  // =================================================================
  
  // Get the dark mode toggle button
  const toggleDarkBtn = document.getElementById("toggleDark");
  
  // Get reference to the html element for adding/removing dark class
  const html = document.documentElement;
  
  // Check for previously saved theme preference in browser's local storage
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark'); // Apply dark theme if it was saved
  }
  
  // Function to update the button text based on current theme
  function updateButtonText() {
    if (html.classList.contains('dark')) {
      toggleDarkBtn.innerHTML = "☀️ Light Mode"; // Show light mode option when in dark mode
    } else {
      toggleDarkBtn.innerHTML = "🌙 Dark Mode"; // Show dark mode option when in light mode
    }
  }
  
  // Set initial button text based on current theme
  updateButtonText();
  
  // Event listener for dark mode toggle button
  toggleDarkBtn.addEventListener("click", () => {
    // Toggle the 'dark' class on html element
    html.classList.toggle("dark");
    
    // Save the current theme preference to local storage
    if (html.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark'); // Save dark theme preference
    } else {
      localStorage.setItem('theme', 'light'); // Save light theme preference
    }
    
    // Update button text to reflect new theme
    updateButtonText();
  });
  
  // =================================================================
  // PAGE LOAD FUNCTIONALITY
  // =================================================================
  
  // Scroll to top of page when it loads (ensures consistent starting position)
  window.addEventListener('load', () => window.scrollTo(0, 0));
  
  // =================================================================
  // PROJECT IMAGE TOGGLE FUNCTIONALITY
  // =================================================================
  
  // Function to show/hide project images within a project card
  function toggleImage(card) {
    // Find the project image container within the specified card
    const imgDiv = card.querySelector(".project-image");
    
    // Toggle visibility by switching between 'block' and 'none' display values
    imgDiv.style.display = imgDiv.style.display === "block" ? "none" : "block";
  }
  
