import navbarHtml from '../components/navbar.html?raw';
import heroHtml from '../components/hero.html?raw';
import aboutHtml from '../components/about.html?raw';
import projectsHtml from '../components/projects.html?raw';
import skillsHtml from '../components/skills.html?raw';
import contactHtml from '../components/contact.html?raw';
import footerHtml from '../components/footer.html?raw';

export async function loadComponents(): Promise<void> {
  const componentMap: Record<string, string> = {
    'navbar-component': navbarHtml,
    'hero-component': heroHtml,
    'about-component': aboutHtml,
    'projects-component': projectsHtml,
    'skills-component': skillsHtml,
    'contact-component': contactHtml,
    'footer-component': footerHtml
  };

  for (const [elementId, html] of Object.entries(componentMap)) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
    }
  }
}
