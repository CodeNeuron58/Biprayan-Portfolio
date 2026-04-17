export function initNavbar(): void {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

export function toggleMobileMenu(): void {
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenu) return;
  
  mobileMenu.classList.toggle('open');
}

export function closeMobileMenu(): void {
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenu) return;
  
  mobileMenu.classList.remove('open');
}
