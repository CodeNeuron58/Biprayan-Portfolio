import gsap from 'gsap';

interface TypeOptions {
  speed?: number;
  cursor?: boolean;
  cursorChar?: string;
  humanize?: boolean;
  onComplete?: () => void;
}

export function typeWriter(
  element: HTMLElement, 
  text: string, 
  options: TypeOptions = {}
): void {
  const {
    speed = 50,
    cursor = true,
    cursorChar = '█',
    humanize = true,
    onComplete
  } = options;

  let currentText = '';
  let index = 0;
  
  // Create cursor element
  let cursorEl: HTMLElement | null = null;
  if (cursor) {
    cursorEl = document.createElement('span');
    cursorEl.className = 'typing-cursor';
    cursorEl.textContent = cursorChar;
    element.appendChild(cursorEl);
    
    // Blink animation
    gsap.to(cursorEl, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'steps(1)'
    });
  }

  function type() {
    if (index < text.length) {
      const char = text.charAt(index);
      currentText += char;
      
      // Update text (preserve cursor)
      if (cursor && cursorEl) {
        element.insertBefore(document.createTextNode(char), cursorEl);
      } else {
        element.textContent = currentText;
      }
      
      index++;
      
      // Calculate delay with humanization
      let delay = speed;
      if (humanize) {
        // Add randomness
        delay = speed + (Math.random() - 0.5) * speed * 0.5;
        
        // Pause longer on punctuation
        if ('.!?'.includes(char)) {
          delay += speed * 3;
        } else if (',;'.includes(char)) {
          delay += speed * 1.5;
        }
        
        // Occasional "thinking" pauses
        if (Math.random() < 0.05) {
          delay += speed * 2;
        }
      }
      
      setTimeout(type, delay);
    } else {
      // Typing complete
      if (onComplete) {
        onComplete();
      }
    }
  }

  // Start typing
  type();
}

export function typeCommand(
  element: HTMLElement,
  command: string,
  options: TypeOptions = {}
): void {
  const prompt = document.createElement('span');
  prompt.className = 'terminal-prompt';
  prompt.textContent = '[~/portfolio] $ ';
  element.appendChild(prompt);
  
  const commandSpan = document.createElement('span');
  commandSpan.className = 'terminal-command';
  element.appendChild(commandSpan);
  
  typeWriter(commandSpan, command, {
    ...options,
    onComplete: () => {
      // Add output after command
      const output = document.createElement('div');
      output.className = 'terminal-output';
      element.appendChild(output);
      
      if (options.onComplete) {
        options.onComplete();
      }
    }
  });
}

export function simulateTyping(
  element: HTMLElement,
  lines: string[],
  options: TypeOptions = {}
): void {
  let lineIndex = 0;
  
  function typeNextLine() {
    if (lineIndex < lines.length) {
      const lineEl = document.createElement('div');
      lineEl.className = 'typing-line';
      element.appendChild(lineEl);
      
      typeWriter(lineEl, lines[lineIndex], {
        ...options,
        onComplete: () => {
          lineIndex++;
          setTimeout(typeNextLine, 300);
        }
      });
    } else if (options.onComplete) {
      options.onComplete();
    }
  }
  
  typeNextLine();
}

export function scrambleText(
  element: HTMLElement,
  finalText: string,
  duration: number = 1.5
): void {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const steps = 20;
  let currentStep = 0;
  
  const interval = (duration * 1000) / steps;
  
  const scramble = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;
    
    let displayText = '';
    for (let i = 0; i < finalText.length; i++) {
      if (finalText[i] === ' ') {
        displayText += ' ';
      } else if (i < finalText.length * progress) {
        displayText += finalText[i];
      } else {
        displayText += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    
    element.textContent = displayText;
    
    if (currentStep >= steps) {
      clearInterval(scramble);
      element.textContent = finalText;
    }
  }, interval);
}
