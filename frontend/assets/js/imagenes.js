import { MOSTRAR_ETIQUETAS } from "./config.js";
import { $$, esc } from "./utils.js";

// Convierte extensiones .jpg, .jpeg o .png a .webp
const aWebp = (ruta) => (ruta ? ruta.replace(/\.(jpg|jpeg|png)$/i, ".webp") : ruta);

// Cada espacio .slot declara su archivo en data-img. Si la versión .webp existe la usa;
// si falla, reintenta con la imagen original (.jpg/.png).
export function activarImagenes(raiz = document) {
  $$(".slot:not(.ok)", raiz).forEach((s) => {
    const rutaOriginal = s.dataset.img;
    if (!rutaOriginal) return;

    s.title = rutaOriginal;
    const simple = s.classList.contains("sm") || !MOSTRAR_ETIQUETAS;
    s.innerHTML = simple
      ? "🐾"
      : `<span>📷 ${esc(s.dataset.desc || "Imagen")}<br><b>${esc(rutaOriginal)}</b></span>`;

    const im = new Image();
    im.alt = s.dataset.desc || "";
    im.loading = "lazy";
    im.decoding = "async";

    im.onload = () => {
      s.classList.add("ok");
      s.innerHTML = "";
      s.append(im);
    };

    const rutaOptimizada = aWebp(rutaOriginal);

    // Si la imagen no era WebP, intentamos cargar .webp primero
    if (rutaOptimizada !== rutaOriginal) {
      im.onerror = () => {
        im.onerror = null; // Evita bucle si la imagen original tampoco existe
        im.src = rutaOriginal;
      };
      im.src = rutaOptimizada;
    } else {
      im.src = rutaOriginal;
    }
  });
}
