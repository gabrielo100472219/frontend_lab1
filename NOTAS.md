# Notas: por qué cada clase

Chuleta para la revisión. Agrupada por concepto del módulo (el número es la lección de `01-layout`).

## Tema y capas (`src/style.css`)

| Qué | Por qué |
| --- | --- |
| `@theme { --color-cafe-900: … }` | Variables CSS (05) que Tailwind convierte en utilidades: `bg-cafe-900`, `text-cafe-900`, `border-cafe-900`… Cambiar la paleta es tocar una línea. |
| `@layer base { h1, h2, h3 { … } }` | Estilo base de los títulos (Preflight los deja como párrafos, 08). Va **dentro de una capa** para que cualquier utilidad del HTML lo pueda sobrescribir: lo que está fuera de capas gana a lo que está dentro (16, 22). Ejemplo: los `h2` del footer llevan `font-sans` y gana. |
| `:focus-visible { outline-current }` | Foco visible para teclado en todo (12). `currentColor` = color del texto, que por definición contrasta con su fondo. |
| `@layer components { .btn … }` | Los botones se repiten ~10 veces: clase propia con `@apply` (22, práctica 3). En la capa `components`, así `btn px-4 py-2` funciona: la utilidad (capa `utilities`) gana al componente. |
| `@source not "../NOTAS.md"` | Tailwind busca clases en todos los ficheros; este documento está lleno de nombres de clases y no queremos que entren en la build. |

## Cabecera

| Clase | Por qué |
| --- | --- |
| `sticky top-0` | Se queda pegada al hacer scroll (17). Sin `top` no hace nada. |
| `z-20` | Por encima del contenido que pasa por debajo (18). Escala pequeña: header 20, enlace de salto 30. |
| `bg-crema-50/90 backdrop-blur` | Fondo al 90 % de opacidad + desenfoque de lo que hay detrás. |
| `h-16` | Altura fija conocida (4rem) para poder restarla en el hero y en `scroll-mt-16`. |
| `mx-auto max-w-6xl px-4` | Una caja centrada (06): `max-width` + margen automático. El `px-4` evita que el texto toque el borde en móvil. |
| `flex items-center justify-between` | Logo a un lado, menú al otro, centrados en vertical (19, pasos 2-3). |
| `peer` (botón) + `peer-aria-expanded:flex` (lista) | El JS solo cambia `aria-expanded`; la lista se muestra con un selector de hermano + atributo (10, 11): `.peer[aria-expanded="true"] ~ ul`. El estado accesible y el visual no se pueden desincronizar. |
| `group` + `group-aria-expanded:hidden` | Igual, pero hacia los hijos: cambia el icono ☰ por ✕. |
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
| `grid sm:grid-cols-2 lg:grid-cols-3` | 1 → 2 → 3 columnas. |
| `flex h-full flex-col` (article) | La tarjeta ocupa toda la celda y apila su contenido en columna. |
| `flex-1` (cuerpo) + `mt-auto` (precio) | El margen automático empuja el precio al fondo: los precios quedan alineados aunque el texto mida distinto (19, paso 7). |
| `overflow-hidden rounded-2xl` | La imagen respeta las esquinas redondeadas. |
| `flex flex-wrap gap-2` (notas) | Las etiquetas de cata saltan de línea solas. |
| `alt=""` | Fotos decorativas: la información está en el texto (01). |
| `loading="lazy"` | Solo se descargan al acercarse a la pantalla. |

## Cómo funciona

| Clase | Por qué |
| --- | --- |
| `ol` | Los pasos tienen orden: lista ordenada (01). |
| `grid md:grid-cols-3` | Apilados en móvil, en fila en escritorio. |
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
| `focus-visible:outline-crema-100` | Sobre fondo oscuro, el anillo naranja del botón no tendría contraste suficiente. |

## Movimiento

| Clase | Por qué |
| --- | --- |
| `motion-safe:scroll-smooth` (html) | Scroll suave a las anclas solo si la persona no ha pedido reducir el movimiento (21). |
| `motion-reduce:transition-none` | Lo mismo para transiciones. |
| `scroll-mt-16` (secciones) | Al saltar a `#planes`, deja 4rem arriba para que la cabecera fija no tape el título. |
