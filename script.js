document.addEventListener('DOMContentLoaded', function() {
    // AOS Initialization
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Contact Form Submission (GAS API)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '傳送中...';
            btn.disabled = true;

            const formData = new FormData(contactForm);
            // 標示這是聯絡表單
            formData.append('formType', 'contact');

            fetch('https://script.google.com/macros/s/AKfycbzmrz5AJDC5jWTas6D8DQP3H5bkM5JxcQggIEMunazJLwM8s_M_iuxGzEFfjyfoVR8c/exec', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert('訊息已成功送出！我們將盡快與您聯繫。');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            })
            .catch(error => {
                alert('傳送失敗，請稍後再試。');
                console.error('Error!', error.message);
                btn.textContent = originalText;
                btn.disabled = false;
            });
        });
    }

    // Join Form Submission (GAS API)
    const joinForm = document.getElementById('join-form');
    if (joinForm) {
        joinForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const btn = joinForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '傳送中...';
            btn.disabled = true;

            const formData = new FormData(joinForm);
            // 標示這是加入我們表單
            formData.append('formType', 'join');

            fetch('https://script.google.com/macros/s/AKfycbzmrz5AJDC5jWTas6D8DQP3H5bkM5JxcQggIEMunazJLwM8s_M_iuxGzEFfjyfoVR8c/exec', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert('報名表單已成功送出！我們將盡快與您聯繫。');
                joinForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            })
            .catch(error => {
                alert('傳送失敗，請稍後再試。');
                console.error('Error!', error.message);
                btn.textContent = originalText;
                btn.disabled = false;
            });
        });
    }
});
