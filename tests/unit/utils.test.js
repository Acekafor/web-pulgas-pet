import { test } from "node:test";
import assert from "node:assert/strict";
import { norm, slug, esc } from "../../frontend/assets/js/utils.js";

test("norm debe pasar texto a minúsculas y remover tildes", () => {
  assert.equal(norm("PAÑITOS HÚMEDOS"), "panitos humedos");
  assert.equal(norm("  Chunky  "), "chunky");
});

test("slug debe convertir nombres de productos a URLs limpias", () => {
  assert.equal(slug("Alimento Para Perro 10kg!"), "alimento-para-perro-10kg");
  assert.equal(slug("Pecheras, correas y collares"), "pecheras-correas-y-collares");
});

test("esc debe sanear caracteres especiales para prevenir XSS", () => {
  assert.equal(
    esc('<script>alert("xss")</script>'),
    "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
  );
  assert.equal(esc(null), "");
});