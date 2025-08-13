const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');
const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};
// slides.forEach(setSlidePosition); // This is often not needed with flexbox

let currentIndex = 0;

// Move to the target slide
const moveToSlide = (track, targetIndex) => {
  track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
  currentIndex = targetIndex;
}

// When I click right, move slides to the right
nextButton.addEventListener('click', e => {
  let nextIndex = currentIndex + 1;
  if (nextIndex >= slides.length) {
    nextIndex = 0; // Loop back to the start
  }
  moveToSlide(track, nextIndex);
});

// When I click left, move slides to the left
prevButton.addEventListener('click', e => {
  let prevIndex = currentIndex - 1;
  if (prevIndex < 0) {
    prevIndex = slides.length - 1; // Loop to the end
  }
  moveToSlide(track, prevIndex);
});
