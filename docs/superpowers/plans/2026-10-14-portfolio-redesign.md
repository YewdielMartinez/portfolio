# Rediseño del portfolio — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sustituir el portfolio actual por el diseño minimalista blanco y negro de la spec `docs/superpowers/specs/2026-10-14-portfolio-redesign-design.md`.

**Architecture:** Componentes Astro estáticos renderizados desde `src/data/*.ts`; una capa de movimiento en `src/scripts/motion/` (GSAP 3.14 + ScrollTrigger, Flip, SplitText, CustomEase) cargada una vez desde `src/scripts/main.ts`. La lógica numérica (resortes, inercia, mapeos, rotaciones de pilas, rutas i18n) vive en módulos puros sin dependencias, probados con `node --test` (Node 24 ejecuta TypeScript de forma nativa).

**Tech Stack:** Astro 6, Tailwind 4 (`@tailwindcss/vite`), GSAP 3.14.2, `@emailjs/browser`, `astro:assets`.

**Ejecución:** inline en la sesión que escribió la spec (el autor ya tiene el contexto de REA). Por eso los componentes de UI se describen con estructura, clases y parámetros exactos, y el código completo se escribe al ejecutar cada tarea; los módulos puros llevan aquí su código y sus pruebas.

---

## Mapa de archivos

Crear:

| Archivo | Responsabilidad |
|---|---|
| `src/scripts/motion/spring.ts` + `.test.ts` | Resorte de Spencer por eje, normalizado por `dt` |
| `src/scripts/motion/math.ts` + `.test.ts` | `lerp`, `damp`, `mapRange`, `wrap`, `clamp` |
| `src/scripts/motion/carousel-math.ts` + `.test.ts` | Posición de slide en bucle, objetivo de snap, velocidad para alcanzarlo |
| `src/lib/pile-math.ts` + `.test.ts` | Rotaciones/offsets deterministas de las pilas (se usa en build) |
| `src/scripts/i18n-resolve.ts` + `.test.ts` | Resolver `a.b.0.c` en un objeto |
| `src/scripts/i18n.ts` | Aplicar idioma al DOM, eventos `languagewillchange`/`languagechange`, fechas |
| `src/scripts/main.ts` | Arranque: i18n → plugins → fuentes → módulos → `motion-ready` |
| `src/scripts/motion/core.ts` | Registro de plugins, eases `signature`/`flowSoft`, `reduced()`, `entrances()` |
| `src/scripts/motion/loop.ts` | Suscriptores en `gsap.ticker`, `whileVisible` |
| `src/scripts/motion/pointer.ts` | Posición y movimiento acumulado del puntero |
| `src/scripts/motion/words.ts` | SplitText palabras/letras, entrada elástica, re-división por idioma |
| `src/scripts/motion/fit-text.ts` | Ajustar `Portfolio` y `Contacto` al ancho |
| `src/scripts/motion/flow.ts` | flowIn Stepbro y entradas `[data-flow]` al hacer scroll |
| `src/scripts/motion/hero-cards.ts` | Cards de portada: resortes, empuje, entrada |
| `src/scripts/motion/carousel.ts` | Carrusel curvo con inercia |
| `src/scripts/motion/piles.ts` | `data-inview` de pilas |
| `src/scripts/motion/morph-dialog.ts` | Morph Stepbro origen ↔ diálogo |
| `src/scripts/motion/footer-stretch.ts` | Footer revelado que se estira |
| `src/scripts/motion/section-label.ts` | Visibilidad del header y etiqueta de sección |
| `src/scripts/ui/project-dialog.ts` | Rellena y abre el diálogo de proyecto |
| `src/scripts/ui/section-menu.ts` | Menú de secciones |
| `src/scripts/ui/settings.ts` | Selector radial: tema e idioma |
| `src/scripts/ui/contact-form.ts` | Envío EmailJS y estados |
| `src/lib/images.ts` | Resolver capturas por nombre (`import.meta.glob`) |
| `src/components/ProjectImage.astro` | `<Image>` WebP para una captura |
| `src/components/SheetTitle.astro` | Titular de lámina en dos líneas con `data-words` |
| `src/components/Header.astro`, `Cover.astro`, `Services.astro`, `Tools.astro`, `ProjectDialog.astro`, `SectionMenu.astro`, `Settings.astro` | Secciones nuevas |
| `src/styles/motion.css` | Curvas elásticas y estados iniciales bajo `.js` |

Reescribir: `src/layouts/Layout.astro`, `src/pages/index.astro`, `src/styles/global.css`, `src/components/{About,Experience,Work,Contact,Footer}.astro`, `src/data/translations.ts`, `src/data/skills.ts`.

