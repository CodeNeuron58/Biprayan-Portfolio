import { typeWriter, scrambleText } from './typing.js';
import gsap from 'gsap';

export function initHeroAnimation(): void {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  // Elements to animate
  const terminalEl = heroSection.querySelector('.hero-terminal-window') as HTMLElement;
  const nameEl = heroSection.querySelector('.hero-name') as HTMLElement;
  const taglineEl = heroSection.querySelector('.hero-tagline') as HTMLElement;
  const subEl = heroSection.querySelector('.hero-sub') as HTMLElement;
  const ctasEl = heroSection.querySelector('.hero-ctas') as HTMLElement;
  const scrollEl = heroSection.querySelector('.hero-scroll') as HTMLElement;

  // Hide elements initially
  const elements = [nameEl, taglineEl, subEl, ctasEl, scrollEl];
  elements.forEach(el => {
    if (el) {
      gsap.set(el, { opacity: 0, y: 20 });
    }
  });

  // Wait for boot sequence to complete
  document.addEventListener('bootComplete', () => {
    startHeroAnimation();
  });

  // Also start if boot is skipped (reduced motion)
  if (!document.querySelector('.boot-overlay')) {
    startHeroAnimation();
  }

  function startHeroAnimation(): void {
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate terminal
    if (terminalEl) {
      tl.fromTo(terminalEl, 
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }

    // Type name with scramble effect
    tl.add(() => {
      if (nameEl) {
        const finalText = nameEl.textContent || '';
        nameEl.textContent = '';
        gsap.set(nameEl, { opacity: 1, y: 0 });
        scrambleText(nameEl, finalText, 1);
      }
    }, '+=0.5');

    // Type tagline
    tl.add(() => {
      if (taglineEl) {
        const finalText = taglineEl.textContent || '';
        taglineEl.textContent = '';
        gsap.set(taglineEl, { opacity: 1, y: 0 });
        
        typeWriter(taglineEl, finalText, {
          speed: 40,
          cursor: true,
          cursorChar: '█',
          humanize: true
        });
      }
    }, '+=0.8');

    // Fade in subtitle
    tl.to(subEl, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '+=0.5');

    // Fade in CTAs
    tl.to(ctasEl, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3');

    // Fade in scroll indicator
    tl.to(scrollEl, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.2');
  }
}

// Add command history animation
export function initCommandHistory(): void {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const commands = [
    { command: 'whoami', output: 'biprayan_choudhuri' },
    { command: 'cat skills.txt', output: 'AI/ML • LangGraph • Python • RAG' },
    { command: 'pwd', output: '~/biprayan/systems' },
  ];

  // Add hidden terminal for easter egg
  const terminal = document.createElement('div');
  terminal.className = 'hero-secret-terminal';
  terminal.innerHTML = `
    <div class="secret-terminal-header">Try typing a command...</div>
    <div class="secret-input-line">
      <span class="secret-prompt">$</span>
      <input type="text" class="secret-input" placeholder="whoami, pwd, help..." />
    </div>
    <div class="secret-output"></div>
  `;
  
  // Position it subtly
  terminal.style.cssText = `
    position: absolute;
    bottom: 100px;
    right: 60px;
    opacity: 0.3;
    transition: opacity 0.3s;
  `;
  
  heroSection.appendChild(terminal);
  
  // Show on hover
  terminal.addEventListener('mouseenter', () => {
    terminal.style.opacity = '1';
  });
  terminal.addEventListener('mouseleave', () => {
    terminal.style.opacity = '0.3';
  });

  // Handle input
  const input = terminal.querySelector('.secret-input') as HTMLInputElement;
  const output = terminal.querySelector('.secret-output') as HTMLElement;

  input?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';
      
      // Show command
      const cmdLine = document.createElement('div');
      cmdLine.className = 'secret-cmd-line';
      cmdLine.innerHTML = `<span class="secret-prompt">$</span> ${cmd}`;
      output.appendChild(cmdLine);
      
      // Show response
      const response = document.createElement('div');
      response.className = 'secret-response';
      
      const match = commands.find(c => c.command === cmd);
      if (match) {
        response.textContent = match.output;
      } else if (cmd === 'help') {
        response.textContent = 'Available: whoami, pwd, cat skills.txt, clear';
      } else if (cmd === 'clear') {
        output.innerHTML = '';
        return;
      } else if (cmd === 'neofetch') {
        response.innerHTML = `
          <pre>
  ██████╗ ██╗██████╗ ██████╗  █████╗ ██╗   ██╗ █████╗ ███╗   ██╗
  ██╔══██╗██║██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝██╔══██╗████╗  ██║
  ██████╔╝██║██████╔╝██████╔╝███████║ ╚████╔╝ ███████║██╔██╗ ██║
  ██╔══██╗██║██╔═══╝ ██╔═══╝ ██╔══██║  ╚██╔╝  ██╔══██║██║╚██╗██║
  ██████╔╝██║██║     ██║     ██║  ██║   ██║   ██║  ██║██║ ╚████║
  ╚═════╝ ╚═╝╚═╝     ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝
          
  OS: AI/ML Engineer Portfolio
  Host: AI/ML Systems Division
  Kernel: LangGraph, LangChain, PyTorch
  Uptime: Always learning
          </pre>
        `;
      } else {
        response.textContent = `command not found: ${cmd}`;
        response.classList.add('secret-error');
      }
      
      output.appendChild(response);
      output.scrollTop = output.scrollHeight;
    }
  });
}
