/**
 * Diagnóstico de conexión al backend.
 * Uso: node scripts/test-api-conexion.mjs [baseUrl]
 *
 * Si no pasas baseUrl, lee VITE_API_BASE_URL del archivo .env
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENDPOINT_PRUEBA = "/tipos-planta";
const ENDPOINT_REGISTRO = "/auth/registro";

function leerBaseUrlDesdeEnv() {
  try {
    const envPath = resolve(__dirname, "../.env");
    const contenido = readFileSync(envPath, "utf8");
    const match = contenido.match(/VITE_API_BASE_URL\s*=\s*['"]?([^'"\n]+)['"]?/);
    return match?.[1]?.trim() ?? null;
  } catch {
    return null;
  }
}

function normalizarBaseUrl(url) {
  return url.replace(/\/+$/, "");
}

async function probarFetch(nombre, url, options = {}) {
  const inicio = Date.now();
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json", ...options.headers },
      ...options,
    });
    const duracion = Date.now() - inicio;
    let cuerpo = null;

    try {
      cuerpo = await response.json();
    } catch {
      cuerpo = null;
    }

    return {
      nombre,
      url,
      ok: response.ok,
      status: response.status,
      duracion,
      registros: Array.isArray(cuerpo) ? cuerpo.length : cuerpo ? 1 : 0,
      error: null,
    };
  } catch (error) {
    return {
      nombre,
      url,
      ok: false,
      status: null,
      duracion: Date.now() - inicio,
      registros: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function imprimirResultado(resultado) {
  const icono = resultado.ok ? "✓" : "✗";
  const status = resultado.status ?? "sin respuesta";
  const extra = resultado.error
    ? ` → ${resultado.error}`
    : resultado.ok
      ? ` → ${resultado.registros} registro(s)`
      : "";

  console.log(
    `  ${icono} ${resultado.nombre}: HTTP ${status} (${resultado.duracion}ms)${extra}`
  );
  console.log(`    ${resultado.url}`);
}

const baseUrlArg = process.argv[2];
const baseUrlConfigurada = baseUrlArg ?? leerBaseUrlDesdeEnv() ?? "http://localhost:8080/api";
const base = normalizarBaseUrl(baseUrlConfigurada);

console.log("\n=== Test de conexión al backend ===\n");
console.log(`Base URL configurada: ${base}\n`);

const pruebas = [
  { nombre: "URL actual (.env)", url: `${base}${ENDPOINT_PRUEBA}` },
];

// Si falta /api, probar también con el prefijo correcto
if (!base.endsWith("/api")) {
  pruebas.push({
    nombre: "Con prefijo /api (sugerida)",
    url: `${base}/api${ENDPOINT_PRUEBA}`,
  });
}

const resultados = await Promise.all(
  pruebas.map((p) => probarFetch(p.nombre, p.url))
);

console.log("Resultados:\n");
for (const r of resultados) imprimirResultado(r);

const exito = resultados.some((r) => r.ok);

console.log("\n--- Prueba de registro ---\n");

const emailPrueba = `test-${Date.now()}@diagnostico.local`;
const resultadoRegistro = await probarFetch(
  "POST /auth/registro",
  `${base.endsWith("/api") ? base : `${base}/api`}${ENDPOINT_REGISTRO}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: "Usuario Diagnóstico",
      email: emailPrueba,
      password: "123456",
    }),
  }
);

imprimirResultado(resultadoRegistro);

const exitoRegistro = resultadoRegistro.ok;

console.log("\n--- Diagnóstico ---\n");

if (exito && !base.endsWith("/api")) {
  console.log(
    "⚠ El backend responde en /api/* pero tu VITE_API_BASE_URL no incluye /api."
  );
  console.log(
    `  Corrige .env: VITE_API_BASE_URL='${base}/api'`
  );
  console.log("  Luego reinicia el servidor de Vite (npm run dev).\n");
  process.exit(1);
}

if (!exito) {
  console.log("✗ No se pudo conectar al backend con ninguna URL probada.");
  console.log("  Verifica que el servicio en Render esté activo y la URL sea correcta.\n");
  process.exit(1);
}

if (!exitoRegistro) {
  console.log("✗ El endpoint de registro no respondió correctamente.");
  console.log("  Revisa el backend o prueba con otro email.\n");
  process.exit(1);
}

console.log("✓ Conexión y registro correctos. El frontend debería funcionar con esta URL.");
console.log("  Si sigue fallando en el navegador, reinicia npm run dev y usa la URL que muestra Vite.\n");
process.exit(0);
