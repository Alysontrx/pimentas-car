export async function getVehicles() {
  try {
    const res = await fetch('https://feed.itcar.com.br/json/exporta-site-itcar-pimentascar.com.br.json', {
      next: { revalidate: 60 } // Atualiza a cada 1 minuto (60 segundos)
    });

    if (!res.ok) {
      throw new Error('Falha ao buscar veículos da API');
    }

    const data = await res.json();
    
    const veiculos = data?.CargaVeiculos?.Veiculo;

    if (!veiculos || !Array.isArray(veiculos)) {
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
      photos: v.Fotos && Array.isArray(v.Fotos) && v.Fotos.length > 0 && v.Fotos[0].FotoURL && !v.Fotos[0].FotoURL.includes('sem_fotos') ? v.Fotos.map(f => f.FotoURL || f) : [],
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
