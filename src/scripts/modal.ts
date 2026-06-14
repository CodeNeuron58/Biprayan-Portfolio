// Case-study modal: rendered into #modal-root by main.ts. Provides
// openCaseStudy(id) to display a project's problem + tech stack.

import projectsData from "../data/projects.json";

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

let triggerEl: HTMLElement | null = null;

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );

export function renderModal(): void {
  const close = document.getElementById("case-modal-close");
  if (close) close.addEventListener("click", closeCaseStudy);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCaseStudy();
  });

  const modal = document.getElementById("case-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeCaseStudy();
    });
  }
}

function openModal(): void {
  const modal = document.getElementById("case-modal");
  if (!modal) return;
  triggerEl = document.activeElement as HTMLElement | null;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  // Focus the close button for keyboard users
  requestAnimationFrame(() => {
    const close = document.getElementById("case-modal-close");
    close?.focus();
  });
}

export function closeCaseStudy(): void {
  const modal = document.getElementById("case-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  triggerEl?.focus();
}

export function openCaseStudy(id: string): void {
  const project = projects.find((p) => p.id === id);
  if (!project) return;
  const body = document.getElementById("case-modal-body");
  if (!body) return;

  const stack = project.details?.detailed_stack ?? project.tags;
  const problem = project.details?.problem_statement ?? project.description;
  const github = project.links?.github
    ? `<a class="btn btn--ghost" href="${escapeHtml(project.links.github)}" target="_blank" rel="noopener"><span>View source</span><span class="arrow" aria-hidden="true">&rarr;</span></a>`
    : "";

  body.innerHTML = `
    <div class="modal__head">
      <span class="modal__meta">Case study &middot; ${escapeHtml(project.date)}</span>
      <h2 class="modal__title" id="case-modal-title">${escapeHtml(project.name)}</h2>
      <div class="work__chips" style="margin-top: 8px;">
        ${project.tags.map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("")}
      </div>
    </div>
    <div class="modal__block">
      <span class="modal__block-title">Problem</span>
      <p>${escapeHtml(problem)}</p>
    </div>
    <div class="modal__block">
      <span class="modal__block-title">Stack &amp; approach</span>
      <div class="modal__stack">
        ${stack.map((s) => `<span class="chip">${escapeHtml(s)}</span>`).join("")}
      </div>
    </div>
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      ${github}
      <button class="btn btn--ghost" type="button" onclick="document.getElementById('case-modal-close').click()">
        <span>Close</span>
      </button>
    </div>
  `;

  openModal();
}
