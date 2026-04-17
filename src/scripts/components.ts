export async function loadComponents(): Promise<void> {
  const componentMap = {
    'navbar-component': '/components/navbar.html',
    'hero-component': '/components/hero.html',
    'about-component': '/components/about.html',
    'projects-component': '/components/projects.html',
    'skills-component': '/components/skills.html',
    'contact-component': '/components/contact.html',
    'footer-component': '/components/footer.html'
  };

  for (const [elementId, componentPath] of Object.entries(componentMap)) {
    const element = document.getElementById(elementId);
    if (element) {
      try {
        const response = await fetch(componentPath);
        if (response.ok) {
          const html = await response.text();
          element.innerHTML = html;
        } else {
          console.error(`Failed to load component ${componentPath}: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
      }
    }
  }
}
