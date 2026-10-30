import { expect, test } from "@playwright/test";

test.describe("Flujo de usuario en Pulgas Pet", () => {
  test("debe cargar la página principal y mostrar el título del hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Inicio · Pulgas Pet/);
    await expect(page.locator("h1")).toContainText("Todo para que tu mascota sea feliz");
  });

  test("debe buscar un producto en el catálogo y actualizar el contador al agregarlo", async ({
    page
  }) => {
    await page.goto("/catalogo.html");

    // Filtrar por término de búsqueda
    const buscador = page.locator("#buscar");
    await buscador.fill("Monello");

    // Seleccionar la primera tarjeta visible en los resultados
    const productoCard = page.locator(".prod").first();
    await expect(productoCard).toBeVisible();

    // Agregar el producto a la orden
    const btnAgregar = productoCard.locator("[data-add]");
    await btnAgregar.click();

    // Verificar actualización del contador en el encabezado
    const contador = page.locator("[data-cuenta]");
    await expect(contador).toHaveText("1");
  });

  test("debe listar los productos agregados en la vista de orden", async ({ page }) => {
    await page.goto("/catalogo.html");

    // Seleccionar el primer producto del catálogo y obtener su nombre dinámico
    const productoCard = page.locator(".prod").first();
    await expect(productoCard).toBeVisible();
    const nombreProducto = await productoCard.locator("h3").innerText();

    // Agregar el producto a la orden
    await productoCard.locator("[data-add]").click();

    // Navegar a la vista de orden
    await page.goto("/orden.html");

    // Verificar que el nombre del producto agregado esté presente en la lista
    const listaOrden = page.locator("#orden");
    await expect(listaOrden).toContainText(nombreProducto.trim());

    const formulario = page.locator("#orden-form");
    await expect(formulario).toBeVisible();
  });
});