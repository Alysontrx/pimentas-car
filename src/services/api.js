export async function getVehicles() {
  try {
    const res = await fetch('https://feed.itcar.com.br/json/exporta-site-itcar-pimentascar.com.br.json', {
      next: { revalidate: 600 } // Atualiza a cada 10 minutos (600 segundos)
    });

    if (!res.ok) {
      throw new Error('Falha ao buscar veículos da API');
    }

    const data = await res.json();
    
    if (!data.Veiculos || !Array.isArray(data.Veiculos)) {
      return [];
    }

    // Mapeando do formato da API para o formato que os componentes esperam
    const mappedVehicles = data.Veiculos.map(v => ({
      id: v.Codigo,
      brand: v.Marca,
      model: v.Modelo,
      version: v.Versao,
      year: `${v.AnoFabricacao}/${v.AnoModelo}`,
      mileage: parseInt(v.Quilometragem) || 0,
      transmission: v.Cambio,
      fuel: v.Combustivel,
      price: parseFloat(v.Preco) || 0,
      color: v.Cor,
      engine: v.Motor,
      doors: parseInt(v.Portas) || 4,
      featured: v.Destaque === 'Sim', // Caso seja sim, destaca
      photos: v.Fotos && v.Fotos[0] !== 'sem_fotos' ? v.Fotos : [],
      opcionais: v.Opcionais || []
    }));

    return mappedVehicles;
  } catch (error) {
    console.error("Erro ao buscar dados dos veículos:", error);
    // Em caso de falha, retornar array vazio em vez de quebrar a tela
    return [];
  }
}
