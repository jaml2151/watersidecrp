var sec = 10;

var carousel = document.querySelector('.carousel');
var track = carousel.querySelector('.carousel-track');
var slides = carousel.querySelectorAll('.carousel-item');
var slideWidth = slides[0].offsetWidth;
var currentSlide = 0;
var isTransitioning = false;
var slideInterval = setInterval(nextSlide, sec * 1000); // Change slide every "sec" seconds in ms

function nextSlide() {
    if (!isTransitioning) {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlidePosition();
    }
}

function previousSlide() {
    if (!isTransitioning) {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlidePosition();
    }
}

function updateSlidePosition() {
    isTransitioning = true;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = 'translateX(' + (-currentSlide * slideWidth) + 'px)';

    setTimeout(function () {
        track.style.transition = '';
        isTransitioning = false;
    }, 500); // Wait for the transition to finish before resetting the transition property

    // Update active slide and language display
    var activeSlide = slides[currentSlide];
    var slideLanguage = activeSlide.getAttribute('data-language');

    // Remove .current class from all slides
    slides.forEach(function (slide) {
        slide.classList.remove('current');
    });

    // Add .current class to the active slide
    activeSlide.classList.add('current');

    // Update language display
    var languageSpans = document.querySelectorAll('.language span');
    languageSpans.forEach(function (span) {
        if (span.classList.contains(slideLanguage)) {
            span.classList.add('current');
        } else {
            span.classList.remove('current');
        }

        // Add click event listener to language spans
        span.addEventListener('click', function () {
            var languageClass = span.classList[0];
            var slideIndex = Array.from(slides).findIndex(function (slide) {
                return slide.getAttribute('data-language') === languageClass;
            });

            if (slideIndex !== -1) {
                currentSlide = slideIndex;
                updateSlidePosition();
            }
        });
    });
}

// Trigger the initial slide transition and language display update
updateSlidePosition();