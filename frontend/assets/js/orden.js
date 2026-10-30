import { LLAVE_ORDEN } from "./config.js";
import { $, esc } from "./utils.js";
import { abrirWhatsApp, mensajeOrden } from "./whatsapp.js";

export const leerOrden = () => {
  try {
    return JSON.parse(localStorage.getItem(LLAVE_ORDEN)) || [];
  } catch {
    return [];
  }
};

export function actualizarContador() {
  const n = leerOrden().reduce((s, i) => s + i.cant, 0);
  document.querySelectorAll("[data-cuenta]").forEach((e) => (e.textContent = n));
}

export function guardarOrden(orden) {
  try {
    localStorage.setItem(LLAVE_ORDEN, JSON.stringify(orden));
  } catch {
    /* almacenamiento no disponible */
  }
  actualizarContador();
}

export function agregar(producto, presentacion = "", cant = 1) {
  const orden = leerOrden();
  const existente = orden.find((i) => i.id === producto.id && i.presentacion === presentacion);
  if (existente) existente.cant = Math.min(99, existente.cant + cant);
  else orden.push({ id: producto.id, nombre: producto.nombre, presentacion, cant });
  guardarOrden(orden);
}

// Alias para mantener compatibilidad
export { agregar as agregarAlCarrito };

// Página orden.html
export function iniciarOrden() {
  const caja = $("#orden");
  const form = $("#orden-form");
  if (!caja || !form) return;

  const dibujar = () => {
    const orden = leerOrden();
    form.hidden = !orden.length;
    caja.innerHTML = orden.length
      ? `<ul class="lista">${orden
          .map(
            (i, k) => `<li>
          <div><b>${esc(i.nombre)}</b>${i.presentacion ? `<br><small>${esc(i.presentacion)}</small>` : ""}</div>
          <div class="cant"><button type="button" data-k="${k}" data-m="-1" aria-label="Menos">−</button><output>${i.cant}</output><button type="button" data-k="${k}" data-m="1" aria-label="Más">+</button></div>
          <button type="button" class="quitar" data-k="${k}" data-q aria-label="Quitar ${esc(i.nombre)}">✕</button></li>`
          )
          .join("")}</ul>`
      : '<p class="vacio">Tu orden está vacía. <a href="catalogo.html">Ir al catálogo</a></p>';
  };

  caja.onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const orden = leerOrden();
    const k = +b.dataset.k;
    if (b.hasAttribute("data-q")) orden.splice(k, 1);
    else orden[k].cant = Math.max(1, Math.min(99, orden[k].cant + +b.dataset.m));
    guardarOrden(orden);
    dibujar();
  };

  form.onsubmit = (e) => {
    e.preventDefault();
    const orden = leerOrden();
    if (!orden.length) return;
    abrirWhatsApp(mensajeOrden(orden, form.nombre.value, form.nota.value.trim()));
  };

  $("#vaciar").onclick = () => {
    guardarOrden([]);
    dibujar();
  };

  dibujar();
}
