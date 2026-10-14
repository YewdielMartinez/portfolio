# Rediseño del portfolio — minimalista blanco y negro

Fecha: 2026-10-14
Estado: aprobado (diseño), pendiente de plan de implementación

## Objetivo

Rehacer el portfolio de Yewdiel Medina con un lenguaje suizo, blanco y negro, profesional, inspirado en las láminas de referencia (portfolio de Yekaterina Turkina) y en el sistema de movimiento de spencergabor.com, reutilizando además las recetas del kit Stepbro (morph de botón a diálogo, flowIn, curva signature) que ya están en `Stepbro - Kit de replicacion/`.

Criterios de éxito:

- Cada sección se lee como una lámina de la referencia: cabecera fina, titular enorme, mucho blanco.
- Las cuatro mecánicas de Spencer elegidas funcionan: cards con resorte en la portada, carrusel curvo con inercia, palabras elásticas + footer que se estira, grid de pilas.
- Detalle de proyecto que nace de la card pulsada (morph Stepbro).
- Claro/oscuro y ES/EN siguen funcionando.
- Con `prefers-reduced-motion: reduce` todo el contenido es accesible sin movimiento.
- `astro build` sin errores; sin scroll horizontal a 390 px.

Fuera de alcance: Quiz, Favoritos (fotos, películas, juegos), easter egg "Behind the Code", CMS, páginas por proyecto.

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| Secciones | Núcleo: portada, sobre mí, qué hago, herramientas, experiencia, proyectos, contacto |
| Animaciones Spencer | Las cuatro: cards hero con resorte, carrusel curvo, palabras elásticas + footer, pilas |
| Tipografía | NB International Regular (único peso) |
| Toggles | Modo oscuro (invertido) + ES/EN |
| Enfoque | Reescritura limpia: componentes Astro nuevos + capa de motion en TS con GSAP |

## Hallazgos de la ingeniería inversa (spencergabor.com, REA)

Nuxt 3 + Vue, sin GSAP. Todo el movimiento son resortes propios que escriben variables CSS, más transiciones CSS con curvas `linear()` elásticas. Parámetros recuperados:

