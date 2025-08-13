document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose = document.getElementById('menuClose');
  const body = document.body;

  // Function to open menu
  function openMenu() {
    menuOverlay.classList.add('active');
    menuToggle.classList.add('active');
    body.classList.add('menu-open');
  }

  // Function to close menu
  function closeMenu() {
    menuOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
    body.classList.remove('menu-open');
  }

  // Event listeners
  if (menuToggle) {
    menuToggle.addEventListener('click', openMenu);
  }

  if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
  }

  // Close menu when clicking outside the menu links
  if (menuOverlay) {
    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) {
        closeMenu();
      }
    });
  }

  // Close menu when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close menu when clicking on menu links (for better UX)
  const menuLinks = document.querySelectorAll('.menu-links a');
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});