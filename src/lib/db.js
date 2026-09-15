import fs from 'fs';
import path from 'path';
import { fetchItCarStock } from '../services/itcar';

// Em produção, isso seria um banco de dados real (PostgreSQL via Prisma, etc)
const DB_FILE = path.join(process.cwd(), 'src', 'data', 'database.json');

/**
 * Inicializa e gerencia o banco de dados local
 */
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    return { vehicles: [], settings: {}, lastSync: null };
  }
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

export async function syncDatabase() {
  try {
    const stock = await fetchItCarStock();
    const db = readDB();
    
    // Atualiza o estoque e marca o horário da sincronização
    db.vehicles = stock;
    db.lastSync = new Date().toISOString();
    
    writeDB(db);
    return { success: true, message: 'Estoque sincronizado com sucesso.' };
  } catch (error) {
    console.error('[Database] Erro ao sincronizar:', error);
    return { success: false, error: error.message };
  }
}

export function getVehicles() {
  const db = readDB();
  return db.vehicles || [];
}

export function getVehicleById(id) {
  const vehicles = getVehicles();
  return vehicles.find(v => v.id === id);
}

export function getSettings() {
  const db = readDB();
  // Configurações padrão
  return {
    whatsapp: '5511997874777',
    address: 'Av. Brg. Faria Lima, 1002 - Centro, São Bernardo do Campo - SP, 09720-000',
    instagram: 'https://www.instagram.com/pimentas_car/',
    ...db.settings
  };
}

export function updateSettings(newSettings) {
  const db = readDB();
  db.settings = { ...db.settings, ...newSettings };
  writeDB(db);
  return db.settings;
}
