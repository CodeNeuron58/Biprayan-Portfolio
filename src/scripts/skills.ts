interface SkillCategory {
  name: string;
  skills: string[];
}

interface SkillsData {
  categories: SkillCategory[];
}

export async function renderSkills(): Promise<void> {
  const container = document.getElementById('skills-container');
  if (!container) return;

  try {
    const response = await fetch('/data/skills.json');
    if (!response.ok) {
      throw new Error(`Failed to load skills: ${response.status}`);
    }

    const data: SkillsData = await response.json();
    
    container.innerHTML = data.categories.map((category, index) => `
      <div class="reveal reveal-delay-${(index % 2) + 1}">
        <div class="skill-group-label"><span>"</span>${category.name}<span>"</span>: [</div>
        <div class="skill-tags">
          ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
      </div>
    `).join('');

  } catch (error) {
    console.error('Error rendering skills:', error);
    container.innerHTML = '<p>Error loading skills. Please try again later.</p>';
  }
}
