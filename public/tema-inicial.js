// Se carga en el <head>, antes de pintar: aplica el tema guardado para que no haya
// un parpadeo del tema claro. Sin nada guardado, sigue la preferencia del sistema.
try {
  const raiz = document.documentElement;
  const tema = localStorage.getItem("tema");
  const oscuro = localStorage.getItem("oscuro");
  if (tema) raiz.dataset.theme = tema;
  if (oscuro === "1" || (oscuro === null && matchMedia("(prefers-color-scheme: dark)").matches)) {
    raiz.classList.add("dark");
  }
} catch {
  // localStorage puede no estar disponible (modo privado estricto): nos quedamos con el tema por defecto.
}
