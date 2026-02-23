// script.js - Danilo Cezar [Edição Dark & Premium]

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Navegação Suave (Smooth Scroll) ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Compensação para o header fixo (ajuste de 80px)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            // Fecha o menu mobile ao clicar
            const mainNav = document.getElementById('main-nav');
            const menuToggle = document.querySelector('.menu-toggle');
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- 2. Menu Hambúrguer & Acessibilidade ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = mainNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Troca o ícone de bars para times (X) se quiser um feedback visual
            const icon = menuToggle.querySelector('i');
            if (isExpanded) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // --- 3. Efeito Reveal ao Rolar (Scroll Animation) ---
    const revealElements = document.querySelectorAll('.about-grid, .album-card, .show-item, .contact-grid');
    
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

    // Configuração inicial para o efeito de entrada
    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Dispara uma vez para o que já estiver na tela

    // --- 4. Validação do Formulário de Contato ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            if (formData.name === "" || formData.email === "" || formData.message.length < 10) {
                showStatus('Por favor, preencha todos os campos corretamente.', 'error');
                return;
            }

            // Simulação de envio (Efeito de Loading)
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showStatus('Mensagem enviada com sucesso! Logo entraremos em contato.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    function showStatus(msg, type) {
        formStatus.textContent = msg;
        formStatus.className = `form-status ${type}`; // Aplica as cores do CSS
        formStatus.style.display = 'block';
        formStatus.style.marginTop = '20px';
        
        if (type === 'success') {
            setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
        }
    }
});
