document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector(".site-header__title");
  const text = title.textContent;
  
  // Split text into letters, preserving spaces
  title.innerHTML = text
    .split("")
    .map(char => {
      if (char === " ") return `<span class="letter" style="margin-right:0.25em">&nbsp;</span>`;
      return `<span class="letter">${char}</span>`;
    })
    .join("");
  
  const letters = document.querySelectorAll(".site-header__title .letter");
  
  // Function to animate letters
  function animateLetters() {
    letters.forEach((letter, i) => {
      letter.style.animation = `letterFloat 0.6s ease-in-out ${i * 0.1}s forwards`;
      // Remove animation after it's done so it can rerun
      setTimeout(() => {
        letter.style.animation = "";
      }, 700 + i * 100);
    });
  }
  
  // Animate on page load
  animateLetters();
  
  // Animate on hover
  title.addEventListener("mouseenter", animateLetters);
});