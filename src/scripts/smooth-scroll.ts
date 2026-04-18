import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initSmoothScroll(): void {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return;
  }

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Integrate with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Handle anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId) {
        const target = document.querySelector(targetId);
        if (target) {
          lenis?.scrollTo(target as HTMLElement, {
            offset: -80, // Account for fixed nav
            duration: 1.5
          });
        }
      }
    });
  });
}

export function scrollToElement(selector: string, offset: number = 0): void {
  const target = document.querySelector(selector);
  if (target && lenis) {
    lenis.scrollTo(target as HTMLElement, { offset });
  } else if (target) {
    // Fallback without Lenis
    const top = target.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function getLenis(): Lenis | null {
  return lenis;
}