Modificar: `src/data/projects.ts` (añadir `images` a Kayro), `astro.config.mjs`, `tsconfig.json`, `package.json`, `.gitignore`.

Eliminar: `src/components/{Navbar,SectionNav,Quiz,BehindTheCode,Hero}.astro`, `src/components/SkillIcon.tsx`, `src/data/{games,movies,photos,quiz}.ts`, `public/photos/`. Mover `public/projects/*` → `src/assets/projects/`. Copiar `public/avatar.jpg` → `src/assets/avatar.jpg` (el de `public` se queda para la imagen OG).

---

### Task 1: Rama, dependencias y script de pruebas

**Files:** `.gitignore`, `package.json`, `astro.config.mjs`, `tsconfig.json`

- [ ] Crear rama: `git switch -c redesign/minimal-bw`
- [ ] Añadir `Stepbro - Kit de replicacion/` a `.gitignore`.
- [ ] `npm uninstall @astrojs/react react react-dom react-icons @types/react @types/react-dom`
- [ ] Quitar `react()` y su import de `astro.config.mjs`; quitar `jsx`/`jsxImportSource` de `tsconfig.json`.
- [ ] Añadir a `package.json`: `"test": "node --test \"src/**/*.test.ts\""`.
- [ ] Commit `chore: drop React, ignore replication kit, add node test script`.

(El build queda roto hasta la Task 5 porque `SkillIcon.tsx` y `skills.ts` importan `react-icons`; se corrige al borrar/reescribir esos archivos.)

### Task 2: Módulos puros con pruebas

**Files:** crear `src/scripts/motion/{spring,math,carousel-math}.ts`, `src/lib/pile-math.ts`, `src/scripts/i18n-resolve.ts` y sus `.test.ts`.

- [ ] **Escribir las pruebas primero.**

`src/scripts/motion/spring.test.ts`:
```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSpring } from './spring.ts';

test('converges to target', () => {
  const s = createSpring();
  s.target.x = 100; s.target.y = -50;
  for (let i = 0; i < 600; i++) s.update(1);
  assert.ok(Math.abs(s.current.x - 100) < 0.05);
  assert.ok(Math.abs(s.current.y + 50) < 0.05);
});

test('matches Spencer first steps at dt=1 (stiffness .05, friction .8)', () => {
  const s = createSpring(0.05, 0.8);
  s.target.x = 100;
  s.update(1); assert.equal(s.current.x, 5);      // v = 0*.8 + 100*.05
  s.update(1); assert.equal(s.current.x, 13.75);  // v = 5*.8 + 95*.05 = 8.75
});

test('stays stable with large dt', () => {
  const s = createSpring();
  s.target.x = 100;
  for (let i = 0; i < 300; i++) s.update(3);
  assert.ok(Number.isFinite(s.current.x));
  assert.ok(Math.abs(s.current.x - 100) < 1);
});
```

`src/scripts/motion/math.test.ts`:
```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clamp, damp, lerp, mapRange, wrap } from './math.ts';

test('lerp', () => assert.equal(lerp(0, 10, 0.25), 2.5));
test('clamp', () => { assert.equal(clamp(5, 0, 1), 1); assert.equal(clamp(-1, 0, 1), 0); });
test('wrap handles negatives', () => { assert.equal(wrap(-1, 10), 9); assert.equal(wrap(23, 10), 3); });
test('mapRange unclamped and clamped', () => {
  assert.equal(mapRange(5, 0, 10, 0, 1), 0.5);
  assert.equal(mapRange(20, 0, 10, 0, 1), 2);
  assert.equal(mapRange(20, 0, 10, 0, 1, true), 1);
});
test('damp moves toward target, frame-rate independent', () => {
  const one = damp(0, 100, 0.9, 2);
  const two = damp(damp(0, 100, 0.9, 1), 100, 0.9, 1);
  assert.ok(Math.abs(one - two) < 1e-9);
  assert.ok(one > 0 && one < 100);
});
```

