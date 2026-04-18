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
      
      return `
        <div class="skill-bento-card ${spanClass} reveal reveal-delay-${delayClass}">
          <div class="skill-bento-label">
            <span>"</span>${category.name}<span>"</span>: [
          </div>
          <div class="skill-bento-tags">
            ${category.skills.map(skill => `<span class="skill-bento-tag">${skill}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');

  } catch (error) {
    console.error('Error rendering skills:', error);
    container.innerHTML = '<p>Error loading skills. Please try again later.</p>';
  }
}
