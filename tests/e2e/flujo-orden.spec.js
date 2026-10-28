import { test, expect } from "@playwright/test";

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

    // Filtrar por nombre de producto
    const buscador = page.locator("#buscar");
    await buscador.fill("Monello");

    // Verificar que la tarjeta correspondiente esté visible
    const productoCard = page.locator('.prod[data-id="monello"]');
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
    const productoCard = page.locator('.prod[data-id="monello"]');
    await productoCard.locator("[data-add]").click();

    // Navegar a la página de la orden
    await page.goto("/orden.html");

    // Verificar visualización del ítem y activación del formulario
    const listaOrden = page.locator("#orden");
    await expect(listaOrden).toContainText("Monello");

    const formulario = page.locator("#orden-form");
    await expect(formulario).toBeVisible();
  });
});