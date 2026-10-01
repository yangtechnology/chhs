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

    // 統一處理表單送出邏輯
    const handleFormSubmit = (formId, formType, successMsg) => {
        const form = document.getElementById(formId);
        if (!form) return;
        
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '傳送中...';
            btn.disabled = true;

            const formData = new FormData(form);
            formData.append('formType', formType); // 標示表單類型

            fetch('https://script.google.com/macros/s/AKfycbzmrz5AJDC5jWTas6D8DQP3H5bkM5JxcQggIEMunazJLwM8s_M_iuxGzEFfjyfoVR8c/exec', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                // 如果後端回傳錯誤訊息，直接顯示在網頁上方便除錯
                if (data.includes("Error") || data.includes("Exception")) {
                    alert('後端處理發生錯誤，請聯絡管理員：\n' + data);
                } else {
                    alert(successMsg);
                    form.reset();
                }
                btn.textContent = originalText;
                btn.disabled = false;
            })
            .catch(error => {
                // CORS 或網路完全斷線的錯誤
                alert('網路錯誤或 Apps Script 未正確部署，傳送失敗。');
                console.error('Error!', error.message);
                btn.textContent = originalText;
                btn.disabled = false;
            });
        });
    };

    // 註冊兩個表單
    handleFormSubmit('contact-form', 'contact', '訊息已成功送出！我們將盡快與您聯繫。');
    handleFormSubmit('join-form', 'join', '報名表單已成功送出！我們將盡快與您聯繫。');
});
