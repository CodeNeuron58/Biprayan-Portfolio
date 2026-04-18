import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function initAnimations(): void {
  // Hero animations are handled by hero.ts (boot sequence + typing)

  // Scroll Animations for Project Cards
  const projectCards = document.querySelectorAll('.terminal-project');
  projectCards.forEach((card) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Scroll Animations for Bento Grid Items (About section)
  const aboutBentoCards = document.querySelectorAll('#about .bento-card, #about .terminal-file');
  aboutBentoCards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Scroll Animations for Skill Packages
  const skillPackages = document.querySelectorAll('.skill-package');
  skillPackages.forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}
