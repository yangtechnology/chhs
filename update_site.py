import os, glob

workspace = "C:/Users/User/.gemini/antigravity/scratch/zhuangwo-band"
os.chdir(workspace)

# 1. Update navbars
for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if 'join.html' not in content:
        content = content.replace('<li><a href="contact.html">聯絡我們</a></li>', '<li><a href="join.html">加入我們</a></li>\n                <li><a href="contact.html">聯絡我們</a></li>')
        content = content.replace('<li><a href="contact.html" class="active">聯絡我們</a></li>', '<li><a href="join.html">加入我們</a></li>\n                <li><a href="contact.html" class="active">聯絡我們</a></li>')
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)

# 2. Append CSS for IG Button
with open('style.css', 'r', encoding='utf-8') as file:
    css = file.read()
if '.ig-btn' not in css:
    with open('style.css', 'a', encoding='utf-8') as file:
        file.write("\n/* Instagram Button */\n.ig-btn { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: white; padding: 10px 20px; border-radius: 50px; text-decoration: none; font-weight: bold; transition: transform 0.3s ease, box-shadow 0.3s ease; margin-top: 15px; }\n.ig-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(220, 39, 67, 0.3); color: white; }\n")

# 3. Add IG Button to contact.html
with open('contact.html', 'r', encoding='utf-8') as file:
    contact_html = file.read()
ig_button = '''
            <div style="margin-top: 2.5rem;">
                <a href="https://instagram.com/zhuangwo_band" target="_blank" class="ig-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    追蹤我們的 Instagram
                </a>
            </div>'''
if 'ig-btn' not in contact_html:
    contact_html = contact_html.replace('<p><strong>地址：</strong>新竹縣新豐鄉忠信街178號</p>', '<p><strong>地址：</strong>新竹縣新豐鄉忠信街178號</p>' + ig_button)
    with open('contact.html', 'w', encoding='utf-8') as file:
        file.write(contact_html)

# 4. Update script.js with joinForm logic
with open('script.js', 'r', encoding='utf-8') as file:
    script_js = file.read()
join_logic = '''
const joinForm = document.getElementById('join-form');
if (joinForm) {
    joinForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = joinForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '傳送中...';
        btn.disabled = true;

        const formData = new FormData(joinForm);

        fetch('https://script.google.com/macros/s/AKfycbzmrz5AJDC5jWTas6D8DQP3H5bkM5JxcQggIEMunazJLwM8s_M_iuxGzEFfjyfoVR8c/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert('報名表單已成功送出！我們會盡快與您聯繫。');
            joinForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        })
        .catch(error => {
            alert('傳送失敗，請稍後再試。');
            btn.textContent = originalText;
            btn.disabled = false;
        });
    });
}
'''
if 'join-form' not in script_js:
    with open('script.js', 'a', encoding='utf-8') as file:
        file.write(join_logic)
