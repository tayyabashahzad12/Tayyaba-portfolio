/* -------------------------------------------------------------
 * TAYYABA SHAHZAD - CYBER SECURITY PORTFOLIO SYSTEM SCRIPTS
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. THEME MANAGEMENT SYSTEM ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('cyber-portfolio-theme') || 'light';
    body.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('cyber-portfolio-theme', newTheme);

        initMatrixColors();
    });


    // --- 2. MATRIX DIGITAL RAIN CANVAS ---
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const alphabet = '0101010101010101ABCDEF';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);

    let rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = Math.random() * -100;
    }

    let bgColor, matrixColor;

    function initMatrixColors() {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            bgColor = 'rgba(250, 248, 245, 0.15)';
            matrixColor = '#005fcc';
        } else {
            bgColor = 'rgba(3, 7, 18, 0.08)';
            matrixColor = '#00e5ff';
        }
    }

    initMatrixColors();

    function drawMatrix() {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);

        ctx.font = fontSize + 'px "Source Code Pro", monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const char = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            const x = i * fontSize;
            const y = rainDrops[i] * fontSize;

            if (Math.random() > 0.98) {
                const currentTheme = body.getAttribute('data-theme');
                ctx.fillStyle = currentTheme === 'light' ? '#008bb2' : '#00d4ff';
            } else {
                ctx.fillStyle = matrixColor;
            }

            ctx.fillText(char, x, y);

            if (y > height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / fontSize);

        rainDrops = [];
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = Math.random() * -100;
        }
    });

    setInterval(drawMatrix, 35);


    // --- 3. DYNAMIC TYPING EFFECT ---
    const typingTextElement = document.getElementById('typing-text');
    const taglines = [
        "Securing the Digital Frontier",
        "Threat Hunter in Training",
        "Defensive Security Operations",
        "Ethical Hacking Student"
    ];

    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentTagline = taglines[taglineIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentTagline.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingTextElement.textContent = currentTagline.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTagline.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            taglineIndex = (taglineIndex + 1) % taglines.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 1000);


    // --- 4. SCROLL PROGRESS INDICATOR ---
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const heightDifference = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPercentage = (winScroll / heightDifference) * 100;

        document.getElementById('scroll-progress-bar').style.width = scrolledPercentage + '%';
    });


    // --- 5. MOBILE NAVIGATION CONTROLLER ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // --- 6. SCROLL REVEAL & SKILLS PROGRESS ANIMATION ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                if (entry.target.classList.contains('skills-category-card')) {
                    const progressBars = entry.target.querySelectorAll('.skill-bar-fill');
                    progressBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.width = progress;
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // --- 7. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL ---
    const sections = document.querySelectorAll('section');

    const navObserverOptions = {
        threshold: 0.4,
        rootMargin: '-80px 0px -40% 0px'
    };

    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });


    // --- 8. SECURE CONTACT FORM HANDLER ---
    const contactForm = document.getElementById('secure-contact-form');

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        nameError.style.display = 'none';
        emailError.style.display = 'none';
        messageError.style.display = 'none';

        if (!nameInput.value.trim()) {
            nameError.style.display = 'block';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            emailError.style.display = 'block';
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            messageError.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            const submitBtn = document.getElementById('btn-submit-form');
            const originalBtnHtml = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = `<span class="btn-text">TRANSMITTING...</span> <span class="btn-icon"><i class="fa-solid fa-spinner fa-spin"></i></span>`;

            setTimeout(() => {
                submitBtn.innerHTML = `<span class="btn-text">SUCCESS (PAYLOAD RECV)</span> <span class="btn-icon"><i class="fa-solid fa-circle-check"></i></span>`;
                submitBtn.style.borderColor = 'var(--primary)';
                submitBtn.style.color = 'var(--primary)';
                submitBtn.style.background = 'rgba(var(--primary-rgb), 0.15)';

                alert(`Encrypted Transmission Logged:\n\nName: ${nameInput.value}\nEmail: ${emailInput.value}\nMessage Payload received successfully. Connection Secure.`);

                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.color = '';
                    submitBtn.style.background = '';
                    submitBtn.innerHTML = originalBtnHtml;
                }, 3000);

            }, 1500);
        }
    });

    // --- 9. SECURE CV DOWNLOAD TRIGGER ---
    const downloadCvBtn = document.getElementById('download-cv-btn');
    downloadCvBtn.addEventListener('click', (e) => {
        e.preventDefault();

        alert("Establishing secure download tunnel...\nDownloading Tayyaba_Shahzad_CV.pdf (Decrypted Session Active).");

        const dummyContent = "Tayyaba Shahzad - Cyber Security Analyst Resume Mock Data File";
        const blob = new Blob([dummyContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Tayyaba_Shahzad_CV.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    });

});