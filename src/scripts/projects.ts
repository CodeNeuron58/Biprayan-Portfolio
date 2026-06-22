// Renders the selected-work list and wires the case-study modal.

import projectsData from "../data/projects.json";
import { openCaseStudy } from "./modal";

interface ProjectDetails {
  problem_statement: string;
  diagram_url?: string;
  detailed_stack: string[];
}

interface Project {
  id: string;
  name: string;
  date: string;
  description: string;
  tags: string[];
  links: { github?: string; live?: string };
  details?: ProjectDetails;
}

const projects = projectsData as Project[];

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );

export function renderWork(): void {
  const list = document.getElementById("work-list");
  if (!list) return;

  list.innerHTML = projects
    .map((p, i) => {
      const index = String(i + 1).padStart(2, "0");
      const link = p.links?.github
        ? `<a href="${escapeHtml(p.links.github)}" target="_blank" rel="noopener">GitHub &rarr;</a>`
        : "&mdash;";
      return `
        <article class="work__row reveal" role="listitem" data-delay="${(i % 4) + 1}">
          <div class="work__row-inner">
            <span class="work__index">${index} &middot; Project</span>
            <h3 class="work__name">
              <button type="button" data-case="${escapeHtml(p.id)}" class="work__open" style="all:unset; cursor:pointer;">
                ${escapeHtml(p.name)}
              </button>
            </h3>
          </div>
          <p class="work__summary">${escapeHtml(p.description)}</p>
          <div class="work__chips">
            ${p.tags.map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("")}
          </div>
          <div class="work__meta">
            <span>${escapeHtml(p.date)}</span>
            <span>${link}</span>
          </div>
        </article>
      `;
    })
    .join("");

  list.querySelectorAll<HTMLButtonElement>(".work__open").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-case");
      if (id) openCaseStudy(id);
    });
  });
}
