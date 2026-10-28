import { MOSTRAR_ETIQUETAS } from "./config.js";
import { $$, esc } from "./utils.js";

// Cada espacio .slot declara su archivo en data-img. Si el archivo existe se muestra solo;
// si no, queda una caja con la ruta donde guardarlo.
export function activarImagenes(raiz = document) {
  $$(".slot:not(.ok)", raiz).forEach((s) => {
    const ruta = s.dataset.img;
    s.title = ruta;
    const simple = s.classList.contains("sm") || !MOSTRAR_ETIQUETAS;
    s.innerHTML = simple
      ? "🐾"
      : `<span>📷 ${esc(s.dataset.desc || "Imagen")}<br><b>${esc(ruta)}</b></span>`;
    const im = new Image();
    im.alt = s.dataset.desc || "";
    im.onload = () => {
      s.classList.add("ok");
      s.innerHTML = "";
      s.append(im);
    };
    im.src = ruta;
  });
}
