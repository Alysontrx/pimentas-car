import { mockVehicles } from '../data/mockVehicles';

// URL e Chave viriam do process.env
const ITCAR_API_URL = process.env.ITCAR_API_URL;
const ITCAR_API_KEY = process.env.ITCAR_API_KEY;
const USE_MOCK = process.env.USE_MOCK !== 'false';

/**
 * Serviço de Integração com ItCar
 * Responsável por buscar e normalizar o estoque.
 */
export async function fetchItCarStock() {
  if (USE_MOCK || !ITCAR_API_URL) {
    console.log('[ItCar Service] Usando dados mockados.');
    // Simulando delay de rede
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(normalizeStock(mockVehicles));
      }, 500);
    });
  }

  try {
    const response = await fetch(ITCAR_API_URL, {
      headers: {
        'Authorization': `Bearer ${ITCAR_API_KEY}`,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 3600 } // Cache no Next.js
    });

    if (!response.ok) {
      throw new Error(`Erro na API ItCar: ${response.statusText}`);
    }

    const data = await response.json();
    return normalizeStock(data);
  } catch (error) {
    console.error('[ItCar Service] Falha na sincronização:', error);
    // Em caso de erro, podemos retornar throw para o fallback do DB tratar
    throw error;
  }
}

/**
 * Normaliza os dados vindos do ItCar para o formato padrão do site
 */
function normalizeStock(rawVehicles) {
  // Se fosse XML ou JSON diferente, faríamos o mapeamento aqui
  return rawVehicles.map(v => ({
    id: v.id,
    brand: v.brand,
    model: v.model,
    version: v.version,
    year: v.year,
    mileage: v.mileage,
    transmission: v.transmission,
    fuel: v.fuel,
    price: v.price,
    color: v.color,
    engine: v.engine,
    doors: v.doors,
    featured: v.featured || false,
    photos: v.photos || []
  }));
}