- **Resorte** (`CyqqKHX3.js`): `useSpring(stiffness=.05, friction=.8)`. Cada frame: `v *= friction; v += (target − current) · stiffness · dt; current += v`, redondeo a centésimas. La pila usa `(.2, .6)`.
- **Bucle**: un único `requestAnimationFrame` con `dt = (now − last) / (1000/60)`; los componentes se suscriben solo mientras están en pantalla (IntersectionObserver).
- **Cards de la portada** (`TX_6gWle.js`): resorte por card, arranca en offset aleatorio ±100 px y a los 100 ms el objetivo pasa a 0. Empuje del cursor: `d = hypot((px − cx)/vw·2, (py − cy)/vh·2)`, `k = (1 − d)^6 · .4`, `velocity += movement · k`, `velocity *= .9`. CSS: `rotate: calc(base − var(--velocity)·.25deg)` con bases 2°, −3°, 6°, −2°, `translateY` 5 %, −6 %, 5 %, −4 %, solape `margin-right: −6 %`, ancho `clamp(6rem, 100%, 14cqi)`, radio 1rem. Entrada `scale 0→1`, 1 s elástico, retardo `i·.08s + .4s`.
- **Palabras** (hero y títulos): cada palabra `inline-block`, `transform-origin: bottom`, desde `scale: 1 0; translate: 0 .25ch`, 0.8 s elástico, retardo `i·.1s`. Segunda línea en gris.
- **Carrusel** (`Cv5ZTRhq.js`): fricción `.85`; arrastre con `movementX`; rueda horizontal `·.2`; flechas y tap en los extremos (25 %/75 % del ancho) avanzan una slide; al soltar, `velocity ·= 2`, proyecta el reposo `x − v·f/(1−f)`, redondea a la slide más cercana y calcula la velocidad necesaria `(target − x)(1 − f)/f`. Bucle infinito por desplazamiento de slides. CSS curvo: `rotate: calc(var(--transform)·.03deg)`, `transform-origin: 50% 70vw`, `translateY: calc(cos(var(--transform)·π/1000)·−3rem + 3rem)`, título con `opacity: cos(var(--transform)·π/600)`. Entrada al verse: imágenes desde `scale .8; translate 0 20%`, 1.4 s elástico, retardo `sin(idx·π/2)·.12s`.
- **Pilas** (`BVSQue_b.js`): 2 medios superpuestos; el de atrás con `rotate: rotation·.5deg` y `translate posX·.25%, posY·.25%` donde `rotation = rand(2,5)·(±1 alterno)`, `offsetX = rand(4,10)·signo`, `offsetY = (n − i)·5`. Al verse: `scale .7→1`, sombra 0→1. Hover: capas a 1.01/1.02/1.03; activo 0.97/0.98/0.99.
- **Footer** (`Ibg-He6l.js`, Footer): `position: fixed` detrás del `main`, con un "phantom" de `100dvh` al final del flujo. Scroll suavizado `g = lerp(g, scrollY, 1 − e^(−.9·dt))`; `scaleY = map(g, phantomTop − vh, phantomTop, 0, 1)`; `offsetY = map(…, vh − titleBottom, 0)`. Título `33cqi/.8`, `transform-origin: bottom`. Enlaces con hover `scaleY(1.2)` y curva elástica 1 s.
- **Selector radial** (color picker): opciones en `translate(sin(i·.75 + 1.25)·−r, cos(i·.75 + 1.25)·r)`, `scale .5→1`, retardo `i·.05s`, 0.5 s elástico; cerrado 0.15 s `ease-in-cubic`.
- **Curvas**: `--ease-out-elastic: linear(0, .5737 7.6%, .8382 11.87%, .9463 14.19%, 1.0292 16.54%, 1.0886 18.97%, 1.1258 21.53%, 1.137 22.97%, 1.1424 24.48%, 1.1423 26.1%, 1.1366 27.86%, 1.1165 31.01%, 1.0507 38.62%, 1.0219 42.57%, .9995 46.99%, .9872 51.63%, .9842 58.77%, 1.0011 81.26%, 1)`; `--ease-out-elastic-100-30` para hovers. Sombra: `0 9px 21px rgba(0,0,0,.1), 0 38px 38px rgba(0,0,0,.09), 0 85px 51px rgba(0,0,0,.05)`.

Recetas Stepbro reutilizadas (de `money/motion-recipes.mjs` y `KAYRO.md`): curva signature `M0,0 C0.308,0.19 0.107,0.633 0.288,0.866 0.382,0.987 0.656,1 1,1`, flowIn (`y −20 → 0`, blur 16 → 0, 0.5 s, stagger 50 ms, `M0,0 C0.25,0.1 0.25,1 1,1`), morph de origen (0.7 s abrir, 0.5 s cerrar, blur de contenido 8 → 0 al abrir y → 32 px al cerrar, sin origen `scale .92 → 1` 0.35 s), backdrop 0.5 s.

## Sistema visual

Tokens en `src/styles/global.css`:

| Token | Claro | Oscuro |
|---|---|---|
| `--bg` | `#ffffff` | `#0a0a0a` |
| `--fg` | `#0a0a0a` | `#f5f5f5` |
| `--muted` | `#a3a3a3` | `#5c5c5c` |
| `--line` | `rgb(0 0 0 / .08)` | `rgb(255 255 255 / .1)` |
| `--surface` (cards sin imagen, plato de pila) | `#f2f2f2` | `#171717` |
| `--shadow` | sombra de 3 capas de Spencer | misma con alfa ×1.6 |

Tipografía: NB International Regular, sin negritas (`font-synthesis: none`). Escala:

