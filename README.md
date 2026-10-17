# Tueste · Laboratorio Módulo 01 (Layout + Tailwind CSS)

Landing page de **Tueste**, un tostadero de café de especialidad ficticio que vende por suscripción. Maquetada con HTML semántico y Tailwind CSS 4, mobile first.

## Secciones

1. **Cabecera** fija con logo, menú (desplegable en móvil) y botón "Suscríbete".
2. **Hero**: titular, subtítulo, dos llamadas a la acción e imagen con etiqueta flotante.
3. **Cafés del mes**: tres tarjetas (Etiopía, Colombia, Kenia) con origen, notas de cata y precio.
4. **Cómo funciona**: tres pasos conectados (eliges → tostamos → te llega).
5. **Planes**: Básico, Popular (destacado) y Pro.
6. **Preguntas frecuentes** con `<details>` nativo.
7. **Pie** con enlaces, redes y newsletter (demo: no envía nada).

## Cómo arrancarlo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # comprobación de tipos + build en dist/
```

> El `.npmrc` del proyecto fija el registro público de npm por si vuestra configuración global apunta a uno privado.

## Stack

- [Vite](https://vite.dev/) + `@tailwindcss/vite` (Tailwind CSS 4), sobre el [boiler-tailwind](https://github.com/Lemoncode/boiler-tailwind) del curso.
- Sin DaisyUI ni frameworks de JS. El único JavaScript (`src/main.ts`) abre y cierra el menú móvil y evita el envío del formulario.
- Tipografía: Fraunces (títulos, Google Fonts) y la fuente del sistema para el texto.
- Iconos SVG de [Lucide](https://lucide.dev/) en línea; fotos de [Unsplash](https://unsplash.com/).

## Decisiones

- **Utilidades de Tailwind en lugar de componentes DaisyUI**, para que cada decisión de layout (flex, grid, posicionamiento) quede a la vista.
- **Tokens de diseño con `@theme`**: paleta `crema` / `cafe` / `tostado` y la fuente `display` definidas una vez en `src/style.css`.
- **Capas**: estilos base de títulos y foco en `@layer base`; botones repetidos en `@layer components` (`.btn`, `.btn-primario`, `.btn-secundario`). Así cualquier utilidad del HTML los sobrescribe.
- **El estado vive en atributos**: el menú usa `aria-expanded` + `peer-aria-expanded:` y el FAQ el atributo `open` + `group-open:`. El JS no toca clases.
- **Accesibilidad**: landmarks, un solo `h1`, enlace "Saltar al contenido", foco visible en todo, etiquetas en el formulario, `alt` descriptivo en el hero y vacío en las fotos decorativas, `prefers-reduced-motion` respetado.

En [`NOTAS.md`](./NOTAS.md) se explica cada clase no evidente y con qué lección del módulo se relaciona.

## Comprobaciones

- 375 px, 768 px y 1280 px sin scroll horizontal.
- Recorrido completo con Tab: el foco siempre se ve; Escape cierra el menú.
- `npm run build` sin errores.

## Uso de IA

He planificado y maquetado la página con ayuda de un asistente de IA (Claude Code): resumen del temario, plan por secciones, generación de la primera versión y revisión con capturas a varios anchos. Todas las clases están revisadas y explicadas en `NOTAS.md`.
