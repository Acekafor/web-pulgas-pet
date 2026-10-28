import { test } from "node:test";
import assert from "node:assert/strict";
import { mensajeOrden } from "../../frontend/assets/js/whatsapp.js";

test("mensajeOrden debe estructurar correctamente la orden y la nota del cliente", () => {
  const items = [
    { cant: 2, nombre: "Monello", presentacion: "Dog tradicional" },
    { cant: 1, nombre: "Chunky", presentacion: "" }
  ];
  const resultado = mensajeOrden(items, "David", "Entregar en la tarde");

  assert.match(resultado, /soy David/);
  assert.match(resultado, /- 2 x Monello \(Dog tradicional\)/);
  assert.match(resultado, /- 1 x Chunky/);
  assert.match(resultado, /Nota: Entregar en la tarde/);
});