- Display (`Portfolio`, `CONTACTO`): `clamp(5rem, 18vw, 22rem)`, `line-height .8`, `letter-spacing −.05em`.
- H2 de lámina: `clamp(3rem, 7vw, 7.5rem)`, `line-height .9`, `letter-spacing −.04em`.
- Cuerpo: `clamp(1.05rem, 1.3vw, 1.35rem)`, `line-height 1.25`, `text-align: justify`, `hyphens: auto`, ancho máx. ~34 ch.
- Etiquetas de cabecera: `1rem–1.25rem`, `letter-spacing −.01em`.

Radios: cards 16 px, foto y diálogo 40 px, botones píldora/círculo. Margen lateral `clamp(1rem, 4vw, 4.5rem)`; 16 px mínimo en móvil.

## Estructura de la página

`src/pages/index.astro` compone:

1. **Header** (`Header.astro`, fijo). Izquierda: `Yewdiel Medina | Portfolio`. Derecha: botón con el nombre de la sección visible; cambia con la animación de palabras al entrar en cada sección (ScrollTrigger `onToggle`). Al pulsarlo abre el menú de secciones con morph Stepbro desde el propio botón; cada opción hace scroll suave a su sección y cierra el menú.
2. **Portada** (`Cover.astro`, `min-height: 100svh`). Fila superior: `Presentado por: Yewdiel Medina` / mes y año actuales (Intl, idioma activo). Centro: 4 cards (`Home Kayro`, `MEDICLIFELANDING`, `Watchlt`, `TRON`). Fila inferior: `Software Developer` a la izquierda; email y `Los Mochis, México` a la derecha. Debajo, `Portfolio` a ancho completo (font-size ajustado por JS al ancho del contenedor, con valor CSS de respaldo), entrada letra por letra con la animación de palabras.
3. **Sobre mí** (`About.astro`). Foto `avatar.jpg` en escala de grises, radio 40 px, columna izquierda. Derecha: `¡Hola!` / `Soy Yewdiel Medina` y la bio de `translations`. Foto entra con `scale .7 → 1` elástico al verse.
4. **Qué hago** (`Services.astro`). `¿Qué hago?` / `(y me encanta hacer)`, párrafo, y seis capacidades sueltas en una rejilla desplazada (Frontend, Mobile, Backend, UI/UX, APIs, Landing pages). Cada una entra con la animación de palabras; hover `scaleY(1.2)` elástico.
5. **Herramientas** (`Tools.astro`). `Herramientas` / `que domino.` y un párrafo: nombres de `skills.ts` en `--fg`, texto conector en `--muted`.
6. **Experiencia** (`Experience.astro`). Filas separadas por `--line`: periodo · empresa · puesto, descripción debajo. Entrada flowIn por fila.
7. **Proyectos** (`Work.astro`). Título `Proyectos` / `seleccionados`. Carrusel curvo con los proyectos que tienen captura. Debajo, `Archivo`: grid de pilas con los 13 proyectos (2 columnas móvil, 3 escritorio). Kayro muestra sus 3 capturas; los proyectos con una captura muestran la imagen sobre un plato `--surface` rotado; los que no tienen imagen muestran una card tipográfica (título y etiquetas sobre `--surface`). Pulsar una slide o una pila abre el diálogo de proyecto.
8. **Diálogo de proyecto** (`ProjectDialog.astro`, un único `<dialog>` reutilizado). Contenido: título (palabras elásticas), año y rol, descripción larga, lista de características, etiquetas, enlaces (demo, código, vídeo). El vídeo se reproduce dentro del diálogo. Ancho máx. 960 px, radio 40 px; en `< 680px` pantalla completa con radio 0.
9. **Contacto** (`Contact.astro`). `¿Trabajamos` / `juntos?`, formulario EmailJS (nombre, email, mensaje) con campos subrayados y botón píldora con escala elástica; estados enviando/éxito/error visibles y anunciados (`aria-live`).
10. **Footer** (`Footer.astro`). Fijo y revelado detrás del `main`. `CONTACTO` gigante que se estira con el scroll; enlaces email, GitHub, LinkedIn, X; `© año`.
11. **Ajustes** (`Settings.astro`). Botón circular abajo a la derecha con sombra; abre un selector radial con dos opciones: tema (sol/luna) e idioma (ES/EN).