`src/scripts/motion/carousel-math.test.ts`:
```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FRICTION, restingOffset, slideX, snapOffset, velocityFor } from './carousel-math.ts';

test('slideX wraps slides into [-step, length - step)', () => {
  // 5 slides, step 100 → length 500
  assert.equal(slideX(0, 0, 100, 500), 0);
  assert.equal(slideX(0, 150, 100, 500), 350);   // slid off the left, reappears at the right
  assert.equal(slideX(4, -100, 100, 500), 0);     // 400 + 100 + 100 = 600 → wraps to 100, minus step
});

test('restingOffset projects geometric decay', () => {
  // offset -= v each frame with v *= f → total = v * f / (1 - f)
  assert.ok(Math.abs(restingOffset(0, 10, 0.85) - (-10 * 0.85 / 0.15)) < 1e-9);
});

test('velocityFor reaches the target exactly in the limit', () => {
  const v = velocityFor(300, 0, FRICTION);
  assert.ok(Math.abs(restingOffset(0, v, FRICTION) - 300) < 1e-9);
});

test('snapOffset rounds the projected rest to the nearest centred slide', () => {
  // step 100, centre padding 50 → slide k centred when offset = k*100 - 50
  assert.equal(snapOffset(-40, 0, 100, 50, FRICTION), -50);
  assert.equal(snapOffset(40, 0, 100, 50, FRICTION), 50);
  assert.equal(snapOffset(-50, 0, 100, 50, FRICTION, 1), 50); // forced step to next slide
});
```

`src/lib/pile-math.test.ts`:
```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pileLayers } from './pile-math.ts';

test('is deterministic per seed', () => {
  assert.deepEqual(pileLayers(3, 7), pileLayers(3, 7));
});
test('values stay inside Spencer ranges', () => {
  for (let seed = 0; seed < 50; seed++) {
    const layers = pileLayers(3, seed);
    layers.forEach((l, i) => {
      assert.ok(Math.abs(l.rotation) >= 2 && Math.abs(l.rotation) <= 5);
      assert.ok(Math.abs(l.offsetX) >= 4 && Math.abs(l.offsetX) <= 10);
      assert.equal(l.offsetY, (layers.length - i) * 5);
    });
  }
});
test('rotation sign alternates by layer', () => {
  const [a, b] = pileLayers(2, 1);
  assert.ok(Math.sign(a.rotation) !== Math.sign(b.rotation));
});
```

`src/scripts/i18n-resolve.test.ts`:
```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolvePath } from './i18n-resolve.ts';

const dict = { a: { b: 'x' }, list: [{ title: 'Kayro' }], n: 3 };
test('object path', () => assert.equal(resolvePath(dict, 'a.b'), 'x'));
test('array index', () => assert.equal(resolvePath(dict, 'list.0.title'), 'Kayro'));
test('numbers become strings', () => assert.equal(resolvePath(dict, 'n'), '3'));
test('missing → undefined', () => assert.equal(resolvePath(dict, 'a.c.d'), undefined));
test('objects are not text', () => assert.equal(resolvePath(dict, 'a'), undefined));
```

- [ ] Ejecutar `npm test` → FAIL (módulos inexistentes).
- [ ] **Implementar.**

`src/scripts/motion/spring.ts`:
```ts
export interface Vec { x: number; y: number }
export interface Spring {
  current: Vec;
  target: Vec;
  velocity: Vec;
  update(dt?: number): void;
}

/** Spencer Gabor's spring (stiffness .05, friction .8), normalised so dt = 1 is one 60 Hz frame. */
export function createSpring(stiffness = 0.05, friction = 0.8): Spring {
  const current = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  const velocity = { x: 0, y: 0 };
  function update(dt = 1) {
    const decay = Math.pow(friction, dt);
    for (const axis of ['x', 'y'] as const) {
      velocity[axis] = velocity[axis] * decay + (target[axis] - current[axis]) * stiffness * dt;
      current[axis] = Math.round((current[axis] + velocity[axis] * dt) * 100) / 100;
    }
  }
  return { current, target, velocity, update };
}
```
(Comprobación del segundo paso: `v = 5·.8 + 95·.05 = 8.75`, `x = 13.75`.)

`src/scripts/motion/math.ts`:
```ts
export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b;
/** Spencer's frame-rate independent smoothing: lerp by 1 - e^(-lambda·dt). */
export const damp = (a: number, b: number, lambda: number, dt: number) => lerp(a, b, 1 - Math.exp(-lambda * dt));
export const wrap = (v: number, length: number) => ((v % length) + length) % length;
export function mapRange(v: number, inMin: number, inMax: number, outMin: number, outMax: number, clamped = false) {
  const t = (v - inMin) / (inMax - inMin);
  return lerp(outMin, outMax, clamped ? clamp(t, 0, 1) : t);
}
```

