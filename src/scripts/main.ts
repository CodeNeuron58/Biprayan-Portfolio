// Main entry point for the recruiter portfolio.
// Hero, About, Contact, and Footer are inlined directly in index.html
// for SEO; only Work, Capabilities, Skills, Experience, Nav, and Modal
// are fetched and rendered at runtime.

import { renderNav } from "./nav";
import { renderWork } from "./projects";
import { renderSkills } from "./skills";
import { initContactForm } from "./contact";
import { renderModal } from "./modal";
import { initReveal } from "./reveal";

async function loadComponent(id: string, path: string): Promise<void> {
  const res = await fetch(path, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  const html = await res.text();
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

async function loadAll(): Promise<void> {
  await Promise.all([
    loadComponent("nav-root", "/src/components/navbar.html").then(renderNav),
    loadComponent("work-root", "/src/components/work.html").then(renderWork),
    loadComponent("capabilities-root", "/src/components/capabilities.html"),
    loadComponent("skills-root", "/src/components/skills.html").then(renderSkills),
    loadComponent("experience-root", "/src/components/experience.html"),
    loadComponent("modal-root", "/src/components/modal.html").then(renderModal),
  ]);
  initReveal();
  initContactForm();
}

loadAll().catch((err) => {
  console.error("[portfolio] failed to bootstrap:", err);
});
