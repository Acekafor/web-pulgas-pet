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

// Carga diferida: la imagen solo se pide cuando su espacio está cerca de la pantalla.
// Se usa IntersectionObserver porque un Image() fuera del DOM con loading="lazy" nunca se carga
// en algunos navegadores (Edge muestra "[Intervention] Images loaded lazily...").
const observador =
  typeof IntersectionObserver === "undefined"
    ? null
    : new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            observador.unobserve(entrada.target);
            cargarImagen(entrada.target);
          });
        },
        { rootMargin: "300px" }
      );

function cargarImagen(s) {
  const rutaOriginal = normalizarRutaImagen(s.dataset.img);

  const im = new Image();
  im.alt = s.dataset.desc || "";
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
}

export function activarImagenes(raiz = document) {
  $$(".slot:not(.ok)", raiz).forEach((s) => {
    const rutaRaw = s.dataset.img;
    if (!rutaRaw || s.dataset.cargando) return;
    s.dataset.cargando = "1";

    const rutaOriginal = normalizarRutaImagen(rutaRaw);
    s.title = rutaOriginal;
    const simple = s.classList.contains("sm") || !MOSTRAR_ETIQUETAS;
    s.innerHTML = simple
      ? "🐾"
      : `<span>📷 ${esc(s.dataset.desc || "Imagen")}<br><b>${esc(rutaRaw)}</b></span>`;

    if (observador) observador.observe(s);
    else cargarImagen(s);
  });
}
