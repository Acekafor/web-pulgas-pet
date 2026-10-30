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
  "Antipulgas y salud",
  "Artículos de aseo",
  "Servicios"
];

// Enlace publicado de Google Sheets como CSV para el catálogo dinámico
export const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1bJHgD95Dn-uJuLIU9fPQ-9u1Yg_RR5gq_XqSuAybkD4/export?format=csv";

// false = oculta rutas de prueba en las imágenes. Ponlo en false para producción.
export const MOSTRAR_ETIQUETAS = false;

// Clave de almacenamiento local para mantener los productos del carrito
export const LLAVE_ORDEN = "pp_orden";
