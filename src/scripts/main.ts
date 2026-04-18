import { initParticles } from './particles';
import { initNavbar, toggleMobileMenu, closeMobileMenu } from './nav';
import { initScrollReveal } from './reveal';
import { initContactForm } from './contact';
import { loadComponents } from './components';
import { renderProjects } from './projects';
import { renderSkills } from './skills';
import { initAnimations } from './animations';
import './modal';

// Make mobile menu functions globally available
(window as any).toggleMobile = toggleMobileMenu;
(window as any).closeMobile = closeMobileMenu;

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  await loadComponents();
  await renderProjects();
  await renderSkills();
  
  initParticles();
  initNavbar();
  initScrollReveal();
  initContactForm();
  initAnimations();
  
  // Modal is already initialized via its constructor
});
