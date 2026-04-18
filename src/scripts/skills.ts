interface SkillCategory {
  name: string;
  skills: string[];
}

interface SkillsData {
  categories: SkillCategory[];
}

import skillsData from '../data/skills.json';

export async function renderSkills(): Promise<void> {
  const container = document.getElementById('skills-container');
  if (!container) return;

  try {
    const data: SkillsData = skillsData;
    
    container.innerHTML = data.categories.map((category, index) => {
      // Make the first category (Languages) span 2 columns for asymmetrical layout
      const spanClass = index === 0 ? 'bento-span-2-col' : '';
      const delayClass = (index % 4) + 1;
      const packageManager = index % 2 === 0 ? 'pip' : 'npm';
      
      return `
        <div class="skill-package ${spanClass} reveal reveal-delay-${delayClass}">
          <div class="package-header">
            <span class="package-manager">${packageManager}</span>
            <span class="package-name">install ${category.name.toLowerCase().replace(/\s+/g, '-')}</span>
          </div>
          <div class="package-progress">
            <span class="package-status">Installing...</span>
            <div class="package-bar">
              <div class="package-fill" style="width: 0%"></div>
            </div>
          </div>
          <div class="package-skills">
            ${category.skills.map((skill, i) => `
              <span class="skill-package-item" style="animation-delay: ${i * 0.1}s">
                <span class="skill-check">✓</span>
                <span class="skill-name">${skill}</span>
              </span>
            `).join('')}
          </div>
          <div class="package-success">Successfully installed ${category.skills.length} packages</div>
        </div>
      `;
    }).join('');

    // Animate package installation
    setTimeout(() => {
      const fills = container.querySelectorAll('.package-fill');
      fills.forEach((fill, i) => {
        setTimeout(() => {
          (fill as HTMLElement).style.width = '100%';
        }, i * 200);
      });
    }, 500);

  } catch (error) {
    console.error('Error rendering skills:', error);
    container.innerHTML = '<p>Error loading skills. Please try again later.</p>';
  }
}
