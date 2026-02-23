// script.js - Danilo Cezar [Edição Dark & Premium]

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Controle da Tela de Entrada e Música (Autoplay) ---
    const startBtn = document.getElementById('startBtn');
    const overlay = document.getElementById('overlay');
    const bgMusic = document.getElementById('bgMusic');

    if (startBtn && overlay) {
        startBtn.addEventListener('click', function() {
            // Toca a música assim que o usuário clica para entrar
            if (bgMusic) {
                bgMusic.play().catch(error => {
                    console.log("O navegador bloqueou o áudio: ", error);
                });
            }
            
            // Efeito de sumir a tela de entrada
            overlay.classList.add('fade-out');
            
            // Remove do site para não atrapalhar cliques futuros
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

            // Fecha o menu mobile ao clicar em um link
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

    // --- 4. Efeito Reveal ao Rolar (Scroll Animation) ---
    // Adicionei os .album-card para que eles apareçam conforme você desce
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

    // Configuração inicial invisível
    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- 5. Validação do Formulário de Contato ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.textContent;
            
            // Simulação de envio
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Aqui você pode integrar com algum serviço de e-mail no futuro
                alert('Mensagem enviada com sucesso! Danilo Cezar entrará em contato em breve.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});