`src/scripts/motion/carousel-math.ts`:
```ts
import { wrap } from './math.ts';

export const FRICTION = 0.85;

/** X of slide k relative to the viewport's left edge, wrapped so the track loops. */
export function slideX(k: number, offset: number, step: number, length: number) {
  return wrap(k * step - offset + step, length) - step;
}

/** Where the offset ends if velocity v (px/frame, applied as offset -= v) decays by f each frame. */
export const restingOffset = (offset: number, v: number, f = FRICTION) => offset - (v * f) / (1 - f);

/** Velocity that makes restingOffset(offset, v) === target. */
export const velocityFor = (target: number, offset: number, f = FRICTION) => -((target - offset) * (1 - f)) / f;

/** Offset that centres the slide nearest to the projected rest; `dir` forces ±1 slide from the current one. */
export function snapOffset(offset: number, v: number, step: number, center: number, f = FRICTION, dir = 0) {
  const base = dir === 0 ? restingOffset(offset, v, f) : offset;
  return (Math.round((base + center) / step) + dir) * step - center;
}
```
`src/lib/pile-math.ts`:
```ts
export interface PileLayer { rotation: number; offsetX: number; offsetY: number }

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Spencer's stack transforms, seeded so SSR output is stable. Layer 0 is the back. */
export function pileLayers(count: number, seed: number): PileLayer[] {
  const rand = mulberry32(seed + 1);
  const range = (min: number, max: number) => rand() * (max - min) + min;
  return Array.from({ length: count }, (_, i) => ({
    rotation: range(2, 5) * ((i % 2) * 2 - 1),
    offsetX: range(4, 10) * (rand() < 0.5 ? -1 : 1),
    offsetY: (count - i) * 5,
  }));
}
```

`src/scripts/i18n-resolve.ts`:
```ts
export function resolvePath(source: unknown, path: string): string | undefined {
  let value: unknown = source;
  for (const key of path.split('.')) {
    if (value == null || typeof value !== 'object') return undefined;
    value = (value as Record<string, unknown>)[key];
  }
  return typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;
}
```

- [ ] `npm test` → PASS (todas).
- [ ] Commit `feat(motion): add pure spring, carousel, pile and i18n helpers with tests`.

### Task 3: Datos

**Files:** `src/data/translations.ts`, `src/data/skills.ts`, `src/data/projects.ts`; borrar `src/data/{games,movies,photos,quiz}.ts`.

- [ ] Reescribir `translations.ts` con `Translation` tipada y claves: `nav{home,about,services,tools,experience,work,contact,menu,close}`, `cover{presentedBy,role,location,portfolio}`, `about{hello,name,bio,bio2}`, `services{title1,title2,body,items[6]}`, `tools{title1,title2,outro}`, `experience{title1,title2}`, `work{title1,title2,archive,drag,open}`, `dialog{year,role,features,demo,code,video,close}`, `contact{title1,title2,name,email,message,send,sending,success,error}`, `footer{title,rights}`, `settings{open,themeLight,themeDark,switchLang}`. Textos EN/ES de la spec (bio actual conservada).
- [ ] `skills.ts`: `{ name: string; category: 'frontend' | 'backend' | 'data' | 'tools' }[]` con los mismos 24 nombres; sin `react-icons`.
- [ ] `projects.ts`: `images?: string[]` en la interfaz; Kayro (en/es) `images: ["/projects/Home Kayro.png", "/projects/Sign In Kayro (1).png", "/projects/Register Kayro (2).png"]`.
- [ ] Borrar los cuatro archivos de datos sin uso.

### Task 4: Imágenes

- [ ] `git mv public/projects src/assets/projects`; `cp public/avatar.jpg src/assets/avatar.jpg`; `git rm -r public/photos`.
- [ ] `src/lib/images.ts`: glob perezoso `import.meta.glob<{ default: ImageMetadata }>('/src/assets/projects/*.{png,jpg,jpeg,webp}')`; `loadProjectImage(path?: string)` toma el nombre tras la última `/` y devuelve `ImageMetadata | null`.
- [ ] `ProjectImage.astro`: props `src, alt, widths, sizes, class?, loading?, fetchpriority?`; renderiza `<Image format="webp" draggable="false">` o nada si no hay imagen.

### Task 5: Base visual, layout y esqueleto

