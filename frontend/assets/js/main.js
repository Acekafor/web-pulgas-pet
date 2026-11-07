import { TIENDA, CATEGORIAS } from "./config.js";
import { $, $$, esc } from "./utils.js";
import { activarImagenes } from "./imagenes.js";
import { pintarHorario } from "./horario.js";
import { urlWhatsApp, activarEnlacesWhatsApp, iniciarFormularioContacto } from "./whatsapp.js";
import { actualizarContador, iniciarOrden } from "./orden.js";
import {
  obtenerProductos,
  categoriasDe,
  iniciarCatalogo,
  iniciarInicio,
  activarAgregar,
  activarDetalle
} from "./catalogo.js";

/* ===== Registrar Service Worker (PWA) ===== */

function registrarServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.warn("Error al registrar ServiceWorker:", err);
      });
    });
  }
}

/* ===== Componentes de layout compartidos ===== */

function encabezado() {
  const limpio = (s) => s.replace(".html", "");
  const actual = limpio(location.pathname.split("/").pop() || "index");
  const links = [
    ["index.html", "Inicio"],
    ["catalogo.html", "Catálogo"],
    ["nosotros.html", "Nosotros"],
    ["contacto.html", "Contacto"]
  ];
  $("#hdr").innerHTML = `<div class="wrap"><header class="nav">
    <a class="logo" href="index.html"><span class="slot sm" data-img="assets/img/logo/logo-pulgas-pet.png" data-desc="Logo"></span>Pulgas Pet</a>
    <nav aria-label="Principal">${links.map(([h, t]) => `<a href="${h}"${limpio(h) === actual ? ' class="on"' : ""}>${t}</a>`).join("")}</nav>
    <a class="btn" href="orden.html">🛒 Mi orden (<span data-cuenta>0</span>)</a></header></div>`;
}

function pie() {
  $("#ftr").innerHTML = `<footer><div class="wrap">
    <div><h3>Pulgas Pet</h3><p>Tienda de mascotas.<br>${esc(TIENDA.direccion)}</p></div>
    <div><h3>Tienda</h3><a href="index.html">Inicio</a><a href="catalogo.html">Catálogo</a><a href="orden.html">Mi orden</a><a href="nosotros.html">Nosotros</a><a href="contacto.html">Contacto</a></div>
    <div><h3>Categorías</h3>${CATEGORIAS.map((c) => `<a href="catalogo.html?cat=${encodeURIComponent(c)}">${esc(c)}</a>`).join("")}</div>
    <div><h3>Horario</h3><p>${TIENDA.horarioResumen.map(esc).join("<br>")}</p></div>
    <div><h3>Escríbenos</h3><a href="${urlWhatsApp()}" target="_blank" rel="noopener">WhatsApp ${esc(TIENDA.whatsapp.slice(2))}</a></div>
    <p class="c">© ${new Date().getFullYear()} Pulgas Pet · Catálogo digital</p></div></footer>`;
}

/* ===== Arranque ===== */

async function iniciar() {
  encabezado();
  pie();
  pintarHorario();
  activarEnlacesWhatsApp();
  iniciarFormularioContacto();
  iniciarOrden();
  activarImagenes();
  actualizarContador();
  registrarServiceWorker();

  if ($("#catalogo") || $("#destacados") || $("#categorias")) {
    $$("#catalogo, #destacados").forEach(
      (e) => (e.innerHTML = '<p class="vacio">Cargando catálogo…</p>')
    );
    const productos = await obtenerProductos();
    const categorias = categoriasDe(productos);
    iniciarInicio(productos, categorias);
    iniciarCatalogo(productos, categorias);
    activarAgregar(productos);
    activarDetalle(productos);
  }
}

iniciar();
