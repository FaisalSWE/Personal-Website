document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.main-nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const correspondingLink = document.querySelector(`.main-nav a[href="#${id}"]`);

            if (correspondingLink) {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                } else {
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    const handleScroll = () => {
        const firstScrollableSection = document.getElementById('about');
        if (firstScrollableSection && window.scrollY < firstScrollableSection.offsetTop - document.querySelector('.main-header').offsetHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const heroLink = document.querySelector('.main-nav a[href="#hero"]');
            if (heroLink) {
                heroLink.classList.add('active');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

});