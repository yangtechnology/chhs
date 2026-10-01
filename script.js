document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // 2. Google Apps Script Form Submission (Only executes on contact.html)
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    
    // User's GAS URL
    const gasUrl = 'https://script.google.com/macros/s/AKfycbzmrz5AJDC5jWTas6D8DQP3H5bkM5JxcQggIEMunazJLwM8s_M_iuxGzEFfjyfoVR8c/exec';

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault(); 
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'SENDING...';
            formStatus.innerHTML = '';

            const formData = new FormData(form);

            fetch(gasUrl, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    form.reset(); 
                    formStatus.innerHTML = '<span style="color: #C5A059;">訊息已成功送出。我們會盡快與您聯繫。</span>';
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formStatus.innerHTML = '<span style="color: #dc3545;">發送失敗，請稍後再試。</span>';
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = 'SEND MESSAGE';
            });
        });
    }
});
