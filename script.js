document.addEventListener('DOMContentLoaded', function () {
    const scrollButton = document.getElementById('scroll-down-home');
    const aboutHome = document.querySelector('.about-home');

    scrollButton.addEventListener('click', function () {
        aboutHome.scrollIntoView({ behavior: 'smooth' });
    });
});
