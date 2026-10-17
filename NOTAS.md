# Notas: por qué cada clase

Chuleta para la revisión. Agrupada por concepto del módulo (el número es la lección de `01-layout`).

## Tema y capas (`src/style.css`)

| Qué | Por qué |
| --- | --- |
| `@theme inline { --color-fondo-50: var(--fondo-50) … }` | Tokens semánticos (05): `fondo` (superficies), `superficie` (tarjetas), `texto`, `marca` (bandas oscuras), `claro` (texto sobre la marca), `acento` y `sobre-acento`. Con `inline`, la utilidad usa la variable directamente (`bg-fondo-50` → `background-color: var(--fondo-50)`), así que cambiar las variables cambia toda la página. |
| `[data-theme="matcha"] { --acento-600: … }` | D3: cada tema solo redefine variables. El HTML no cambia, solo el atributo `data-theme` de `<html>`. |
| `.dark { --fondo-50: … }` + `@custom-variant dark (&:where(.dark, .dark *))` | P1: el modo oscuro redefine superficies y texto (y aclara el acento para que contraste). La variante `dark:` pasa a depender de la clase `.dark`, que pone el botón, en vez de la preferencia del sistema. |
| `@layer base { h1, h2, h3 { … } }` | Estilo base de los títulos (Preflight los deja como párrafos, 08). Va **dentro de una capa** para que cualquier utilidad del HTML lo pueda sobrescribir: lo que está fuera de capas gana a lo que está dentro (16, 22). Ejemplo: los `h2` del footer llevan `font-sans` y gana. |
| `:focus-visible { outline-current }` | Foco visible para teclado en todo (12). `currentColor` = color del texto, que por definición contrasta con su fondo. |
| `@layer components { .btn … }` | Los botones se repiten ~10 veces: clase propia con `@apply` (22, práctica 3). En la capa `components`, así `btn px-4 py-2` funciona: la utilidad (capa `utilities`) gana al componente. |
| `@source not "../NOTAS.md"` | Tailwind busca clases en todos los ficheros; este documento está lleno de nombres de clases y no queremos que entren en la build. |

## Cabecera

| Clase | Por qué |
| --- | --- |
| `sticky top-0` | Se queda pegada al hacer scroll (17). Sin `top` no hace nada. |
| `z-20` | Por encima del contenido que pasa por debajo (18). Escala pequeña: header 20, enlace de salto 30. |
| `bg-fondo-50/90 backdrop-blur` | Fondo al 90 % de opacidad + desenfoque de lo que hay detrás. |
| `h-16` | Altura fija conocida (4rem) para poder restarla en el hero y en `scroll-mt-16`. |
| `contenedor` | Utilidad propia (D4, `@utility`): `margin-inline: auto` + `max-width` + padding lateral que crece en `sm`. Es la caja centrada del tema 06, que se repetía en todas las secciones. |
| `flex items-center justify-between` | Logo a un lado, menú al otro, centrados en vertical (19, pasos 2-3). |
| `input type=checkbox` `peer sr-only` + `peer-checked:flex` (lista) | D1, menú **sin JS**: el checkbox guarda el estado abierto/cerrado; la lista es un hermano posterior y se muestra con `.peer:checked ~ ul` (10). El `label for` hace de botón. |
| `peer-focus-visible:outline-2` (label) | El checkbox está oculto (`sr-only`), así que el foco se dibuja en su `label`. |
| `group` (nav) + `group-has-checked:hidden` / `group-has-checked:block` | Los iconos ☰/✕ están **dentro** del label, no son hermanos del checkbox; por eso uso `:has()` (12): `.group:has(:checked) svg`. |
| `hidden … md:flex` | Mobile first (21): oculto por defecto, en fila desde 48rem. |
| `absolute inset-x-0 top-full` | En móvil el menú es un panel justo debajo de la cabecera. Su contenedor de referencia es el `header`, porque `sticky` también es un elemento posicionado (17). |
| `md:static` | En escritorio vuelve al flujo normal. |
| `sr-only` | Texto solo para lectores de pantalla ("Abrir menú", nombres en los enlaces "Elegir"). |
| `sr-only focus:not-sr-only` | Enlace "Saltar al contenido": invisible hasta que llegas con Tab. |

## Hero

