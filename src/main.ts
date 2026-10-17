import "./style.css";

// Menú móvil: solo cambiamos aria-expanded; el CSS (peer-aria-expanded:flex) hace el resto.
const menuButton = document.querySelector<HTMLButtonElement>("#menu-button");
const menu = document.querySelector<HTMLUListElement>("#menu");

const setMenuOpen = (open: boolean) => {
  menuButton?.setAttribute("aria-expanded", String(open));
};

menuButton?.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

menu?.addEventListener("click", (event) => {
  if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

// Newsletter: es una demo, el navegador valida el email pero no se envía nada.
const newsletter = document.querySelector<HTMLFormElement>("#newsletter");
const newsletterStatus = document.querySelector<HTMLParagraphElement>("#newsletter-status");

newsletter?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (newsletterStatus) {
    newsletterStatus.textContent = "Esto es una demo: no hemos guardado tu email.";
  }
});
