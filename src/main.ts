import "./style.css";

const raiz = document.documentElement;

const guardar = (clave: string, valor: string) => {
  try {
    localStorage.setItem(clave, valor);
  } catch {
    // Sin almacenamiento el cambio funciona igual, solo que no se recuerda.
  }
};

// P1 · Modo oscuro: ponemos o quitamos la clase .dark en <html> (ver @custom-variant en style.css).
const botonOscuro = document.querySelector<HTMLButtonElement>("#boton-oscuro");

const pintarBotonOscuro = () => {
  botonOscuro?.setAttribute("aria-pressed", String(raiz.classList.contains("dark")));
};

botonOscuro?.addEventListener("click", () => {
  const oscuro = raiz.classList.toggle("dark");
  guardar("oscuro", oscuro ? "1" : "0");
  pintarBotonOscuro();
});
pintarBotonOscuro();

// D3 · Multitema: solo cambiamos el atributo data-theme; el CSS redefine las variables.
const selectorTema = document.querySelector<HTMLSelectElement>("#selector-tema");

if (selectorTema) {
  selectorTema.value = raiz.dataset.theme ?? "espresso";
  selectorTema.addEventListener("change", () => {
    raiz.dataset.theme = selectorTema.value;
    guardar("tema", selectorTema.value);
  });
}

// D1 · El menú funciona sin JS (checkbox + peer-checked:). Esto es solo una mejora:
// cerrarlo al elegir un enlace y con Escape, que con CSS solo no se puede.
const menuToggle = document.querySelector<HTMLInputElement>("#menu-toggle");

document.querySelector("#menu")?.addEventListener("click", (event) => {
  if (menuToggle && (event.target as HTMLElement).closest("a")) menuToggle.checked = false;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.checked) {
    menuToggle.checked = false;
    menuToggle.focus();
  }
});

// P5 · Newsletter: es una demo, el navegador valida el email pero no se envía nada.
const newsletter = document.querySelector<HTMLFormElement>("#newsletter");
const newsletterStatus = document.querySelector<HTMLParagraphElement>("#newsletter-status");

newsletter?.addEventListener("submit", (event) => {
  event.preventDefault();
  // Bloqueamos el formulario para que se vea el estado disabled: de los campos.
  newsletter.querySelectorAll<HTMLInputElement | HTMLButtonElement>("input, button").forEach((field) => {
    field.disabled = true;
  });
  if (newsletterStatus) {
    newsletterStatus.textContent = "Esto es una demo: no hemos guardado tu email.";
  }
});