| Clase | Por qué |
| --- | --- |
| `grid md:grid-cols-2 items-center gap-12` | Una columna en móvil, dos iguales desde `md` (20). |
| `md:min-h-[calc(100dvh-4rem)]` | Alto de la pantalla menos la cabecera (05: `dvh` y `calc`). `dvh` y no `vh` por la barra del navegador móvil. Solo desde `md`: en móvil el contenido manda. |
| `text-4xl sm:text-5xl lg:text-6xl` | El titular crece con el espacio. |
| `text-balance` | Reparte el texto del título en líneas de longitud parecida. |
| `max-w-[45ch]` | Ancho cómodo de lectura (05, unidad `ch`). |
| `flex flex-wrap gap-3` | Los botones saltan de línea si no caben, sin media query (21: "muchas veces no hacen falta"). |
| `aspect-4/5 object-cover` | Proporción fija; la foto se recorta sin deformarse. |
| `width`/`height` en `<img>` | El navegador reserva el hueco antes de cargar: no hay saltos. |
| `figure relative` + `figcaption absolute -bottom-5` | La etiqueta "Último tueste" se coloca respecto a la foto (17, paso 3). |

## Cafés del mes

| Clase | Por qué |
| --- | --- |
| `ul > li > article` | Lista de productos; cada tarjeta tiene sentido sola (01). |
| `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` | 6 tarjetas: 1 → 2 → 3 columnas (mobile first, 21). `grid-cols-1` es el valor por defecto, pero lo dejamos explícito. |
| `flex h-full flex-col` (article) | La tarjeta ocupa toda la celda y apila su contenido en columna. |
| `flex-1` (cuerpo) + `mt-auto` (precio) | El margen automático empuja el precio al fondo: los precios quedan alineados aunque el texto mida distinto (19, paso 7). |
| `overflow-hidden rounded-2xl` | La imagen respeta las esquinas redondeadas. |
| `transition duration-300 ease-out hover:shadow-lg motion-safe:hover:-translate-y-1` | Al pasar el ratón la tarjeta sube 0.25rem y gana sombra. El desplazamiento es movimiento, por eso va con `motion-safe:`; la sombra no lo necesita. |
| `group` (tarjeta) + `motion-safe:group-hover:scale-105` (imagen) | Zoom de la foto al pasar por **cualquier parte** de la tarjeta. El contenedor de la imagen lleva `overflow-hidden` para que la foto ampliada no se salga. |
| `aspect-3/2 object-cover` | Todas las fotos con el mismo alto sin deformarse. |
| `btn btn-primario px-4 py-2 text-sm` | El botón de la tarjeta: componente `.btn` + utilidades que lo hacen más pequeño (las utilidades ganan a la capa `components`). |
| `flex flex-wrap gap-2` (notas) | Las etiquetas de cata saltan de línea solas. |
| `alt=""` | Fotos decorativas: la información está en el texto (01). |
| `loading="lazy"` | Solo se descargan al acercarse a la pantalla. |

## Cómo funciona

| Clase | Por qué |
| --- | --- |
| `ol` | Los pasos tienen orden: lista ordenada (01). |
| `flex flex-col md:flex-row` | Apilados en móvil, en fila en escritorio (19). Es una sola dirección, así que flex basta. |
| `flex-1` (cada paso) | Los tres pasos se reparten el ancho a partes iguales (`flex: 1 1 0%`). La línea de unión depende de que midan lo mismo. |
| `flex flex-col items-center justify-center text-center` | El centrado de flexbox (19, paso 3) dentro de cada paso. |
| `grid size-14 place-items-center rounded-full` | Círculo con el número centrado en los dos ejes (20). |
| `md:after:absolute md:after:top-7 …` | La línea entre pasos es un pseudo-elemento `::after` (14) posicionado respecto al `li relative`. `top-7` = mitad del círculo (3.5rem / 2). |
| `md:after:left-[calc(50%+2.25rem)] md:after:w-[calc(100%-2rem)]` | Empieza justo después del círculo (mitad del `li` + radio + aire) y mide lo justo para llegar al siguiente (ancho del `li` + hueco de 2.5rem − 2 radios − aire). El último paso no lleva línea. |

## Planes

