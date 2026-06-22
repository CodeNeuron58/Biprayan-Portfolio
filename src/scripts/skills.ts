// Renders the skills grid from skills.json.

import skillsData from "../data/skills.json";

interface SkillCategory {
  name: string;
  skills: string[];
}

const categories = (skillsData as { categories: SkillCategory[] }).categories;

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );

export function renderSkills(): void {
  const list = document.getElementById("skills-list");
  if (!list) return;

  list.innerHTML = categories
    .map((c, i) => {
      const count = c.skills.length;
      return `
        <article class="skill reveal" role="listitem" data-delay="${(i % 4) + 1}">
          <div class="skill__head">
            <span class="skill__name">${escapeHtml(c.name)}</span>
            <span class="skill__count">${count}</span>
          </div>
          <div class="skill__items">
            ${c.skills.map((s) => `<span class="chip">${escapeHtml(s)}</span>`).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}
