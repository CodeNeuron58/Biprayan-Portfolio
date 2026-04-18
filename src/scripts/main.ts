import { initThreeScene } from '../three/scene';
import { createBootSequence } from './boot';
import { initSmoothScroll } from './smooth-scroll';
import { initHeroAnimation, initCommandHistory } from './hero';
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
  // Start boot sequence immediately
  createBootSequence();
  
  // Initialize smooth scrolling
  initSmoothScroll();
  
  // Load components
  await loadComponents();
  await renderProjects();
  await renderSkills();
  
  // Initialize Three.js background
  initThreeScene();
  
  // Initialize hero animations (will wait for bootComplete event)
  initHeroAnimation();
  initCommandHistory();
  
  // Initialize other modules
  initNavbar();
  initScrollReveal();
  initContactForm();
  initAnimations();
  
  // Modal is already initialized via its constructor
});
