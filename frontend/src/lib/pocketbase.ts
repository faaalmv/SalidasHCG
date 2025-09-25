// src/lib/pocketbase.ts

import PocketBase from 'pocketbase';

// Esta línea crea la conexión a tu backend local de PocketBase
// y la exporta para que otros archivos (como App.tsx) puedan usarla.
export const pb = new PocketBase('http://127.0.0.1:8090');
