import { MOSTRAR_ETIQUETAS } from "./config.js";
import { $$, esc } from "./utils.js";

const aWebp = (ruta) =>
  ruta && !ruta.startsWith("http") ? ruta.replace(/\.(jpg|jpeg|png)$/i, ".webp") : ruta;

function normalizarRutaImagen(ruta) {
  if (!ruta) return "";
  if (ruta.includes("drive.google.com")) {
    const match = ruta.match(/\/d\/([a-zA-Z0-9_-]+)/) || ruta.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }
  return ruta;
}

export function activarImagenes(raiz = document) {
  $$(".slot:not(.ok)", raiz).forEach((s) => {
    const rutaRaw = s.dataset.img;
    if (!rutaRaw) return;

    const rutaOriginal = normalizarRutaImagen(rutaRaw);
    s.title = rutaOriginal;
    const simple = s.classList.contains("sm") || !MOSTRAR_ETIQUETAS;
    s.innerHTML = simple
      ? "🐾"
      : `<span>📷 ${esc(s.dataset.desc || "Imagen")}<br><b>${esc(rutaRaw)}</b></span>`;

    const im = new Image();
    im.alt = s.dataset.desc || "";
    im.loading = "lazy";
    im.decoding = "async";

    im.onload = () => {
      s.classList.add("ok");
      s.innerHTML = "";
      s.append(im);
    };

    const esExterna = rutaOriginal.startsWith("http");
    const rutaOptimizada = aWebp(rutaOriginal);

    if (!esExterna && rutaOptimizada !== rutaOriginal) {
      im.onerror = () => {
        im.onerror = null;
        im.src = rutaOriginal;
      };
      im.src = rutaOptimizada;
    } else {
      im.onerror = () => {
        im.onerror = null;
        s.innerHTML = "🐾";
      };
      im.src = rutaOriginal;
    }
  });
}
