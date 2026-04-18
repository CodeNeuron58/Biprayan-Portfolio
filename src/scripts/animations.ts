import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function initAnimations(): void {
  // Hero Section Animations - Fade in and slide up on page load
  const heroName = document.querySelector('.hero-name');
  const heroTagline = document.querySelector('.hero-tagline');
  const heroSub = document.querySelector('.hero-sub');
  const heroCtas = document.querySelector('.hero-ctas');

  if (heroName || heroTagline || heroSub || heroCtas) {
    const heroTimeline = gsap.timeline();

    if (heroName) {
      heroTimeline.fromTo(
        heroName,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }

    if (heroTagline) {
      heroTimeline.fromTo(
        heroTagline,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }

    if (heroSub) {
      heroTimeline.fromTo(
        heroSub,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }

    if (heroCtas) {
      heroTimeline.fromTo(
        heroCtas,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }
  }

  // Scroll Animations for Project Cards
  const projectCards = document.querySelectorAll('.project-card');
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
  const aboutBentoCards = document.querySelectorAll('#about .bento-card');
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

  // Scroll Animations for Skills Bento Cards
  const skillsBentoCards = document.querySelectorAll('.skill-bento-card');
  skillsBentoCards.forEach((card, index) => {
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
