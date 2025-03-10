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
  let isAnimating = false;

  // Initialize carousel
  function initCarousel() {
    // Apply initial offset to center the first image
    const itemWidth = carouselItems[0].offsetWidth;
    const carouselWidth = carousel.offsetWidth;
    const centerOffset = (carouselWidth - itemWidth) / 2;
    // carouselImages.style.paddingLeft = `${centerOffset}px`;

    // Set initial position and active state
    updateCarousel();

    // Add event listeners to buttons
    prevButton.addEventListener('click', goToPrev);
    nextButton.addEventListener('click', goToNext);

    // Handle window resize to maintain centering
    window.addEventListener('resize', function () {
      const newItemWidth = carouselItems[0].offsetWidth;
      const newCarouselWidth = carousel.offsetWidth;
      const newCenterOffset = (newCarouselWidth - newItemWidth) / 2;
      carouselImages.style.paddingLeft = `${newCenterOffset}px`;
      updateCarousel();
    });
  }

  // Update carousel position and active states
  function updateCarousel() {
    // Calculate the translate value based on item width in pixels
    const itemWidth = carouselItems[0].offsetWidth + 25; // Including the gap
    const translateX = -currentIndex * itemWidth;
    carouselImages.style.transform = `translateX(${translateX}px)`;

    // Update active states for images
    carouselItems.forEach((item, index) => {
      const image = item.querySelector('.carousel-image');
      if (index === currentIndex) {
        image.classList.add('active');
      } else {
        image.classList.remove('active');
      }
    });
  }

  // Navigation functions
  function goToPrev() {
    if (isAnimating) return;

    if (currentIndex === 0) {
      // If at the first image, animate to the last image
      animateToIndex(totalItems - 1);
    } else {
      currentIndex--;
      updateCarousel();
    }
  }

  function goToNext() {
    if (isAnimating) return;

    if (currentIndex === totalItems - 1) {
      // If at the last image, animate to the first image
      animateToIndex(0);
    } else {
      currentIndex++;
      updateCarousel();
    }
  }

  // Animate from current index to target index
  function animateToIndex(targetIndex) {
    isAnimating = true;

    // Calculate the total translation distance
    const itemWidth = carouselItems[0].offsetWidth + 25; // Including the gap
    const startTranslate = -currentIndex * itemWidth;
    let endTranslate;

    if (currentIndex === totalItems - 1 && targetIndex === 0) {
      // Animate from last to first
      endTranslate = -(totalItems) * itemWidth; // Go one beyond the end
    } else if (currentIndex === 0 && targetIndex === totalItems - 1) {
      // Animate from first to last
      endTranslate = itemWidth; // Go one before the beginning
    }

    // Create animation
    const duration = 500; // ms
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use easing function for smoother animation
      const easeProgress = easeInOutCubic(progress);

      // Calculate current position
      const currentTranslate = startTranslate + (endTranslate - startTranslate) * easeProgress;
      carouselImages.style.transform = `translateX(${currentTranslate}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete, reset to actual target position
        currentIndex = targetIndex;
        updateCarousel();
        isAnimating = false;
      }
    }

    requestAnimationFrame(animate);
  }

  // Easing function for smoother animation
  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
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