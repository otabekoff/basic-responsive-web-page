document.addEventListener('DOMContentLoaded', () => {
    let isScrolling = false;

    // Function to handle smooth scroll to target section
    function smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - 80; // Adjust offset for fixed header
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800; // Duration of the scroll in milliseconds
            let startTime = null;

            function scrollAnimation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const easeInOutQuad = progress * (2 - progress); // Easing function
                window.scrollTo(0, startPosition + distance * easeInOutQuad);

                if (timeElapsed < duration) {
                    requestAnimationFrame(scrollAnimation);
                } else {
                    isScrolling = false; // Scroll animation complete
                }
            }

            isScrolling = true; // Scroll animation started
            requestAnimationFrame(scrollAnimation);
        }
    }

    // Function to update the active menu link
    function setActiveLink(targetId) {
        const links = document.querySelectorAll('.nav-links a, nav ul li a');
        links.forEach(link => {
            if (link.getAttribute('href').substring(1) === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Smooth scroll and highlight the active menu link on menu link click
    document.querySelectorAll('.nav-links a, nav ul li a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default anchor behavior

            const targetId = this.getAttribute('href').substring(1); // Get the target ID

            setActiveLink(targetId); // Highlight clicked link
            smoothScrollTo(targetId); // Smooth scroll to the target

            if (window.innerWidth <= 768) { // Check if on mobile
                document.querySelector('.nav-links').classList.remove('show'); // Close mobile menu
            }
        });
    });

    // Function to handle scroll event and highlight the active menu item
    function updateActiveLink() {
        if (isScrolling) return; // Skip update during scroll animation

        const sections = document.querySelectorAll('section');
        const links = document.querySelectorAll('.nav-links a, nav ul li a');
        let maxVisibleSection = '';
        let maxVisiblePercentage = 0;

        sections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            const sectionHeight = sectionRect.height;
            const sectionTop = sectionRect.top;
            const sectionBottom = sectionRect.bottom;

            // Calculate visible percentage of the section
            const visibleHeight = Math.min(sectionBottom, window.innerHeight) - Math.max(sectionTop, 0);
            const visiblePercentage = Math.max(0, visibleHeight / sectionHeight);

            if (visiblePercentage > maxVisiblePercentage) {
                maxVisiblePercentage = visiblePercentage;
                maxVisibleSection = section.getAttribute('id');
            }
        });

        setActiveLink(maxVisibleSection); // Highlight the section in view
    }

    // Debounce function for scroll event to limit the rate of function execution
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Update active link on scroll
    const debouncedUpdateActiveLink = debounce(updateActiveLink, 100); // Adjust delay as needed
    window.addEventListener('scroll', debouncedUpdateActiveLink);

    // Update active link on load
    updateActiveLink();

    // Toggle the mobile menu visibility
    document.getElementById('mobile-menu').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('show');
    });

    // Close the mobile menu when clicking on the backdrop
    document.querySelector('.nav-links').addEventListener('click', event => {
        if (event.target === document.querySelector('.nav-links')) {
            document.querySelector('.nav-links').classList.remove('show');
        }
    });
});
