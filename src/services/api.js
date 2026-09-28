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
    const mappedVehicles = veiculos.map(v => ({
      id: String(v.Codigo || ''),
      brand: v.Marca || '',
      model: v.Modelo || '',
      version: v.ModeloVersao || v.Versao || '',
      year: `${v.AnoFabr || ''}/${v.AnoModelo || ''}`,
      mileage: parseInt(v.Km) || 0,
      transmission: v.Cambio || '',
      fuel: v.Combustivel || '',
      price: parseFloat(v.Preco) || 0,
      color: v.Cor || '',
      engine: v.Motorizacao || v.Motor || '',
      doors: parseInt(v.Portas) || 4,
      featured: v.EmDestaque === '1' || v.Destaque === 'Sim',
      photos: (Array.isArray(v.Fotos) ? v.Fotos : (v.Fotos ? [v.Fotos] : []))
        .map(f => typeof f === 'string' ? f : (f?.FotoURL || f?.url || ''))
        .filter(url => url && typeof url === 'string' && !url.includes('sem_foto')),
      opcionais: v.Equipamentos ? v.Equipamentos.split(', ') : (v.Opcionais || [])
    }));

    return mappedVehicles;
  } catch (error) {
    console.error("Erro ao buscar dados dos veículos:", error);
    // Em vez de retornar um array vazio e limpar o site, lançamos o erro
    // para que o Next.js mantenha o cache antigo dos veículos intacto.
    throw error;
  }
}
