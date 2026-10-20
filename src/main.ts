// Scroll-driven stage. Every layer's opacity/transform is a pure function of `s`:
// how many viewport heights the visitor has scrolled. Timings are the design's.
// Only runs in stage mode; in flow mode the page is a plain document.

const STAGE_QUERY = '(min-width: 900px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)';

const STARTS = [0, 1.5, 3.5, 5.5, 9.5, 11.5, 13, 15]; // where each nav section begins
const TARGETS = [0, 2.6, 4.8, 5.5, 10.8, 12.3, 14.4, 16.5]; // where a nav click lands
const STOPS = [0, 2.6, 4.8, 5.5, 6.5, 7.5, 8.5, 10.8, 12.3, 14.4, 16.5]; // arrow-key stops
const END = 16.5;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const seg = (v: number, a: number, b: number) => clamp((v - a) / (b - a));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

const doc = document.documentElement;
const one = (sel: string, root: ParentNode = document) => root.querySelector(sel) as HTMLElement;
const all = (sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<HTMLElement>(sel));

function createStage() {
  const root = one('[data-k="root"]');
  const k = (name: string) => one(`[data-k="${name}"]`, root);
  const layer = (name: string) => one(`[data-layer="${name}"]`, root);

  const el = {
    l1: k('l1'), l2: k('l2'), sub: k('sub'), intro: layer('intro'),
    ethos: layer('ethos'), ethosText: k('ethosText'),
    award: layer('award'), awLine: k('awLine'), chars: all('[data-ch]', root), aw: all('[data-aw]', root),
    work: layer('work'),
    projects: all('[data-proj]', root).map((p) => ({ p, img: one('[data-k="pimg"]', p), tx: one('[data-k="ptext"]', p) })),
    more: layer('more'), rows: all('[data-more]', root),
    stack: layer('stack'), row1: k('row1'), row2: k('row2'),
    about: layer('about'), aboutRows: all('[data-row]', root),
    circle: k('circle'), cinner: k('cinner'),
    nav: all('[data-nav]', root), bar: k('bar'), pct: k('pct'),
  };

  // Every element we write inline styles to, so leaving stage mode can wipe them.
  const touched = new Set<HTMLElement>();
  const css = (node: HTMLElement) => (touched.add(node), node.style);
  const show = (node: HTMLElement, o: number, y = 0) => {
    const s = css(node);
    s.opacity = String(o);
    s.visibility = o < 0.002 ? 'hidden' : 'visible';
    s.transform = `translate3d(0,${y}px,0)`;
  };

  let s = 0;
  let raf = 0;

  const update = () => {
    raf = 0;
    s = Math.max(0, -root.getBoundingClientRect().top) / window.innerHeight;

    // 01 Intro: the two name lines slide apart.
    const ti = ease(seg(s, 0, 1.4));
    css(el.l1).transform = `translate3d(${-ti * 60}vw,0,0)`;
    css(el.l2).transform = `translate3d(${ti * 60}vw,0,0)`;
    css(el.sub).opacity = String(1 - seg(s, 0, 0.4));
    show(el.intro, 1 - seg(s, 1.0, 1.45));

    // 02 Summary: text fills from grey to black as you scroll.
    const ein = ease(seg(s, 1.2, 1.6)), eout = seg(s, 3.2, 3.5);
    show(el.ethos, ein * (1 - eout), (1 - ein) * 60 - eout * 60);
    const f = seg(s, 1.6, 3.1) * 112 - 6;
    css(el.ethosText).backgroundImage = `linear-gradient(to bottom,#000 ${f - 5}%,#d6d6d6 ${f + 5}%)`;

    // 03 Award
    const awin = ease(seg(s, 3.2, 3.5)), awout = seg(s, 5.2, 5.5);
    show(el.award, awin * (1 - awout), (1 - awin) * 30 - awout * 60);
    css(el.awLine).transform = `scaleX(${ease(seg(s, 3.25, 3.75))})`;
    el.chars.forEach((ch, i) => {
      const rv = ease(seg(s, 3.45 + i * 0.07, 3.95 + i * 0.07));
      css(ch).transform = `translate3d(0,${(1 - rv) * 105}%,0)`;
    });
    el.aw.forEach((node, i) => {
      const rv = ease(seg(s, 3.9 + i * 0.15, 4.35 + i * 0.15));
      if (i === 2) {
        css(node).clipPath = `inset(0 ${(1 - rv) * 100}% 0 0)`;
        const img = node.firstElementChild as HTMLElement | null;
        if (img) css(img).transform = `scale(${1.08 - 0.08 * seg(s, 4.2, 5.5)})`;
      } else {
        css(node).opacity = String(rv);
        css(node).transform = `translate3d(0,${(1 - rv) * 24}px,0)`;
      }
    });

    // 04 Work: each project wipes up over the previous one.
    const win = seg(s, 5.2, 5.5), wout = seg(s, 9.4, 9.7);
    show(el.work, (win > 0.001 ? 1 : 0) * (1 - wout), -wout * 60);
    const u = s - 5.5;
    el.projects.forEach(({ p, img, tx }, i) => {
      const rv = i === 0 ? ease(win) : ease(seg(u, i - 0.7, i));
      const ps = css(p);
      ps.clipPath = `inset(${(1 - rv) * 100}% 0 0 0)`;
      ps.visibility = rv < 0.002 ? 'hidden' : 'visible';
      const drift = seg(u, i, i + 1);
      css(img).transform = `translate3d(0,${(1 - rv) * 120 - drift * 30}px,0) scale(${1.08 - 0.08 * rv})`;
      const ts = css(tx);
      ts.transform = `translate3d(0,${(1 - rv) * 80}px,0)`;
      ts.opacity = String(0.2 + 0.8 * rv);
    });

    // 05 More work
    const min = ease(seg(s, 9.4, 9.8)), mout = seg(s, 11.4, 11.7);
    show(el.more, min * (1 - mout), (1 - min) * 60 - mout * 60);
    el.rows.forEach((row, i) => {
      const rv = ease(seg(s, 9.7 + i * 0.18, 10.05 + i * 0.18));
      const rs = css(row);
      rs.opacity = String(rv);
      rs.transform = `translate3d(${(1 - rv) * 80}px,0,0)`;
    });

    // 06 Skills: two marquee rows slide in opposite directions.
    const sin = ease(seg(s, 11.3, 11.7)), sout = seg(s, 12.9, 13.2);
    show(el.stack, sin * (1 - sout), (1 - sin) * 60 - sout * 60);
    const ts = seg(s, 11.3, 13.2);
    css(el.row1).transform = `translate3d(${-ts * 45}%,0,0)`;
    css(el.row2).transform = `translate3d(${-45 + ts * 45}%,0,0)`;

    // 07 Open source + Education
    const ain = ease(seg(s, 12.9, 13.3)), aout = seg(s, 14.9, 15.2);
    show(el.about, ain * (1 - aout), (1 - ain) * 60 - aout * 60);
    el.aboutRows.forEach((row, i) => {
      const rv = ease(seg(s, 13.2 + i * 0.35, 13.7 + i * 0.35));
      const rs = css(row);
      rs.opacity = String(rv);
      rs.transform = `translate3d(0,${(1 - rv) * 40}px,0)`;
    });

    // 08 Contact: a black circle opens over everything.
    css(el.circle).clipPath = `circle(${ease(seg(s, 15, 16)) * 85}% at 50% 60%)`;
    const ci = ease(seg(s, 15.5, 16.2));
    css(el.cinner).opacity = String(ci);
    css(el.cinner).transform = `translate3d(0,${(1 - ci) * 60}px,0)`;

    // HUD
    let active = 0;
    STARTS.forEach((start, i) => { if (s >= start - 0.3) active = i; });
    const narrow = window.innerWidth < 1200;
    el.nav.forEach((n, i) => {
      const on = i === active;
      css(n).opacity = on ? '1' : '0.4';
      const lbl = n.querySelector<HTMLElement>('[data-lbl]');
      if (lbl) css(lbl).display = !narrow || on ? 'inline' : 'none';
    });
    const pct = clamp(s / END);
    css(el.bar).transform = `scaleX(${pct})`;
    el.pct.textContent = String(Math.round(pct * 100)).padStart(3, '0');
  };

  const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };

  const go = (target: number, smooth = true) => {
    const top = root.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + target * window.innerHeight, behavior: smooth ? 'smooth' : 'auto' });
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    const i = e.key === 'ArrowDown'
      ? STOPS.findIndex((p) => p > s + 0.05)
      : STOPS.map((p) => p < s - 0.05).lastIndexOf(true);
    if (i >= 0) go(STOPS[i]);
  };

  // Nav links are real #anchors (they work in flow mode and without JS);
  // in stage mode they jump to that section's spot on the timeline instead.
  const onClick = (e: MouseEvent) => {
    const link = (e.target as Element).closest<HTMLElement>('[data-nav], [data-nav-jump]');
    if (!link) return;
    e.preventDefault();
    go(TARGETS[Number(link.dataset.nav ?? link.dataset.navJump)]);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('keydown', onKey);
  root.addEventListener('click', onClick);
  update();

  // Deep link (e.g. /#work): land on that section's spot on the timeline.
  const hashIndex = el.nav.findIndex((n) => n.getAttribute('href') === location.hash);
  if (hashIndex > 0) go(TARGETS[hashIndex], false);

  return () => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    window.removeEventListener('keydown', onKey);
    root.removeEventListener('click', onClick);
    if (raf) cancelAnimationFrame(raf);
    touched.forEach((node) => node.removeAttribute('style'));
  };
}

// IST clock in the HUD.
const clock = one('[data-k="clock"]');
const tick = () => {
  clock.textContent = new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata',
  });
};
tick();
setInterval(tick, 15000);

// Switch between stage and flow as the window crosses the breakpoint.
const mq = window.matchMedia(STAGE_QUERY);
let teardown: (() => void) | null = null;
const applyMode = () => {
  doc.classList.toggle('stage-mode', mq.matches);
  if (mq.matches && !teardown) teardown = createStage();
  else if (!mq.matches && teardown) { teardown(); teardown = null; }
};
mq.addEventListener('change', applyMode);
applyMode();
doc.classList.add('js-ready');
