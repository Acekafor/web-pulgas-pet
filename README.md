# Pulgas Pet — Catálogo web

Catálogo digital para **Pulgas Pet**, tienda de mascotas en Bogotá (Calle 14 # 79G, Local 3, barrio Visión de Colombia).
El cliente consulta los productos, arma una orden por unidades y la envía por WhatsApp. Recoge y paga en la tienda.

> El sitio **no maneja precios ni pagos**: precios, inventario y facturación se manejan en Siigo.

## Cómo funciona

1. El cliente navega el catálogo y agrega productos con las unidades que necesita.
2. En **Mi orden** ajusta cantidades, escribe su nombre y una nota opcional.
3. El botón abre WhatsApp con el pedido ya escrito, dirigido al número de la tienda. El cliente solo pulsa enviar.
4. La tienda confirma por WhatsApp, y el cliente recoge y paga en el local.

## Tecnologías

HTML, CSS y JavaScript sin frameworks. El catálogo se lee de una hoja de **Google Sheets** publicada como CSV; si la hoja no responde, el sitio usa el respaldo local `data/productos.js`. La orden se guarda en el navegador (`localStorage`).

## Estructura del repositorio

```
web-pulgas-pet/
├── index.html           # Portada
├── catalogo.html        # Catálogo con buscador y filtros
├── orden.html           # Orden por unidades y envío por WhatsApp
├── nosotros.html        # Historia y misión
├── contacto.html        # Contacto, horario y formulario
├── css/styles.css       # Estilos compartidos (mobile first)
├── js/app.js            # Lógica: catálogo, orden, WhatsApp, horario
├── data/productos.js    # Datos de la tienda, WhatsApp, horario y catálogo de respaldo
├── img/
│   ├── productos/       # Fotos de productos (nombre = columna "imagen" de la hoja)
│   ├── mascotas/        # Fotos de mascotas para las páginas
│   ├── banners/         # Categorías, fachada y mapa
│   └── logo/            # Logo de la tienda
├── docs/                # Documentación (rama docs)
└── README.md
```

## Catálogo en Google Sheets

Columnas de la hoja: `nombre`, `categoria`, `presentaciones` (separadas por `;`), `nota`, `imagen`, `destacado` (SI/NO) y `disponible` (SI/NO).
Un producto con `disponible = NO` deja de mostrarse. Los cambios tardan unos minutos en aparecer.
El enlace CSV publicado se configura en `catalogoCSV`, dentro de `data/productos.js`.

## Estrategia de ramas

| Rama | Propósito |
|------|-----------|
| `main` | Versión estable y publicada. Solo recibe cambios desde `develop` mediante Pull Request. |
| `develop` | Desarrollo e integración. Cada push genera una vista previa en Cloudflare Pages. |
| `docs` | Plan de Mejoramiento, manual de uso, informe final y evidencias. |

Reglas: no hacer commits directos a `main`; los cambios de código van en `develop` y llegan a `main` con Pull Request; las entregas se marcan con tags (`v0.1` página funcionando, `v1.0` entrega final).

Convención de commits: `feat:` función nueva, `fix:` corrección, `style:` diseño, `docs:` documentación, `chore:` mantenimiento.

## Publicación

Despliegue en Cloudflare Pages conectado a este repositorio: la rama `main` es producción y `develop` genera vistas previas. Al ser un sitio estático no requiere comando de build.

## Ejecutar en local

```
python -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Mantenimiento

- **Catálogo (productos, disponibilidad, destacados):** lo edita la tienda directamente en Google Sheets.
- **Código, diseño y fotos nuevas:** solo la persona que administra el repositorio.

## Cronograma

| Fase | Fechas | Entregable |
|------|--------|------------|
| 1 | 27 sep – 3 oct | Plan de Mejoramiento aprobado y repositorio creado |
| 2 | 4 – 31 oct | Página web funcionando (catálogo + WhatsApp) |
| 3 | 1 – 14 nov | Página en línea y manual de uso |
| 4 | 15 – 23 nov | Informe final y avales firmados |

## Contexto

Práctica profesional — Técnico Profesional en Desarrollo de Software, Fundación Universitaria Compensar.
Empresa: Pulgas Pet (propietario: Oscar Leonardo Aza).