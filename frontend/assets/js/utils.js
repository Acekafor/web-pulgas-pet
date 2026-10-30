// Seleccionar un único elemento del DOM
export const $ = (sel, padre = document) => (padre || document).querySelector(sel);

// Seleccionar múltiples elementos del DOM y retornar un Array
export const $$ = (sel, padre = document) => Array.from((padre || document).querySelectorAll(sel));

// Escapar caracteres especiales para prevenir inyección HTML (XSS)
export const esc = (txt) =>
  String(txt ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// Normalizar texto: minúsculas, sin tildes ni acentos
export const norm = (txt) =>
  String(txt ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

// Convertir nombres a slugs limpios
export const slug = (txt) =>
  norm(txt)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
