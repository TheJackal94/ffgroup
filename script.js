document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Check if the intersecting element is the stats section
                if (entry.target.classList.contains('stats-section')) {
                    const counters = document.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Function to animate a single counter
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;

        const timer = setInterval(() => {
            current += 1;
            counter.innerText = current;
            if (current == target) {
                clearInterval(timer);
            }
        }, stepTime);
        
        // Prevents re-animating the same counter
        counter.removeAttribute('data-target');
    }

    // Gallery Slideshow Logic
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    
    slideshowContainers.forEach(container => {
        const slides = container.querySelectorAll('.slide');
        let currentSlideIndex = 0;

        if (slides.length > 1) {
            setInterval(() => {
                // Fade out current slide
                slides[currentSlideIndex].classList.remove('active');
                
                // Move to next slide
                currentSlideIndex = (currentSlideIndex + 1) % slides.length;
                
                // Fade in new slide
                slides[currentSlideIndex].classList.add('active');
            }, 4000); // Changes image every 4 seconds
        }
    });
});