- [ ] `global.css`: Tailwind, `@custom-variant dark`, `@font-face` NB International, tokens de la spec en `:root` y `.dark`, `@theme inline` (`--color-bg/fg/muted/line/surface`), base (`body` con `background: var(--bg)`, `font-synthesis: none`, `scrollbar-gutter: stable`), clases `.t-display .t-h2 .t-body .t-label .sr-only .gutter`, `main{position:relative; z-index:1; background:var(--bg)}`.
- [ ] `motion.css`: `--ease-out-elastic`, `--ease-out-elastic-100-30` (valores de la spec); bajo `@media (prefers-reduced-motion: no-preference)` y `.js:not(.motion-failed)`: `[data-words]:not([data-ready]){visibility:hidden}`, `[data-flow]:not([data-ready])>*{opacity:0}`, `[data-hero-card]:not([data-ready]){transform:scale(0)}`, `.pile:not([data-inview]) .pile__media{scale:.7}`, `.pile:not([data-inview]) .pile__shadow{opacity:0}`, `[data-carousel]:not([data-inview]) .carousel__media{scale:.8; translate:0 20%}`.
- [ ] `Layout.astro`: meta/OG/JSON-LD actuales, `theme-color` claro `#ffffff` / oscuro `#0a0a0a`, script inline (clase `js`, tema guardado o `prefers-color-scheme`, `lang` guardado, temporizador de 2 s → `motion-failed`), skip link, `<slot />`, `<script>import '../scripts/main.ts'</script>`.
- [ ] `index.astro`: `Header`, `SectionMenu`, `<main id="main-content">` con `Cover, About, Services, Tools, Experience, Work, Contact`, `ProjectDialog`, phantom + `Footer`, `Settings`.
- [ ] Borrar `Navbar, SectionNav, Quiz, BehindTheCode, Hero, SkillIcon`.
- [ ] `SheetTitle.astro`: props `line1`, `line2` (claves i18n), `muted2 = true`, `level = 2`; `<h2 class="t-h2" data-words>` con `<span class="block" data-i18n>` por línea.

### Task 6: Componentes estáticos

Cada sección: `<section id data-section-label="nav.x" class="gutter">`; textos con `data-i18n` y contenido EN por defecto.

- [ ] `Header.astro`: `fixed top-0 inset-x-0 z-40 flex justify-between gutter py-4 text-white mix-blend-difference`; izquierda enlace `#home` `Yewdiel Medina | Portfolio`; derecha `<button data-menu-trigger aria-haspopup="dialog" aria-expanded="false"><span data-section-label-text>…</span></button>`; `data-visible` controla `opacity/translate/visibility`.
- [ ] `Cover.astro`: grid `min-h-svh` filas `auto 1fr auto auto`; fila superior (`presentedBy`, `<span data-i18n-date>`) con `data-flow`; `[data-hero-cards]` `aria-hidden` con 4 `.hero-card[data-hero-card][style=--i]` → `.hero-card__shadow` + `ProjectImage` (Kayro Home, MedicLife Landing, Watchlt, TRON, `loading="eager"`, `fetchpriority="high"` en la primera); meta (rol | email · ubicación); `<h1><span class="sr-only">Yewdiel Medina — </span><span data-fit data-words="letters" data-i18n="cover.portfolio">Portfolio</span></h1>`. CSS de cards de la spec (`rotate` base −velocidad, `translateY` %, solape −6 %, ancho `clamp(6rem, 22vw, 14rem)` en móvil / `14cqi` en escritorio, radio 1rem, sombra).
- [ ] `About.astro`: grid 12; foto (`src/assets/avatar.jpg`, `grayscale`, `aspect-square`, `rounded-[2.5rem]`, `data-flow`); `SheetTitle` `about.hello`/`about.name` sin gris; dos párrafos `.t-body` en `[data-flow]`.
- [ ] `Services.astro`: `SheetTitle services.title1/title2`, párrafo, lista de 6 `<li><span class="service" data-words>` en grid 3 columnas con desplazamientos (`--dy` −1.2rem en 2 y 5, segunda fila con `margin-left`), hover `scaleY(1.2)` `transform-origin: bottom` 1 s `--ease-out-elastic-100-30`.
- [ ] `Tools.astro`: `SheetTitle tools.title1/title2`; párrafo con los nombres de `skills` separados por coma en `--fg` y `tools.outro` en `--muted`.
- [ ] `Experience.astro`: `SheetTitle experience.title1/title2`; `<ol data-flow>` filas `grid md:grid-cols-12` (periodo 3, empresa+puesto 4, descripción 5), `border-t var(--line)`, textos `data-i18n="experience.i.campo"`.
- [ ] `Work.astro`: `SheetTitle work.title1/title2`; carrusel `<div data-carousel tabindex="0" role="region" aria-roledescription="carousel" aria-label>` con `.carousel__slide` (`<button data-project="i">` → `.carousel__media` `ProjectImage` 16/10 `object-cover object-top rounded-2xl` + título · año) para proyectos con `image`; pista `work.drag`; `h3 work.archive`; grid `.archive` 2/3 columnas de `<button class="pile" data-project="i">` con capas de `pileLayers(n, i)`: Kayro 3 capturas, 1 captura + plato `--surface`, sin captura → card tipográfica (título + etiquetas) + plato; título y año debajo.
- [ ] `ProjectDialog.astro`: `<dialog class="morph" data-project-dialog aria-labelledby="pd-title">` → `.morph__backdrop[data-close]` + `.morph__panel` (`--bg`, `rounded-[2.5rem]`, `max-w-[960px]`, `max-h-[calc(100svh-2*gutter)]`, en `<680px` pantalla completa radio 0) → botón cerrar + `.morph__content` (scroll interno). Un `<template data-project-template="i">` por proyecto: imagen, `h2#pd-title[data-words][tabindex=-1]`, año/rol, descripción, características, etiquetas, enlaces, `<video controls preload="none">` si hay vídeo; todo con `data-i18n="projects.i.campo"`.
- [ ] `SectionMenu.astro`: `<dialog class="morph morph--menu" data-section-menu>` con panel anclado arriba a la derecha (`top/right: gutter`, ancho `min(26rem, 100vw - 2·gutter)`) y enlaces `t-h2` más pequeños a cada sección.
- [ ] `Contact.astro`: `data-public-key/-template-id/-service-id` desde `import.meta.env` como hoy; `SheetTitle contact.title1/title2`; formulario `id="contact-form"` con `name/email/message` (mismos nombres para la plantilla EmailJS), campos subrayados, botón píldora `data-send`, `<p role="status" aria-live="polite" data-form-status>`.
- [ ] `Footer.astro`: `<footer class="site-footer" data-footer>` fijo `bottom-0 h-dvh z-0 bg-fg text-bg flex flex-col justify-end gutter pb-8`; `<p class="footer__title" data-fit data-footer-title data-i18n="footer.title">` con `transform: scaleY(var(--footer-scale,1))` origen abajo y `translate: 0 calc(var(--footer-offset,0)*1px)` en el footer; enlaces email/GitHub/LinkedIn/X con hover `scaleY(1.2)`; `© 2026`. Phantom `<div class="footer-phantom h-dvh pointer-events-none" data-footer-phantom>` justo antes.
- [ ] `Settings.astro`: `fixed bottom/right gutter z-50`; botón toggle 3rem círculo con sombra `aria-expanded`; contenedor de opciones `inert` cuando cerrado; opción tema (iconos sol/luna) y opción idioma (código destino); CSS radial de la spec.
- [ ] `npm run build` → OK (sin JS de movimiento aún la página es estática y legible).
- [ ] Commit `feat: rebuild portfolio markup and visual system`.

