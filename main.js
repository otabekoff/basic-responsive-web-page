document.getElementById('mobile-menu').addEventListener('click', function() {
    var navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
});

// Add an event listener to each nav link to close the menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
        var navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('show');
    });
});
