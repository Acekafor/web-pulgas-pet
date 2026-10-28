import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const directorioImagenes = path.join(process.cwd(), "frontend", "assets", "img");

async function procesarDirectorio(dir) {
  const entradas = fs.readdirSync(dir, { withFileTypes: true });

  for (const entrada of entradas) {
    const rutaAbsoluta = path.join(dir, entrada.name);

    if (entrada.isDirectory()) {
      await procesarDirectorio(rutaAbsoluta);
    } else if (/\.(jpg|jpeg|png)$/i.test(entrada.name)) {
      const rutaWebp = rutaAbsoluta.replace(/\.(jpg|jpeg|png)$/i, ".webp");

      if (!fs.existsSync(rutaWebp)) {
        try {
          await sharp(rutaAbsoluta).webp({ quality: 80 }).toFile(rutaWebp);

          const pesoOriginal = (fs.statSync(rutaAbsoluta).size / 1024).toFixed(1);
          const pesoNuevo = (fs.statSync(rutaWebp).size / 1024).toFixed(1);

          console.log(`✔ Convertido: ${entrada.name} (${pesoOriginal} KB → ${pesoNuevo} KB)`);
        } catch (error) {
          console.error(`✖ Error al convertir ${entrada.name}:`, error.message);
        }
      }
    }
  }
}

console.log("Iniciando conversión de imágenes a WebP...");
procesarDirectorio(directorioImagenes)
  .then(() => console.log("¡Conversión completada con éxito!"))
  .catch((err) => console.error("Error en la conversión:", err));