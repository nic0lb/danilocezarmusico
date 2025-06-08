// script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Smooth Scrolling (Navegação Suave) ---
    // Faz a página rolar suavemente para a seção clicada no menu.
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previne o comportamento padrão do link (pular para a âncora)

            // Obtém o ID da seção do atributo 'href' do link (ex: '#sobre')
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Rola para o elemento com um comportamento suave
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. Validação Básica do Formulário de Contato ---
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        // Limpa mensagens de erro anteriores
        clearErrors();

        let isValid = true;

        // Validação do Nome
        if (nameInput.value.trim() === '') {
            displayError('nameError', 'Por favor, digite seu nome.');
            isValid = false;
        }

        // Validação do E-mail
        if (emailInput.value.trim() === '') {
            displayError('emailError', 'Por favor, digite seu e-mail.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            displayError('emailError', 'Por favor, digite um e-mail válido.');
            isValid = false;
        }

        // Validação da Mensagem
        if (messageInput.value.trim() === '') {
            displayError('messageError', 'Por favor, digite sua mensagem.');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            displayError('messageError', 'A mensagem deve ter pelo menos 10 caracteres.');
            isValid = false;
        }

        if (isValid) {
            // Se o formulário é válido, simula um envio e exibe mensagem de sucesso
            formStatus.classList.remove('error');
            formStatus.classList.add('success');
            formStatus.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
            formStatus.style.display = 'block';

            // Resetar o formulário após 3 segundos
            setTimeout(() => {
                contactForm.reset();
                formStatus.style.display = 'none';
                formStatus.textContent = '';
            }, 3000);

            // Em um cenário real, você enviaria os dados para um backend aqui
            console.log('Formulário enviado:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });

        } else {
            // Se o formulário não é válido, exibe mensagem de erro geral
            formStatus.classList.remove('success');
            formStatus.classList.add('error');
            formStatus.textContent = 'Por favor, corrija os erros no formulário.';
            formStatus.style.display = 'block';
        }
    });

    function displayError(id, message) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
        formStatus.style.display = 'none';
    }

    function isValidEmail(email) {
        // Expressão regular simples para validação de e-mail
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});