### Task 7: Runtime de movimiento base

- [ ] `core.ts`: `gsap.registerPlugin(ScrollTrigger, Flip, SplitText, CustomEase)`; `CustomEase.create('signature', 'M0,0 C0.308,0.19 0.107,0.633 0.288,0.866 0.382,0.987 0.656,1 1,1')`, `CustomEase.create('flowSoft', 'M0,0 C0.25,0.1 0.25,1 1,1')`; `reduced()` con `matchMedia`; `entrances()` = `!reduced() && !html.motion-failed`; `ELASTIC = 'elastic.out(1, 0.45)'`.
- [ ] `loop.ts`: `subscribe(fn)` sobre `gsap.ticker` con `dt = min(deltaMs / (1000/60), 3)`; `whileVisible(el, fn, rootMargin='100px')` con IntersectionObserver; ambos devuelven función de baja.
- [ ] `pointer.ts`: listeners `pointermove`/`pointerleave` en `window` (passive); `pointer.x/y/active`; `takeMovement()` devuelve y reinicia `{mx,my}` acumulados.
- [ ] `fit-text.ts`: para cada `[data-fit]`: medir ancho a `font-size:100px` (`white-space:nowrap`) y fijar `font-size = 100 · ancho_padre / ancho`; `ResizeObserver` en el padre; re-ajuste en `languagechange`.
- [ ] `words.ts`: `initWords()` divide `[data-words]` (`type` `chars` si `="letters"`, si no `words`; `aria: 'auto'`; clase de pieza `w`), fija `scaleY:0, yPercent:25, transformOrigin:'50% 100%'`, marca `data-ready`, crea `ScrollTrigger` `once` `start:'top 85%'` → `revealWords`. `revealWords(el, delay=0)`: `to(pieces, {scaleY:1, yPercent:0, duration:.8, ease:ELASTIC, stagger:.1 (letras .06), delay})`. En `languagewillchange` revierte; en `languagechange` re-divide sin animación (visible). Sin `entrances()`: solo marca `data-ready`.
- [ ] `flow.ts`: `flowIn(targets, {y=20, blur=16, duration=.5, stagger=.05, delay=0})` con `ease:'flowSoft'` y `clearProps`; `initFlows()` para cada `[data-flow]`: `gsap.set(children, {autoAlpha:0})`, `data-ready`, `ScrollTrigger` `once` `top 85%` → `flowIn(children)`.
- [ ] `main.ts` con este orden: `applyI18n` → `initCore` → `await document.fonts.ready` → `initFitText` → `initWords` → `initFlows` → resto de módulos (tareas siguientes) → `html.classList.add('motion-ready')` → `ScrollTrigger.refresh()`.
- [ ] Commit `feat(motion): core runtime, word and flow entrances`.

