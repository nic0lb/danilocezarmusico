// script.js - Danilo Cezar [Edição Dark & Premium]

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Controle da Tela de Entrada e Música (Autoplay Blindado) ---
    const startBtn = document.getElementById('startBtn');
    const overlay = document.getElementById('overlay');
    const bgMusic = document.getElementById('bgMusic');

    // Função para tocar a música com segurança
    function playAudio() {
        if (bgMusic) {
            bgMusic.volume = 1.0; // Garante que não está mudo no código
            bgMusic.play()
                .then(() => console.log("Áudio iniciado com sucesso!"))
                .catch(error => console.error("Falha ao tocar áudio:", error));
        }
    }

    if (startBtn && overlay) {
        startBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Impede conflitos de clique
            console.log("Botão de entrada clicado.");
            
            playAudio();
            
            overlay.classList.add('fade-out');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 800);
        });
    }

    // --- 2. Navegação Suave (Smooth Scroll) ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            const mainNav = document.getElementById('main-nav');
            const menuToggle = document.querySelector('.menu-toggle');
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // --- 3. Menu Hambúrguer ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = mainNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            const icon = menuToggle.querySelector('i');
            if (isExpanded) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // --- 4. Efeito Reveal ao Rolar ---
    const revealElements = document.querySelectorAll('.about-grid, .album-card, .video-item, .contact-grid');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    };

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- 5. Validação do Formulário ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Mensagem enviada com sucesso!');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});
