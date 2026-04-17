interface Project {
  id: string;
  name: string;
  date: string;
  description: string;
  tags: string[];
  links: {
    github?: string;
  };
}

export async function renderProjects(): Promise<void> {
  const container = document.getElementById('projects-container');
  if (!container) return;

  try {
    const response = await fetch('/data/projects.json');
    if (!response.ok) {
      throw new Error(`Failed to load projects: ${response.status}`);
    }

    const projects: Project[] = await response.json();
    
    container.innerHTML = projects.map((project, index) => `
      <div class="project-card reveal reveal-delay-${(index % 2) + 1}">
        <div class="project-card-header">
          <div class="project-name">${project.name}</div>
          <div class="project-links">
            ${project.links.github ? `
              <a href="${project.links.github}" target="_blank" title="GitHub">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
            ` : ''}
          </div>
        </div>
        <div class="project-date">${project.date}</div>
        <p class="project-desc">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `).join('');

  } catch (error) {
    console.error('Error rendering projects:', error);
    container.innerHTML = '<p>Error loading projects. Please try again later.</p>';
  }
}
