import gsap from 'gsap';

interface BootLine {
  text: string;
  delay: number;
  type?: 'info' | 'success' | 'warning' | 'error';
}

const bootSequence: BootLine[] = [
  { text: '> initializing portfolio.kernel...', delay: 0, type: 'info' },
  { text: '> loading modules...', delay: 400, type: 'info' },
  { text: '  [OK] three.js renderer', delay: 200, type: 'success' },
  { text: '  [OK] gsap animations', delay: 150, type: 'success' },
  { text: '  [OK] neural network particles', delay: 150, type: 'success' },
  { text: '  [OK] terminal interface', delay: 150, type: 'success' },
  { text: '> mounting components...', delay: 300, type: 'info' },
  { text: '  [OK] hero section', delay: 200, type: 'success' },
  { text: '  [OK] project repository', delay: 150, type: 'success' },
  { text: '  [OK] skill matrix', delay: 150, type: 'success' },
  { text: '> establishing connection...', delay: 400, type: 'info' },
  { text: '  [CONNECTED] biprayan@portfolio:~$ ready', delay: 300, type: 'success' },
];

export function createBootSequence(): void {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Skip boot sequence for accessibility
    document.querySelectorAll('.boot-overlay').forEach(el => el.remove());
    document.body.style.overflow = '';
    return;
  }

  // Create boot overlay
  const overlay = document.createElement('div');
  overlay.className = 'boot-overlay';
  overlay.innerHTML = `
    <div class="boot-terminal">
      <div class="boot-header">
        <span class="boot-dot red"></span>
        <span class="boot-dot yellow"></span>
        <span class="boot-dot green"></span>
        <span class="boot-title">boot_sequence.exe</span>
      </div>
      <div class="boot-content"></div>
      <div class="boot-cursor">
        <span class="cursor-block">█</span>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  const contentEl = overlay.querySelector('.boot-content') as HTMLElement;
  
  let totalDelay = 0;
  
  bootSequence.forEach((line, index) => {
    totalDelay += line.delay;
    
    setTimeout(() => {
      const lineEl = document.createElement('div');
      lineEl.className = `boot-line boot-${line.type}`;
      
      // Type out the text
      typeText(lineEl, line.text, 20, () => {
        // Add newline after last line
        if (index === bootSequence.length - 1) {
          setTimeout(finishBoot, 800);
        }
      });
      
      contentEl.appendChild(lineEl);
      
      // Auto scroll to bottom
      contentEl.scrollTop = contentEl.scrollHeight;
      
      // Update cursor position
      const cursor = overlay.querySelector('.boot-cursor') as HTMLElement;
      if (cursor) {
        cursor.style.display = 'block';
      }
    }, totalDelay);
  });
}

function typeText(element: HTMLElement, text: string, speed: number, callback: () => void): void {
  let i = 0;
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      callback();
    }
  }
  
  type();
}

function finishBoot(): void {
  const overlay = document.querySelector('.boot-overlay') as HTMLElement;
  if (!overlay) return;
  
  // Screen flicker effect
  const flickerTl = gsap.timeline({
    onComplete: () => {
      // Fade out overlay
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          overlay.remove();
          document.body.style.overflow = '';
          
          // Trigger hero typing animation
          document.dispatchEvent(new CustomEvent('bootComplete'));
        }
      });
    }
  });
  
  // Flicker animation
  flickerTl
    .to(overlay, { opacity: 0.1, duration: 0.05 })
    .to(overlay, { opacity: 1, duration: 0.05 })
    .to(overlay, { opacity: 0.3, duration: 0.05 })
    .to(overlay, { opacity: 1, duration: 0.05 })
    .to(overlay, { opacity: 0, duration: 0.05 })
    .to(overlay, { opacity: 1, duration: 0.1 })
    .to(overlay, { opacity: 0.5, duration: 0.1 })
    .to(overlay, { opacity: 1, duration: 0.15 });
}
