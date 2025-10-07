document.addEventListener('DOMContentLoaded', () => {

    // --- スクロールで要素をフェードインさせる機能 ---
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2 // 20%表示されたら実行
    });

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // --- ハンバーガーメニューの機能 ---
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // --- お問い合わせフォームの送信機能 ---
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 送信ボタンのテキストを変更
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.textContent = '送信中...';
        submitButton.disabled = true;

        // 疑似的な送信処理
        setTimeout(() => {
            alert('お問い合わせありがとうございます！返信をお待ちください。');
            contactForm.reset(); // フォームをリセット
            submitButton.textContent = '送信する';
            submitButton.disabled = false;
        }, 1000);
    });

});
