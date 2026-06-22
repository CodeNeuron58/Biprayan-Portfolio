// Nav: scroll-aware styling, mobile menu, and active-section indicator.

export function initNav(): void {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("nav-burger");
  const mobileMenu = document.getElementById("mobile-menu");
  if (!nav || !burger || !mobileMenu) return;

  const onScroll = (): void => {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open: boolean): void => {
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  };

  burger.addEventListener("click", () => {
    const open = !mobileMenu.classList.contains("is-open");
    setMenu(open);
  });

  // Close on link click
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setMenu(false));
  });

  // Close on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
      setMenu(false);
    }
  });
}