## Arquitectura de movimiento

Todo en `src/scripts/motion/`, módulos pequeños con una responsabilidad cada uno, importados desde un `src/scripts/main.ts` que se carga una vez en `Layout.astro`.

| Módulo | Responsabilidad | Interfaz |
|---|---|---|
| `core.ts` | Registra `ScrollTrigger`, `Flip`, `SplitText`, `CustomEase`; crea `signature` y `flowSoft`; expone `reduced()` y `mm` (`gsap.matchMedia`) | `initCore()`, `reduced()`, `EASE` |
| `spring.ts` | Port del resorte de Spencer, por eje, normalizado por `dt` | `createSpring(stiffness, friction)` → `{current, target, velocity, update(dt)}` |
| `loop.ts` | Un callback en `gsap.ticker` que llama a los suscriptores activos; suscripción ligada a visibilidad | `whileVisible(el, fn)` → `stop()` |
| `pointer.ts` | Posición y `movementX/Y` del puntero en `window`, reiniciado al salir | `pointer` (objeto vivo) |
| `words.ts` | Divide titulares marcados con `data-words` en palabras (o letras con `data-letters`) con SplitText y los anima al entrar o al llamarse; re-divide al cambiar idioma | `revealWords(el, {delay})`, `initWords()` |
| `heroCards.ts` | Resortes + empuje del cursor + entrada escalonada de las cards de portada; escribe `--offsetX/--offsetY/--velocity` | `initHeroCards(root)` |
| `carousel.ts` | Inercia, arrastre, rueda, teclado, snap, bucle infinito; escribe `--offset`, `--slide-offset`; distingue click de arrastre | `initCarousel(root, {onSelect})` |
| `piles.ts` | Rotaciones/offsets deterministas por índice (semilla fija, no `Math.random` en SSR) y `inview` | `initPiles(root, {onSelect})` |
| `flow.ts` | flowIn/flowOut de Stepbro | `flowIn(targets, opts)` |
| `morphDialog.ts` | Morph Stepbro con Flip: origen → diálogo y vuelta; foco, Esc, backdrop | `openFrom(origin, dialog)`, `close()` |
| `footerStretch.ts` | Phantom + lerp exponencial + `scaleY/offsetY` | `initFooterStretch(root)` |
| `radial.ts` | Abre/cierra el selector radial | `initRadial(root)` |
| `sectionLabel.ts` | Etiqueta del header según la sección visible | `initSectionLabel(header)` |

Reglas:

- Entradas puntuales (palabras, cards, pilas, flowIn) con GSAP + `ScrollTrigger` `once: true`. Los rebotes elásticos usan `elastic.out(1, .45)`; los hovers usan transiciones CSS con `--ease-out-elastic`.
- Resortes e inercia en `gsap.ticker`, solo mientras su raíz está en pantalla.
- Solo se animan `transform`, `opacity`, `scale/rotate/translate` y `filter: blur` en elementos pequeños o en el contenido del diálogo.
- `gsap.matchMedia` con `reduceMotion`: sin resortes ni empuje, cards en su sitio, carrusel con desplazamiento directo y snap sin inercia, palabras visibles sin dividir, morph sustituido por aparición sin viaje, footer sin estiramiento.
- Limpieza: cada `init*` devuelve una función que revierte splits, quita listeners y suscripciones.

## Idioma y tema

- `src/scripts/i18n.ts`: diccionario `{ ...translations[lang], projects: projects[lang], experience: experience[lang] }`. Aplica `textContent` a `[data-i18n="ruta.al.valor"]` y atributos a `[data-i18n-attr="aria-label:ruta;placeholder:ruta"]`. Actualiza `<html lang>`, guarda `localStorage.language` y emite `languagechange`. Se aplica antes de las entradas animadas para que no se vea el cambio. `words.ts` escucha el evento y re-divide.
- `translations.ts` se reescribe a las claves nuevas (cabecera, portada, sobre mí, qué hago, herramientas, experiencia, proyectos, diálogo, contacto, footer, ajustes); se eliminan las claves de `behind`.
- Tema: clase `dark` en `<html>`; script inline en `<head>` lee `localStorage.theme` y, si no existe, `prefers-color-scheme`. `theme-color` según tema.

