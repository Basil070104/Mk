document.addEventListener('DOMContentLoaded', function () {
  // Get carousel elements
  const carousel = document.querySelector('.carousel');
  const carouselImages = document.querySelector('.carousel-images');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');

  // Set initial state
  let currentIndex = 0;
  const totalItems = carouselItems.length;

  // Clone first and last items for infinite scrolling
  function setupInfiniteLoop() {
    // Clone the first item and add it to the end
    const firstItemClone = carouselItems[0].cloneNode(true);
    firstItemClone.classList.add('cloned');

    // Clone the last item and add it to the beginning
    const lastItemClone = carouselItems[totalItems - 1].cloneNode(true);
    lastItemClone.classList.add('cloned');

    // Append and prepend clones
    carouselImages.appendChild(firstItemClone);
    carouselImages.insertBefore(lastItemClone, carouselImages.firstChild);

    // Adjust current index to account for the prepended item
    currentIndex = 2 // Start at the first real item (after the clone)
  }

  // Initialize carousel
  function initCarousel() {
    // Set up infinite loop clones
    setupInfiniteLoop();

    // Apply initial offset to center the first image
    const centerOffset = (carousel.offsetWidth - carouselItems[0].offsetWidth) / 2;
    carouselImages.style.paddingLeft = `${centerOffset}px`;

    // Set initial position and active state
    updateCarousel(false);

    // Add event listeners to buttons
    prevButton.addEventListener('click', goToPrev);
    nextButton.addEventListener('click', goToNext);

    // Handle window resize to maintain centering
    window.addEventListener('resize', function () {
      const newCenterOffset = (carousel.offsetWidth - carouselItems[0].offsetWidth) / 2;
      carouselImages.style.paddingLeft = `${newCenterOffset}px`;
      updateCarousel(false);
    });

    // Add transition end event for handling loop resets
    carouselImages.addEventListener('transitionend', handleTransitionEnd);
  }

  // Update carousel position and active states
  function updateCarousel(animate = true) {
    // Get all items including clones
    const allItems = document.querySelectorAll('.carousel-item');

    // Set transition based on whether animation is desired
    carouselImages.style.transition = animate ? 'transform 0.5s ease' : 'none';

    // Calculate the translate value to center the current item
    const itemWidth = 100 / 3; // Based on 33.333% item width
    // Adjust for the extra clone at the beginning
    const translateX = -currentIndex * itemWidth;
    carouselImages.style.transform = `translateX(${translateX}%)`;

    // Update active states for images (accounting for clones)
    allItems.forEach((item, index) => {
      const image = item.querySelector('.carousel-image');
      // Adjust index calculation to account for the clone offset
      if (index === currentIndex) {
        image.classList.add('active');
      } else {
        image.classList.remove('active');
      }
    });
  }

  // Handle the transition end event for infinite looping
  function handleTransitionEnd() {
    // Get all items including clones
    const allItems = document.querySelectorAll('.carousel-item');
    const totalWithClones = allItems.length;

    // If we're at the clone before the first real item
    if (currentIndex === 0) {
      currentIndex = totalWithClones - 2; // Go to the real last item
      updateCarousel(false);
    }
    // If we're at the clone after the last real item
    else if (currentIndex === totalWithClones - 1) {
      currentIndex = 1; // Go to the first real item
      updateCarousel(false);
    }
  }

  // Navigation functions
  function goToPrev() {
    currentIndex--;
    updateCarousel(true);
  }

  function goToNext() {
    currentIndex++;
    updateCarousel(true);
  }

  // Optional: Add swipe functionality for mobile
  function addSwipeGestures() {
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left
        goToNext();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right
        goToPrev();
      }
    }
  }

  // Initialize the carousel
  initCarousel();

  // Add swipe functionality for mobile devices
  addSwipeGestures();
});