### Task 8: Cards de portada

- [ ] `hero-cards.ts` `initHeroCards(root)`: por card un `createSpring()` con `current = target = (rand(−100,100), rand(−100,100))`; a los 100 ms `target = 0`; centro medido en coordenadas de página con `ResizeObserver` sobre el slot. `whileVisible(root, tick)`: `{mx,my} = takeMovement()`; por card `v *= .9^dt`, `current += v`, `spring.update(dt)`, `d = hypot((pointer.x − cx)/innerWidth·2, (pointer.y + scrollY − cy)/innerHeight·2)`, `k = max(0, 1 − d)^6 · .4`, `v += m·k`; escribir `--offsetX/--offsetY/--velocity` (`velocity.x − velocity.y`) en el slot. Entrada: `gsap.fromTo(slots, {scale:0}, {scale:1, duration:1, ease:ELASTIC, stagger:.08, delay:.4})` y `data-ready`. Sin `entrances()`: nada (cards en reposo).
- [ ] Verificación manual en dev: aparecen escalonadas, vuelven al centro, el cursor las empuja y rotan.
- [ ] Commit `feat(motion): spring hero cards`.

### Task 9: Carrusel

- [ ] `carousel.ts` `initCarousel(root, {onSelect})`: medidas (`step = slideWidth + gap`, `length = n·step`, `center = (rootWidth − slideWidth)/2`) con `ResizeObserver`; estado `offset` (sin envolver), `v`, `down`, `dragDelta`, `target|null`. Pointer: `pointerdown` en root (botón 0) registra inicio; `pointermove` en window acumula `dragDelta`; `pointerup` suelta → `v *= 2`, `target = snapOffset(offset, v, step, center)`, `v = velocityFor(target, offset)`; si desplazamiento total < 6 px y < 300 ms es un tap (deja pasar el `click` del botón); si no, suprime el siguiente `click` (`capture`). Rueda: si `|deltaX| > |deltaY|`, `preventDefault`, `v −= deltaX·.2`, snap 150 ms después de la última rueda. Teclado (en root con foco): ←/→ → `target = snapOffset(..., dir)`. `focusin` en una slide → centrarla. Tick (`whileVisible`): si `down` `v = dragDelta; dragDelta = 0` si no `v *= .85^dt`; `offset −= v·dt`; si hay `target` y `|v| < .05` → `offset = target`, `target = null`. Render por slide: `x = slideX(k, offset, step, length)`, `t = x + slideWidth/2 − rootWidth/2`; `style.translate = x px`; `--t = t`. CSS: `rotate: calc(var(--t)·.03deg)`, `transform-origin: 50% 70vw`, `translate` Y `calc(cos(var(--t)·3.14/1000)·−3rem + 3rem)`, título `opacity: cos(var(--t)·3.14/600)`. `data-inview` al entrar (transición 1.4 s elástica con retardo `sin(--i·π/2)·.12s`). Reducido: sin inercia (`v` se aplica directo, `target` inmediato), sigue el arrastre/teclado.
- [ ] Verificación manual: arrastrar con ratón, lanzar, rueda horizontal, ←/→, Tab, tap abre (tras Task 10).
- [ ] Commit `feat(motion): curved inertia carousel`.

### Task 10: Pilas, morph y diálogos

