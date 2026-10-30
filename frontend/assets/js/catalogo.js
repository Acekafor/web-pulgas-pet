import { SHEET_URL } from "./config.js";
import { PRODUCTOS_RESPALDO } from "../../data/productos-respaldo.js";
import { $, $$, esc, norm } from "./utils.js";
import { activarImagenes } from "./imagenes.js";
import { agregar } from "./orden.js";

function csvAObjetos(csvTexto) {
  const lineas = csvTexto.trim().split("\n");
  if (lineas.length < 2) return [];

  const cabeceras = lineas[0].split(",").map((c) => c.trim().toLowerCase());

  return lineas.slice(1).map((linea) => {
    const valores = linea.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || linea.split(",");
    const prod = {};

    cabeceras.forEach((col, idx) => {
      const val = (valores[idx] || "").trim().replace(/^"|"$/g, "");
      prod[col] = val;
    });

    return {
      id: prod.id || norm(prod.nombre || "").replace(/\s+/g, "-"),
      nombre: prod.nombre || "Producto sin nombre",
      categoria: prod.categoria || "General",
      precio: Number(prod.precio) || 0,
      presentacion: prod.presentacion || "",
      destacado: (prod.destacado || "").toLowerCase() === "si",
      agotado: (prod.agotado || "").toLowerCase() === "si",
      imagen: prod.imagen || "",
      descripcion: prod.descripcion || ""
    };
  });
}

export async function obtenerProductos() {
  if (!SHEET_URL) return PRODUCTOS_RESPALDO;

  try {
    const res = await fetch(SHEET_URL);
    if (!res.ok) throw new Error("Error al obtener la hoja de cálculo");
    const textoCsv = await res.text();
    const productos = csvAObjetos(textoCsv);
    return productos.length ? productos : PRODUCTOS_RESPALDO;
  } catch (error) {
    console.warn("Error al cargar Google Sheets, usando respaldo local:", error);
    return PRODUCTOS_RESPALDO;
  }
}

export function categoriasDe(productos) {
  const cats = new Set(productos.map((p) => p.categoria).filter(Boolean));
  return Array.from(cats).sort();
}

function tarjetaProducto(p) {
  const precioFormateado = p.precio ? `$${p.precio.toLocaleString("es-CO")}` : "Consultar";
  const esAgotado = p.agotado === true || p.agotado === "si" || p.disponible === false;
  const claseAgotado = esAgotado ? " prod-agotado" : "";
  const badgeAgotado = esAgotado ? '<span class="badge-agotado">Agotado</span>' : "";
  const botonAccion = esAgotado
    ? '<button class="btn btn-disabled" disabled>Agotado</button>'
    : `<button class="btn" data-add="${esc(p.id)}">Agregar</button>`;

  const presLabel =
    p.presentacion && p.presentacion.toLowerCase() !== "no"
      ? `<span class="pres-badge">${esc(p.presentacion)}</span>`
      : "";

  return `<article class="prod${claseAgotado}" data-id="${esc(p.id)}">
    <div class="slot" data-img="${esc(p.imagen || "")}" data-desc="${esc(p.nombre)}"></div>
    ${badgeAgotado}
    <div class="prod-body">
      <span class="cat">${esc(p.categoria)}</span>
      <h3>${esc(p.nombre)}</h3>
      ${presLabel}
      <div class="prod-foot">
        <span class="precio">${precioFormateado}</span>
        ${botonAccion}
      </div>
    </div>
  </article>`;
}

export function iniciarInicio(productos) {
  const contDestacados = $("#destacados");
  if (!contDestacados) return;

  const destacados = productos.filter((p) => p.destacado);
  contDestacados.innerHTML = destacados.map(tarjetaProducto).join("");
  activarImagenes(contDestacados);
}

export function iniciarCatalogo(productos, categorias) {
  const contCatalogo = $("#catalogo");
  if (!contCatalogo) return;

  // 1. Obtener categoría desde parámetros de la URL (?cat=Snacks)
  const params = new URLSearchParams(window.location.search);
  const catUrl = params.get("cat");

  const contFiltros = $("#filtros-cat") || $("#filtros");
  if (contFiltros) {
    const catEncontrada = categorias.find((c) => norm(c) === norm(catUrl));
    const catInicial = catEncontrada || "todas";

    // 2. Renderizar chips marcando 'on' al botón correspondiente
    contFiltros.innerHTML = `<button class="chip ${catInicial === "todas" ? "on" : ""}" data-cat="todas">Todas</button>${categorias
      .map((c) => {
        const esActiva = norm(c) === norm(catInicial);
        return `<button class="chip ${esActiva ? "on" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`;
      })
      .join("")}`;

    // 3. Desplazar suavemente el scroll hacia el chip activo
    if (catEncontrada) {
      setTimeout(() => {
        const chipActivo = contFiltros.querySelector(".chip.on");
        chipActivo?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }, 100);
    }
  }

  function filtrar() {
    const busqueda = norm($("#buscar")?.value || "");
    const catSeleccionada = contFiltros
      ? contFiltros.querySelector(".chip.on")?.dataset.cat || "todas"
      : "todas";

    const filtrados = productos.filter((p) => {
      const coincideTexto =
        norm(p.nombre).includes(busqueda) || norm(p.descripcion || "").includes(busqueda);
      const coincideCat = catSeleccionada === "todas" || p.categoria === catSeleccionada;
      return coincideTexto && coincideCat;
    });

    contCatalogo.innerHTML = filtrados.length
      ? filtrados.map(tarjetaProducto).join("")
      : '<p class="vacio">No se encontraron productos en esta categoría.</p>';

    activarImagenes(contCatalogo);
  }

  $("#buscar")?.addEventListener("input", filtrar);
  contFiltros?.addEventListener("click", (e) => {
    if (e.target.classList.contains("chip")) {
      $$(".chip", contFiltros).forEach((c) => c.classList.remove("on"));
      e.target.classList.add("on");
      filtrar();
    }
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (btn) {
      const prod = productos.find((p) => p.id === btn.dataset.add);
      if (prod && !prod.agotado && prod.disponible !== false) {
        agregar(prod, prod.presentacion || "", 1);
      }
    }
  });

  // 4. Filtrar la vista con la categoría preseleccionada
  filtrar();
}
