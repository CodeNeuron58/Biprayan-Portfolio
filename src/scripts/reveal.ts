// Scroll-driven reveal animation. Adds `.is-visible` to elements with
// `.reveal` when they enter the viewport.

export function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>(".reveal");
  if (targets.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => io.observe(el));
}
