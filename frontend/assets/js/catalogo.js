import { CATALOGO, CATEGORIAS } from "./config.js";
import { PRODUCTOS_RESPALDO } from "../../data/productos-respaldo.js";
import { $, norm, slug, esc } from "./utils.js";
import { activarImagenes } from "./imagenes.js";
import { agregar } from "./orden.js";

/* ===== Obtención de datos (la única parte que cambia al conectar Node) ===== */

function parseCSV(texto) {
  const filas = [];
  let fila = [],
    celda = "",
    comillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (comillas) {
      if (c === '"') {
        if (texto[i + 1] === '"') {
          celda += '"';
          i++;
        } else comillas = false;
      } else celda += c;
    } else if (c === '"') comillas = true;
    else if (c === ",") {
      fila.push(celda);
      celda = "";
    } else if (c === "\n") {
      fila.push(celda);
      filas.push(fila);
      fila = [];
      celda = "";
    } else if (c !== "\r") celda += c;
  }
  if (celda || fila.length) {
    fila.push(celda);
    filas.push(fila);
  }
  return filas;
}

// Columnas de la hoja: nombre, categoria, presentaciones (separadas por ;), nota, imagen, destacado, disponible
function desdeCSV(texto) {
  const [cabecera, ...filas] = parseCSV(texto);
  const claves = cabecera.map(norm);
  const lista = filas
    .map((f) => Object.fromEntries(claves.map((k, i) => [k, (f[i] || "").trim()])))
    .filter((o) => o.nombre && norm(o.disponible) !== "no")
    .map((o) => ({
      id: slug(o.nombre),
      nombre: o.nombre,
      categoria: o.categoria || "Otros",
      presentaciones: o.presentaciones
        ? o.presentaciones
            .split(";")
            .map((v) => v.trim())
            .filter(Boolean)
        : [],
      nota: o.nota,
      imagen: CATALOGO.rutaImagenes + (o.imagen || `${slug(o.nombre)}.jpg`),
      destacado: norm(o.destacado) === "si",
      disponible: true
    }));
  if (!lista.length) throw new Error("La hoja no tiene productos");
  return lista;
}

export async function obtenerProductos() {
  try {
    if (CATALOGO.apiUrl) {
      const r = await fetch(`${CATALOGO.apiUrl}/productos`);
      if (!r.ok) throw new Error(`API ${r.status}`);
      return (await r.json()).filter((p) => p.disponible !== false);
    }
    if (CATALOGO.csvUrl) {
      const r = await fetch(CATALOGO.csvUrl, { cache: "no-store" });
      if (!r.ok) throw new Error(`Sheets ${r.status}`);
      return desdeCSV(await r.text());
    }
  } catch (e) {
    console.warn("Se usa el catálogo de respaldo:", e);
  }
  return PRODUCTOS_RESPALDO;
}

// Categorías conocidas en orden, más las nuevas que aparezcan en los datos.
export const categoriasDe = (productos) => [
  ...CATEGORIAS,
  ...new Set(productos.map((p) => p.categoria).filter((c) => !CATEGORIAS.includes(c)))
];

/* ===== Vista ===== */

function tarjeta(p) {
  const pres = p.presentaciones || [];
  const selector =
    pres.length > 1
      ? `<select aria-label="Presentación de ${esc(p.nombre)}">${pres.map((v) => `<option>${esc(v)}</option>`).join("")}</select>`
      : "";
  return `<article class="prod" data-id="${esc(p.id)}">
    <div class="slot sq" data-img="${esc(p.imagen)}" data-desc="Foto: ${esc(p.nombre)}"></div>
    <small>${esc(p.categoria)}</small><h3>${esc(p.nombre)}</h3>
    ${p.nota ? `<p class="vars">${esc(p.nota)}</p>` : ""}${selector}
    <div class="pie"><div class="cant"><button type="button" data-m="-1" aria-label="Menos">−</button><output>1</output><button type="button" data-m="1" aria-label="Más">+</button></div>
    <button type="button" class="btn v" data-add>Agregar</button></div></article>`;
}

function pintar(destino, lista) {
  destino.innerHTML = lista.length
    ? lista.map(tarjeta).join("")
    : '<p class="vacio">No encontramos productos con esa búsqueda.</p>';
  activarImagenes(destino);
  destino.onclick = (e) => {
    const b = e.target.closest("button");
    const art = b && b.closest(".prod");
    if (!art) return;
    const salida = $("output", art);
    if (b.dataset.m) {
      salida.textContent = Math.max(1, Math.min(99, +salida.textContent + +b.dataset.m));
      return;
    }
    if (b.hasAttribute("data-add")) {
      const producto = lista.find((p) => String(p.id) === art.dataset.id);
      const selector = $("select", art);
      const presentacion = selector ? selector.value : (producto.presentaciones || [])[0] || "";
      agregar(producto, presentacion, +salida.textContent);
      salida.textContent = 1;
      b.textContent = "✔ Agregado";
      setTimeout(() => (b.textContent = "Agregar"), 1200);
    }
  };
}

// Página catalogo.html
export function iniciarCatalogo(productos, categorias) {
  const caja = $("#catalogo");
  if (!caja) return;
  const q = new URLSearchParams(location.search);
  let cat = q.get("cat") || "Todos";
  let texto = norm(q.get("q"));
  const filtros = $("#filtros");
  const buscador = $("#buscar");
  buscador.value = q.get("q") || "";

  const dibujar = () => {
    filtros.innerHTML = ["Todos", ...categorias]
      .map((c) => `<button type="button" class="${c === cat ? "on" : ""}">${esc(c)}</button>`)
      .join("");
    pintar(
      caja,
      productos.filter(
        (p) => (cat === "Todos" || p.categoria === cat) && norm(p.nombre).includes(texto)
      )
    );
  };
  filtros.onclick = (e) => {
    if (e.target.tagName === "BUTTON") {
      cat = e.target.textContent;
      dibujar();
    }
  };
  buscador.oninput = () => {
    texto = norm(buscador.value);
    dibujar();
  };
  dibujar();
}

// Página index.html: destacados y categorías
export function iniciarInicio(productos, categorias) {
  const destacados = $("#destacados");
  if (destacados)
    pintar(
      destacados,
      productos.filter((p) => p.destacado)
    );
  const cats = $("#categorias");
  if (cats) {
    cats.innerHTML = categorias
      .map(
        (n, i) =>
          `<a href="catalogo.html?cat=${encodeURIComponent(n)}"><div class="slot rd" data-img="assets/img/banners/categoria-${i + 1}.jpg" data-desc="Categoría: ${esc(n)}"></div>${esc(n)}</a>`
      )
      .join("");
    activarImagenes(cats);
  }
}
