export function initContactForm(): void {
  // Make handleSubmit available globally
  (window as any).handleSubmit = handleSubmit;
}

function handleSubmit(): void {
  const nameInput = document.getElementById('name') as HTMLInputElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const messageInput = document.getElementById('message') as HTMLTextAreaElement;

  if (!nameInput || !emailInput || !messageInput) {
    console.error('Form elements not found');
    return;
  }

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  const mailto = `mailto:biprayanc@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}`;
  
  window.location.href = mailto;
}
