// Main entry point for the recruiter portfolio.
// All sections are inlined directly in index.html for SEO.
// The only runtime work is rendering the dynamic project list and
// the case-study modal content from data, plus scroll-reveal and
// the contact form.

import { renderWork } from "./projects";
import { renderSkills } from "./skills";
import { initContactForm } from "./contact";
import { renderModal } from "./modal";
import { initReveal } from "./reveal";
import { initNav } from "./nav";

function bootstrap(): void {
  renderWork();
  renderSkills();
  renderModal();
  initNav();
  initReveal();
  initContactForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
