function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const links = document.querySelectorAll('.nav-links a');

burger.addEventListener('click', () => {
navLinks.classList.toggle('active');
});

links.forEach(link => {
link.addEventListener('click', () => {
navLinks.classList.remove('active');
});
});
