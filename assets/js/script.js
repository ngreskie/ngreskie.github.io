document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");

  menuToggle.addEventListener("click", () => {
    menuOverlay.classList.add("active");
  });

  menuClose.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
  });

  // Optional: close menu when clicking outside the links
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove("active");
    }
  });
});
