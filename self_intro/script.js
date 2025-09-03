document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header h1");
  header.style.opacity = 0;
  header.style.transform = "translateY(-20px)";
  
  setTimeout(() => {
    header.style.transition = "all 1s";
    header.style.opacity = 1;
    header.style.transform = "translateY(0)";
  }, 300);
});

// スキルをクリックしたらアラートを出す
document.querySelectorAll("#skills li").forEach(item => {
  item.addEventListener("click", () => {
    alert(`選んだスキル: ${item.textContent}`);
  });
});
