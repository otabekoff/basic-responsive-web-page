document.addEventListener('DOMContentLoaded', () => {
    // Function to handle scroll event and highlight the active menu item
    function updateActiveLink() {
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

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(maxVisibleSection)) {
                link.classList.add('active');
            }
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Update active link on load
    updateActiveLink();

    // Add event listeners to handle click events on mobile menu
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('show');
        });
    });

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
