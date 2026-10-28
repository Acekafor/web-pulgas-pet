// Catálogo de respaldo: se usa si la API y Google Sheets no responden.
// Mismo formato que devolverá el backend: { id, nombre, categoria, presentaciones, nota, imagen, destacado, disponible }
const img = (archivo) => `assets/img/productos/${archivo}`;

export const PRODUCTOS_RESPALDO = [
  {
    id: "monello",
    nombre: "Monello",
    categoria: "Alimentos",
    presentaciones: ["Dog tradicional", "Dog raza pequeña", "Dog Puppy"],
    nota: "",
    imagen: img("monello.jpg"),
    destacado: true,
    disponible: true
  },
  {
    id: "br-for-dog",
    nombre: "BR for Dog",
    categoria: "Alimentos",
    presentaciones: [
      "Adulto raza pequeña",
      "Pure puppy lamb",
      "Pure adulto lamb",
      "Adulto raza mediana",
      "Puppy raza mediana",
      "Puppy raza pequeña"
    ],
    nota: "",
    imagen: img("br-for-dog.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "agility-gold",
    nombre: "Agility Gold",
    categoria: "Alimentos",
    presentaciones: [
      "Pequeños adultos",
      "Grandes adultos",
      "Grandes cachorros",
      "Pequeños cachorros",
      "Cachorros primera fase",
      "Adultos obesos"
    ],
    nota: "",
    imagen: img("agility-gold.jpg"),
    destacado: true,
    disponible: true
  },
  {
    id: "chunky",
    nombre: "Chunky",
    categoria: "Alimentos",
    presentaciones: [
      "Pollo",
      "Adultos",
      "Cordero",
      "Arroz y salmón adulto",
      "Pollo cachorro",
      "Pollo razas pequeñas adulto",
      "Pollo adultos mayores"
    ],
    nota: "",
    imagen: img("chunky.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "alimento-humedo",
    nombre: "Alimento húmedo",
    categoria: "Alimentos",
    presentaciones: ["Pedigree", "Dog Chow", "Dogourmet", "Agility Gold"],
    nota: "",
    imagen: img("alimento-humedo.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "snacks-perro",
    nombre: "Snacks para perro",
    categoria: "Snacks",
    presentaciones: [
      "Chorizo para perro",
      "Helados para perro",
      "Cabanos",
      "Cookies de carnaza",
      "Biscuits de distintas marcas"
    ],
    nota: "",
    imagen: img("snacks-perro.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "alimentos-de-carnaza",
    nombre: "Alimentos de carnaza",
    categoria: "Snacks",
    presentaciones: [],
    nota: "",
    imagen: img("carnaza.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "juguetes-para-perros",
    nombre: "Juguetes para perros",
    categoria: "Juguetes",
    presentaciones: ["Interactivos", "De jalar", "Peluches", "Huesos de caucho"],
    nota: "",
    imagen: img("juguetes-perro.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "juguetes-y-rascadores-para-gatos",
    nombre: "Juguetes y rascadores para gatos",
    categoria: "Juguetes",
    presentaciones: ["Rascadores", "Juguetes interactivos"],
    nota: "",
    imagen: img("juguetes-gato.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "pecheras-correas-y-collares",
    nombre: "Pecheras, correas y collares",
    categoria: "Accesorios",
    presentaciones: ["Pecheras", "Correas", "Collares"],
    nota: "",
    imagen: img("pecheras-correas-collares.jpg"),
    destacado: true,
    disponible: true
  },
  {
    id: "conos-de-proteccion",
    nombre: "Conos de protección",
    categoria: "Accesorios",
    presentaciones: [],
    nota: "",
    imagen: img("conos.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "capas-para-la-lluvia",
    nombre: "Capas para la lluvia",
    categoria: "Ropa",
    presentaciones: [],
    nota: "",
    imagen: img("capas-lluvia.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "zapatos-para-mascotas",
    nombre: "Zapatos para mascotas",
    categoria: "Ropa",
    presentaciones: [],
    nota: "",
    imagen: img("zapatos.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "camas",
    nombre: "Camas",
    categoria: "Camas y jaulas",
    presentaciones: [],
    nota: "Distintos tamaños. Indica el que necesitas en las notas de la orden.",
    imagen: img("camas.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "jaulas",
    nombre: "Jaulas",
    categoria: "Camas y jaulas",
    presentaciones: [],
    nota: "Distintos tamaños. Indica el que necesitas en las notas de la orden.",
    imagen: img("jaulas.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "antipulgas-para-perros",
    nombre: "Antipulgas para perros",
    categoria: "Antipulgas y salud",
    presentaciones: ["Bravecto", "NexGard"],
    nota: "Según el peso de tu mascota. Indícalo en las notas de la orden.",
    imagen: img("antipulgas.jpg"),
    destacado: true,
    disponible: true
  },
  {
    id: "jabones-antipulgas",
    nombre: "Jabones antipulgas",
    categoria: "Antipulgas y salud",
    presentaciones: [],
    nota: "",
    imagen: img("jabones-antipulgas.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "peines-deslanadores",
    nombre: "Peines deslanadores",
    categoria: "Artículos de aseo",
    presentaciones: [],
    nota: "",
    imagen: img("peines.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "shampoo-y-talco-canamor",
    nombre: "Shampoo y talco CanAmor",
    categoria: "Artículos de aseo",
    presentaciones: ["Shampoo CanAmor", "Talco CanAmor"],
    nota: "",
    imagen: img("canamor.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "perfumes-para-mascotas",
    nombre: "Perfumes para mascotas",
    categoria: "Artículos de aseo",
    presentaciones: [],
    nota: "",
    imagen: img("perfumes.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "cepillos-pet-spa",
    nombre: "Cepillos Pet Spa",
    categoria: "Artículos de aseo",
    presentaciones: [],
    nota: "",
    imagen: img("cepillos.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "panitos-humedos-de-limpieza",
    nombre: "Pañitos húmedos de limpieza",
    categoria: "Artículos de aseo",
    presentaciones: [],
    nota: "",
    imagen: img("panitos.jpg"),
    destacado: false,
    disponible: true
  },
  {
    id: "grabado-de-dijes-para-collares",
    nombre: "Grabado de dijes para collares",
    categoria: "Servicios",
    presentaciones: [],
    nota: "",
    imagen: img("grabado-dijes.jpg"),
    destacado: false,
    disponible: true
  }
];
