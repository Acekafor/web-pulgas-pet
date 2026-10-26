// Configuración central del sitio. Es el único archivo que se toca para cambiar datos de la tienda.
export const TIENDA = {
  nombre: "Pulgas Pet",
  whatsapp: "573102645203", // con indicativo, sin + ni espacios
  direccion: "Calle 14 # 79G, Local 3 · Barrio Visión de Colombia, Bogotá",
  // Orden de Date.getDay(): domingo = 0 ... sábado = 6
  horario: [
    { dia: "Domingo", hora: "10 a.m.–7 p.m." },
    { dia: "Lunes", hora: "9 a.m.–9 p.m." },
    { dia: "Martes", hora: "9 a.m.–9 p.m." },
    { dia: "Miércoles", hora: "9 a.m.–9 p.m." },
    { dia: "Jueves", hora: "9 a.m.–9 p.m." },
    { dia: "Viernes", hora: "9 a.m.–9 p.m." },
    { dia: "Sábado", hora: "9 a.m.–9 p.m." }
  ],
  horarioResumen: ["Lun–Sáb: 9 a.m.–9 p.m.", "Domingo: 10 a.m.–7 p.m."]
};

export const CATEGORIAS = [
  "Alimentos",
  "Snacks",
  "Juguetes",
  "Accesorios",
  "Ropa",
  "Camas y jaulas",
  "Antipulgas y salud",
  "Artículos de aseo",
  "Servicios"
];

// Fuente del catálogo, en orden de prioridad:
// 1. apiUrl: backend Node (futuro). Debe responder GET {apiUrl}/productos con el mismo formato.
// 2. csvUrl: hoja de Google Sheets publicada como CSV.
// 3. Respaldo local: data/productos-respaldo.js
export const CATALOGO = {
  apiUrl: "",
  csvUrl: "",
  rutaImagenes: "assets/img/productos/"
};

// true = los espacios de imagen vacíos muestran su ruta. Ponlo en false al publicar.
export const MOSTRAR_ETIQUETAS = true;

export const LLAVE_ORDEN = "pp_orden";