export function initNavbar(): void {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Initialize clock
  updateClock();
  setInterval(updateClock, 1000);

  // Update path based on scroll position
  initPathTracking();
}

function updateClock(): void {
  const clockEl = document.getElementById('nav-clock');
  if (!clockEl) return;
  
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
  clockEl.textContent = time;
}

function initPathTracking(): void {
  const pathEl = document.getElementById('nav-path');
  if (!pathEl) return;

  const sections = ['about', 'projects', 'skills', 'contact'];
  const defaultPath = '~/portfolio';

  // Use Intersection Observer to track active section
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target.id;
          pathEl.textContent = `~/${section}`;
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });

  // Reset to default when at top
  window.addEventListener('scroll', () => {
    if (window.scrollY < 100) {
      pathEl.textContent = defaultPath;
    }
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