| Clase | Por qué |
| --- | --- |
| `max-w-md md:max-w-none md:grid-cols-3` | En móvil, tarjetas no demasiado anchas; en escritorio, tres columnas. |
| `md:items-center` | Las tarjetas normales se centran en vertical respecto a la destacada, que es más alta. |
| `md:scale-105 shadow-xl border-2` | La destacada sobresale. `scale` no cambia el flujo, así que no empuja a las demás. |
| `absolute -top-4 left-1/2 -translate-x-1/2` | Etiqueta "Más popular" centrada sobre el borde: `left: 50%` y luego retrocede la mitad de su propio ancho (17). |
| `whitespace-nowrap` | La etiqueta no se parte en dos líneas. |
| `shrink-0` (iconos ✓) | En flex, el icono no se encoge cuando el texto es largo (19). |
| `space-y-3` | Margen superior entre los hijos (selector `> * + *`, el truco de `li + li` del 10). |

## FAQ

| Clase | Por qué |
| --- | --- |
| `<details>/<summary>` | Acordeón nativo: accesible con teclado y sin JS. |
| `name="faq"` | Solo una pregunta abierta a la vez (Baseline 2024; si el navegador no lo soporta simplemente se abren varias, 13). |
| `list-none [&::-webkit-details-marker]:hidden` | Quita el triángulo por defecto (Chrome/Firefox y Safari). |
| `group` + `group-open:rotate-180` | La flecha gira cuando el `details` tiene el atributo `open` (11, 12). |
| `divide-y` | Una línea entre cada pregunta, sin tocar la primera. |

## Pie

| Clase | Por qué |
| --- | --- |
| `grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr]` | Valor arbitrario de grid (20): la marca y la newsletter, el doble de anchas que las columnas de enlaces. |
| `nav aria-labelledby` | Dos grupos de navegación con su título, distinguibles para un lector de pantalla. |
| `min-w-0 flex-1` (input) | Los items flex tienen `min-width: auto` y un `input` no se encoge por debajo de su ancho por defecto: sin `min-w-0` se sale en móvil. |
| `<label for>` + `type="email" required` | Campo con etiqueta; el navegador valida el formato. |
| `aria-live="polite"` | El aviso "esto es una demo" se anuncia en lectores de pantalla. |
| `focus-visible:outline-claro-100` | Sobre fondo oscuro, el anillo naranja del botón no tendría contraste suficiente. |

## Formulario con estados (P5)

| Clase | Por qué |
| --- | --- |
| `focus:border-acento-500 focus:bg-claro-50/15` | El campo activo se distingue. |
| `user-invalid:border-red-300` | Borde rojo si el email no es válido. `user-invalid` y no `invalid`: solo después de que la persona haya tocado el campo, no nada más cargar la página (un campo `required` vacío ya es `:invalid`). |
| `peer` (input) + `hidden peer-user-invalid:block` (mensaje) | El mensaje de error es un hermano posterior del input: `.peer:user-invalid ~ p` (10, hermanos siguientes). Sin JS. |
| `flex-wrap` + `basis-full` (mensaje) | El mensaje tiene que ser hermano del input, así que vive dentro de la fila flex; `basis-full` lo manda a una línea propia. |
| `aria-describedby="newsletter-error"` | El lector de pantalla lee el mensaje de error asociado al campo. |
| `disabled:opacity-50 disabled:cursor-not-allowed` | Tras enviar (demo), el JS desactiva campo y botón y se ve el estado. |

## Movimiento

| Clase | Por qué |
| --- | --- |
| `motion-safe:scroll-smooth` (html) | Scroll suave a las anclas solo si la persona no ha pedido reducir el movimiento (21). |
| `--animate-aparecer` + `@keyframes` en `@theme` | Animación propia (P7): genera la clase `animate-aparecer` (sube 1rem y aparece). |
| `motion-safe:animate-aparecer motion-safe:[animation-delay:200ms]` | Entrada del hero en cascada: cada bloque empieza un poco más tarde. Todo con `motion-safe:`. |
| `motion-safe:hover:-translate-y-0.5` (en `.btn`) | Los botones suben un poco al pasar el ratón. |
| `motion-safe:transition-transform` (flecha del FAQ) | El giro se anima solo si no se ha pedido reducir movimiento; si se ha pedido, gira sin animación. |
| `scroll-mt-16` (secciones) | Al saltar a `#planes`, deja 4rem arriba para que la cabecera fija no tape el título. |


## Modo oscuro y temas (P1, D3)

