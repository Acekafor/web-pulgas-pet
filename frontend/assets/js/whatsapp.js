import { TIENDA } from "./config.js";
import { $, $$ } from "./utils.js";

export const urlWhatsApp = (texto = "Hola Pulgas Pet, quiero información.") =>
  `https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(texto)}`;

export function mensajeOrden(items, nombre, nota = "") {
  const lineas = items
    .map((i) => `- ${i.cant} x ${i.nombre}${i.presentacion ? ` (${i.presentacion})` : ""}`)
    .join("\n");
  return `Hola Pulgas Pet, soy ${nombre}. Quiero reservar para recoger y pagar en la tienda:\n${lineas}${nota ? `\nNota: ${nota}` : ""}`;
}

export const abrirWhatsApp = (texto) => window.open(urlWhatsApp(texto), "_blank", "noopener");

// Enlaces genéricos: <a data-wa href="#">
export function activarEnlacesWhatsApp() {
  $$("[data-wa]").forEach((a) => {
    a.href = urlWhatsApp();
    a.target = "_blank";
    a.rel = "noopener";
  });
}

// Formulario de contacto: <form id="form-wa">
export function iniciarFormularioContacto() {
  const f = $("#form-wa");
  if (!f) return;
  f.onsubmit = (e) => {
    e.preventDefault();
    abrirWhatsApp(`Hola Pulgas Pet, soy ${f.nombre.value}. ${f.mensaje.value}`);
  };
}