## Datos e imágenes

- Se conservan `projects.ts`, `experience.ts`, `skills.ts` (sin `icon`/`color`, ya no se usan; se deja solo `name` y una `category`), `personal.ts`, `translations.ts`.
- `projects.ts` gana `images?: string[]` (Kayro: Home, Sign In, Register) manteniendo `image` como principal. El carrusel muestra todos los proyectos con `image` no vacío (9), en el orden del archivo.
- Capturas a `src/assets/projects/`; se resuelven por nombre con `import.meta.glob` y se sirven con `<Image>`/`getImage` de `astro:assets` en WebP con `widths` adecuados. `avatar.jpg` igual.

## Accesibilidad

- Un único `h1` en la portada: la palabra visible `Portfolio` precedida de `Yewdiel Medina — ` en texto solo para lectores de pantalla (clase `sr-only`); un `h2` por sección; los titulares divididos llevan `aria-label` con el texto completo y las piezas `aria-hidden` (comportamiento de SplitText `aria: "auto"`).
- Carrusel: región con `aria-roledescription="carousel"`, slides como botones con nombre del proyecto; flechas solo cuando el carrusel tiene foco.
- Diálogo: `<dialog>` modal nativo, foco al título al abrir, devuelto al origen al cerrar, Esc y clic en backdrop cierran.
- Selector radial y menú: `aria-expanded`, navegables con teclado, Esc cierra.
- Contraste: `--muted` solo en texto grande o decorativo; el cuerpo usa `--fg`.
- Skip link conservado.

## Limpieza

Se eliminan: `Navbar.astro`, `SectionNav.astro`, `Quiz.astro`, `BehindTheCode.astro`, `SkillIcon.tsx`, `Hero.astro` (sustituido por `Cover.astro`), `data/games.ts`, `data/movies.ts`, `data/photos.ts`, `data/quiz.ts`, `public/photos/`, `public/projects/` (movido a `src/assets/projects/`). Se quitan `@astrojs/react`, `react`, `react-dom`, `react-icons`, `@types/react`, `@types/react-dom` y la integración en `astro.config.mjs`. Se añade `Stepbro - Kit de replicacion/` a `.gitignore`. Las variables `API_MOVIE_KEY` y `API_VIDEOGAME_KEY` dejan de usarse (se informa; no se toca `.env`).

## Manejo de errores

- EmailJS: sin claves configuradas el botón muestra el estado de error y el email visible sigue disponible como alternativa; los errores no lanzan excepciones no capturadas.
- Imágenes: si una captura falta en el glob, el proyecto cae a la card tipográfica en vez de romper el build.
- Fuentes: `document.fonts.ready` antes de medir `Portfolio`/`CONTACTO` y de dividir líneas; `ResizeObserver` reajusta.
- Sin JavaScript: todo el contenido es visible y legible. El script inline del `<head>` añade la clase `js` a `<html>`; los estados iniciales ocultos (palabras plegadas, cards en escala 0) solo se aplican en CSS bajo `.js` y `prefers-reduced-motion: no-preference`, lo que evita el destello antes de que cargue el módulo y deja la página intacta si el JS falla. Un temporizador de seguridad (2 s) retira esos estados si la inicialización no llega a ejecutarse.

## Verificación

- `npm run build` sin errores ni avisos nuevos.
- Servidor de desarrollo y capturas a 1440×900 y 390×844 en: claro/ES, oscuro/EN, movimiento reducido.
- Comprobaciones manuales: resorte y empuje de cards, arrastre e inercia del carrusel (ratón, rueda, teclado), apertura/cierre del diálogo desde carrusel y desde pila, estiramiento del footer, selector radial, cambio de idioma con titulares re-divididos, sin scroll horizontal.