| Clase | Por qué |
| --- | --- |
| `dark:hidden` / `hidden dark:block` (iconos del botón) | Luna en modo claro, sol en modo oscuro, sin JS: solo la variante `dark:`. |
| `dark:brightness-90` (fotos) | En modo oscuro las fotos claras deslumbran; las bajo un 10 %. |
| `dark:shadow-black/40` | Una sombra marrón no se ve sobre fondo oscuro: en oscuro, negra. |
| `aria-pressed` (botón de modo oscuro) | El lector de pantalla anuncia si está activado. |
| `tema-inicial.js` en el `<head>` | Aplica el tema guardado **antes de pintar**; si no, se vería un instante el tema claro (parpadeo). |
| `color-scheme: dark` (en `.dark`) | Los controles nativos (select, scrollbars) también se ponen oscuros. |

## Tarjeta con container query (D2)

| Clase | Por qué |
| --- | --- |
| `@container` (en el `li`) | Convierte el `li` en contenedor: sus hijos pueden preguntar por **su** ancho, no por el de la ventana. |
| `@xl:flex-row` (article) | Si el contenedor mide 36rem o más, la tarjeta se pone en horizontal. |
| `@xl:w-1/2 @xl:shrink-0` (imagen) / `@xl:h-full @xl:aspect-auto` | En horizontal, la imagen ocupa media tarjeta y toda la altura. |
| `sm:col-span-2 lg:col-span-3` (tarjeta destacada) | La misma tarjeta, pero ocupando toda la fila: su contenedor es ancho y se pone en horizontal. Las otras seis, en columnas estrechas, siguen en vertical. Con una media query (`md:flex-row`) se pondrían **todas** en horizontal. |

## Bento (P6)

| Clase | Por qué |
| --- | --- |
| `lg:grid-cols-4 lg:auto-rows-[minmax(12rem,auto)]` | 4 columnas; las filas miden al menos 12rem y crecen si el contenido lo pide. |
| `sm:col-span-2 lg:row-span-2` (caja grande) | Ocupa 2×2 celdas (20, paso 3). |
| `sm:col-span-2` (bolsas compostables) | Ocupa dos columnas: con la grande (2×2) y las dos pequeñas, las 8 celdas quedan llenas. |
| `relative isolate` + `absolute inset-0 -z-10` (foto y degradado) | Foto de fondo detrás del texto. `isolate` crea un contexto de apilamiento (18), así el `-z-10` no manda la foto detrás de la sección entera. |
| `bg-linear-to-t from-marca-900 via-marca-900/60 to-transparent` | Degradado para que el texto blanco se lea sobre la foto. |

## Utilidades propias (D4)

| Utilidad | Por qué |
| --- | --- |
| `contenedor` | Ver cabecera. Admite variantes como cualquier utilidad. |
| `titulo-seccion` | `text-3xl font-semibold sm:text-4xl`, que se repetía en todos los `h2`. |
| `layout-panel` | Las áreas de grid del panel (D5), que con valores arbitrarios serían ilegibles. |

## Panel (D5, `panel.html`)

| Clase | Por qué |
| --- | --- |
| `layout-panel` | `display: grid` + `height: 100dvh` + `grid-template-areas`. Móvil: `"cabecera" "lateral" "contenido"`; desde `md`: `"cabecera cabecera" "lateral contenido"`. |
| `[grid-area:cabecera]` / `[grid-area:lateral]` / `[grid-area:contenido]` | Propiedad arbitraria: cada hijo dice en qué zona va. |
| `minmax(0, 1fr)` (fila del contenido) | Sin el `0`, la fila crecería con su contenido y se perdería el scroll interno. |
| `overflow-y-auto` (main) | Solo el contenido hace scroll; cabecera y barra lateral se quedan quietas. |
| `relative` (main) | Los elementos `sr-only` son `absolute`: sin un padre posicionado se colocaban respecto a la página y la alargaban (la página entera hacía scroll). |
| `overflow-x-auto` (nav en móvil, tabla) | La barra lateral pasa arriba y se desliza en horizontal; la tabla, si no cabe, también. |
| `aria-current="page"` + `aria-[current=page]:bg-fondo-100` | La sección activa se marca para lectores de pantalla y se estiliza con un selector de atributo (11). |
| `tabular-nums` | Cifras del mismo ancho: los importes quedan alineados. |