- [ ] `piles.ts`: IntersectionObserver (`threshold .25`) → `data-inview` una vez.
- [ ] `morph-dialog.ts` `createMorphDialog(dialog, {onClose})` → `{open(origin|null), close(), isOpen}`. Abrir: guardar `origin`, `rect0` y radio del origen; `dialog.showModal()`; `html.style.overflow='hidden'`; medir `.morph__panel` final; origen `opacity:0` (80 ms); `gsap.fromTo(panel, {left,top,width,height = rect0, borderRadius: r0}, {final, borderRadius: r1, duration:.7, ease:'signature', clearProps})` con el panel en `position:fixed` durante la animación; contenido con ancho fijo final, `gsap.fromTo(content, {scale: rect0.width/final.width, transformOrigin:'0 0', filter:'blur(8px)', autoAlpha:0}, {scale:1, filter:'blur(0px)', autoAlpha:1, duration:.7, ease:'signature', clearProps})`; backdrop `autoAlpha 0→1` 0.5 s. Sin origen: `scale .92→1` + fade 0.35 s `power2.out`. Reducido: fade 0.15 s. Cerrar: si el origen sigue visible (rect dentro del viewport) animar de vuelta 0.5 s `signature`, contenido `filter: blur(32px)` y `autoAlpha 0` con `ease: CustomEase('.56,.27,0,1')`; si no, `scale .9` + blur 32 + fade 0.35 s; backdrop fuera 0.4 s; al terminar `dialog.close()`, restaurar overflow, origen `opacity` 0.3 s tras 0.2 s, devolver foco al origen. `cancel` (Esc) → `preventDefault` + `close()`; clic en `[data-close]` → `close()`; bloqueo de reentrada mientras anima.
- [ ] `ui/project-dialog.ts`: `open(i, origin)`: clonar `template[data-project-template=i]` en `.morph__content`, `applyI18n(content)`, `open(origin)`, al terminar `revealWords(title)` y `title.focus()`; al cerrar vaciar contenido (para el vídeo). Conectar `onSelect` de carrusel y clic en `.pile`.
- [ ] `ui/section-menu.ts`: trigger del header abre el menú con morph; enlaces: cerrar y luego `scrollIntoView({behavior: reduced()? 'auto':'smooth'})`; entrada de enlaces `flowIn` estilo menú (`scale .9`, blur 4 px, 0.35 s, stagger .04, delay .1); `aria-expanded` sincronizado.
- [ ] Commit `feat(motion): piles and Stepbro morph dialogs`.

### Task 11: Footer, header, ajustes, idioma y contacto

- [ ] `footer-stretch.ts`: medir `phantomTop = phantom.offsetTop`, `titleBottom = title.offsetTop + title.offsetHeight` con `ResizeObserver`; `whileVisible(phantom, tick)`: `g = damp(g, scrollY, .9, dt)`; `scale = mapRange(g, phantomTop − vh, phantomTop, 0, 1, true)`; `offset = mapRange(g, phantomTop − vh, phantomTop, vh − titleBottom, 0, true)`; escribir `--footer-scale`/`--footer-offset`. Reducido: no se inicia.
- [ ] `section-label.ts`: `data-visible` del header cuando la fila superior de la portada sale (ScrollTrigger `trigger: #home`, `start: 'top+=80 top'`); por cada `[data-section-label]` un ScrollTrigger `start:'top 50%' end:'bottom 50%'` → `onToggle` activo: `data-i18n` del label = clave, `applyI18n(label)`, `revealWords(label)` (re-dividido).
- [ ] `i18n.ts`: `getLang()`, `applyI18n(root, lang)` (`[data-i18n]`, `[data-i18n-attr="attr:ruta;…"]`, `[data-i18n-date]` con `Intl.DateTimeFormat(lang, {month:'long', year:'numeric'})` y mayúscula inicial), `setLanguage(lang)` (eventos `languagewillchange` → aplicar → `document.documentElement.lang` + `localStorage` → `languagechange`).
- [ ] `ui/settings.ts`: toggle `data-open` + `aria-expanded` + `inert`; Esc y clic fuera cierran; tema: alterna `.dark`, guarda `localStorage.theme`, actualiza `<meta name="theme-color">`; idioma: `setLanguage(otro)` y actualiza su propia etiqueta.
- [ ] `ui/contact-form.ts`: `emailjs.init({publicKey})`, `sendForm(serviceId, templateId, form)`; sin claves → estado de error sin llamada; botón deshabilitado y texto `contact.sending` durante el envío; estado éxito/error en `[data-form-status]` (5 s); `try/catch`, sin excepciones sin capturar.
- [ ] Commit `feat: footer stretch, section header, settings, i18n and contact form`.

### Task 12: Verificación

- [ ] `npm test` → PASS.
- [ ] `npm run build` → sin errores.
- [ ] `npm run dev` y capturas (Edge headless + REA o `msedge --screenshot`) a 1440×900 y 390×844: portada, sobre mí, proyectos, diálogo abierto, footer; claro/ES y oscuro/EN; con `prefers-reduced-motion: reduce`.
- [ ] Comprobar sin scroll horizontal a 390 px (`document.documentElement.scrollWidth === innerWidth`).
- [ ] Revisar consola sin errores.
- [ ] Commit final si hubo correcciones.
