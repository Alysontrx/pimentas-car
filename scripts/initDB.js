import { syncDatabase } from '../src/lib/db.js';

async function init() {
  console.log('Iniciando sincronização do banco de dados (Mock)...');
  const result = await syncDatabase();
  console.log('Resultado:', result);
}

init();
