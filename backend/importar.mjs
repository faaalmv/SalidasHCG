// /home/jesuslangarica/SalidasHCG/backend/importar.mjs

import PocketBase from 'pocketbase';
import fs from 'fs';

// 1. CONFIGURACIÓN
// -----------------------------------------------------------------------------
const PB_URL = 'http://127.0.0.1:8090';
const PB_EMAIL = 'faaalmv@gmail.com'; // <-- CAMBIA ESTO
const PB_PASSWORD = 'Almacendeviveres1';    // <-- CAMBIA ESTO
const JSON_FILE_PATH = './data.json';
const COLLECTION_NAME = 'articulos';
// -----------------------------------------------------------------------------

console.log('--- Iniciando script de importación ---');

const pb = new PocketBase(PB_URL);

async function importarDatos() {
  try {
    console.log('Autenticando con el administrador...');
    await pb.admins.authWithPassword(PB_EMAIL, PB_PASSWORD);
    console.log('Autenticación exitosa.');

    console.log(`Leyendo el archivo: ${JSON_FILE_PATH}`);
    const datosJson = fs.readFileSync(JSON_FILE_PATH, 'utf-8');
    const articulos = JSON.parse(datosJson);
    console.log(`Se encontraron ${articulos.length} artículos en el archivo.`);

    for (const articulo of articulos) {
      const nuevoRegistro = {
        "codigo": String(articulo.CODIGO),
        "descripcion": articulo.DESCRIPCION,
        "presentacion": articulo.PRESENTACION,
        "cantidadMaxima": articulo['MAXIMO FAA']
      };

      try {
        await pb.collection(COLLECTION_NAME).create(nuevoRegistro);
        console.log(`- Creado: ${nuevoRegistro.descripcion}`);
      } catch (createError) {
        console.error(`  -> ERROR al crear "${articulo.DESCRIPCION}":`, createError);
      }
    }

    console.log('\n--- Proceso de importación finalizado. ---');

  } catch (error) {
    console.error('\n--- Ocurrió un error general en el script: ---', error);
  }
}

importarDatos();


