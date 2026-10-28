import { TIENDA } from "./config.js";
import { $, esc } from "./utils.js";

// Dibuja la tabla de horario si la página tiene <div id="horario">. Resalta el día de hoy.
export function pintarHorario() {
  const caja = $("#horario");
  if (!caja) return;
  const hoy = new Date().getDay();
  const filas = TIENDA.horario
    .map(
      (d, i) =>
        `<tr${i === hoy ? ' class="hoy"' : ""}><td>${esc(d.dia)}${i === hoy ? " (hoy)" : ""}</td><td>${esc(d.hora)}</td></tr>`
    )
    .join("");
  caja.innerHTML = `<table class="horario"><caption>Horario de atención</caption><tbody>${filas}</tbody></table>`;
}
