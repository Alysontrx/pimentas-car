export async function getVehicles() {
  try {
    const res = await fetch('https://feed.itcar.com.br/json/exporta-site-itcar-pimentascar.com.br.json', {
      cache: 'no-store' // Desabilita o cache para garantir dados sempre atualizados
    });

    if (!res.ok) {
      throw new Error('Falha ao buscar veículos da API');
    }

    const data = await res.json();
    
    let rawVeiculos = data?.CargaVeiculos?.Veiculo || data?.Veiculos;

    let veiculos = [];
    if (Array.isArray(rawVeiculos)) {
      veiculos = rawVeiculos;
    } else if (rawVeiculos && typeof rawVeiculos === 'object') {
      veiculos = [rawVeiculos]; // Lida com o caso onde XML-to-JSON retorna objeto em vez de array (1 único carro)
    }

    if (veiculos.length === 0) {
      return [];
    }

    // Mapeando do formato da API para o formato que os componentes esperam
    const mappedVehicles = veiculos.map(v => {
      // Normalização de fotos
      let rawPhotos = [];
      if (Array.isArray(v.Fotos)) {
        rawPhotos = v.Fotos;
      } else if (v.Fotos) {
        rawPhotos = [v.Fotos];
      }

      const validPhotos = rawPhotos
        .map(f => typeof f === 'string' ? f : (f?.FotoURL || f?.url || ''))
        .filter(url => url && typeof url === 'string' && url.startsWith('http') && !url.includes('sem_fotos'));

      const anoFab = v.AnoFabricacao || v.AnoFabr || '';
      const anoMod = v.AnoModelo || '';
      let yearFormatted = '';
      if (anoFab && anoMod) {
        yearFormatted = `${anoFab}/${anoMod}`;
      } else if (anoMod) {
        yearFormatted = `${anoMod}/${anoMod}`;
      } else if (anoFab) {
        yearFormatted = `${anoFab}/${anoFab}`;
      }

      return {
        id: String(v.Codigo || ''),
        brand: v.Marca || '',
        model: v.Modelo || '',
        version: v.Versao || v.ModeloVersao || '',
        year: yearFormatted,
        mileage: parseInt(v.Quilometragem || v.Km) || 0,
        transmission: v.Cambio || '',
        fuel: v.Combustivel || '',
        price: parseFloat(v.Preco) || 0,
        color: v.Cor || '',
        engine: v.Motor || v.Motorizacao || '',
        doors: parseInt(v.Portas) || 4,
        featured: v.Destaque === 'Sim' || v.EmDestaque === '1',
        photos: validPhotos.length > 0 ? validPhotos : ['/sem-foto.jpg'],
        opcionais: Array.isArray(v.Opcionais)
          ? v.Opcionais.filter(o => o && o !== 'Nenhum opcional informado')
          : (v.Equipamentos ? v.Equipamentos.split(', ') : [])
      };
    });

    return mappedVehicles;
  } catch (error) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw error;
    }
    console.error("Erro ao buscar dados dos veículos:", error);
    throw error;
  }
}
