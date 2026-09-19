"use client";

import { useState, useMemo } from 'react';
import VehicleCard from '@/components/VehicleCard/VehicleCard';

export default function ClientOfertas({ vehicles = [] }) {
  // === Estados dos Filtros ===
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [yearMin, setYearMin] = useState('');
  const [yearMax, setYearMax] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [mileageMin, setMileageMin] = useState('');
  const [mileageMax, setMileageMax] = useState('');
  const [transmission, setTransmission] = useState('');
  const [condition, setCondition] = useState({ novo: false, usado: false });
  const [style, setStyle] = useState('');
  const [colors, setColors] = useState([]);
  
  // === Estados de UI (Modais Mobile e Ordenação) ===
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Mais relevantes');

  // Lógica combinada de filtros e ordenação
  const filteredAndSortedVehicles = useMemo(() => {
    let result = vehicles.filter(car => {
      if (search && !car.model.toLowerCase().includes(search.toLowerCase()) && !car.brand.toLowerCase().includes(search.toLowerCase())) return false;
      if (brand && car.brand !== brand) return false;
      if (model && !car.model.toLowerCase().includes(model.toLowerCase())) return false;
      if (version && !car.version.toLowerCase().includes(version.toLowerCase())) return false;
      
      const carYear = parseInt(car.year.split('/')[0]); // ex: "2020/2021"
      if (yearMin && carYear < parseInt(yearMin)) return false;
      if (yearMax && carYear > parseInt(yearMax)) return false;
      
      if (priceMin && car.price < parseInt(priceMin)) return false;
      if (priceMax && car.price > parseInt(priceMax)) return false;
      
      if (mileageMin && car.mileage < parseInt(mileageMin)) return false;
      if (mileageMax && car.mileage > parseInt(mileageMax)) return false;
      
      if (transmission && car.transmission !== transmission) return false;
      
      if (condition.novo && !condition.usado && car.mileage > 0) return false;
      if (condition.usado && !condition.novo && car.mileage === 0) return false;
      
      if (colors.length > 0 && !colors.includes(car.color)) return false;
      
      return true;
    });

    // Ordenação
    if (sortOption === 'Preço menor') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Preço maior') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Ano mais recente') {
      result.sort((a, b) => parseInt(b.year.split('/')[0]) - parseInt(a.year.split('/')[0]));
    }
    
    return result;
  }, [vehicles, search, brand, model, version, yearMin, yearMax, priceMin, priceMax, mileageMin, mileageMax, transmission, condition, colors, sortOption]);

  // As marcas disponíveis (baseadas apenas nos outros filtros)
  const availableBrands = useMemo(() => {
    return [...new Set(vehicles.filter(car => {
      if (search && !car.model.toLowerCase().includes(search.toLowerCase()) && !car.brand.toLowerCase().includes(search.toLowerCase())) return false;
      if (model && !car.model.toLowerCase().includes(model.toLowerCase())) return false;
      if (version && !car.version.toLowerCase().includes(version.toLowerCase())) return false;
      const carYear = parseInt(car.year.split('/')[0]);
      if (yearMin && carYear < parseInt(yearMin)) return false;
      if (yearMax && carYear > parseInt(yearMax)) return false;
      if (priceMin && car.price < parseInt(priceMin)) return false;
      if (priceMax && car.price > parseInt(priceMax)) return false;
      if (mileageMin && car.mileage < parseInt(mileageMin)) return false;
      if (mileageMax && car.mileage > parseInt(mileageMax)) return false;
      if (transmission && car.transmission !== transmission) return false;
      if (condition.novo && !condition.usado && car.mileage > 0) return false;
      if (condition.usado && !condition.novo && car.mileage === 0) return false;
      if (colors.length > 0 && !colors.includes(car.color)) return false;
      return true;
    }).map(c => c.brand))].sort();
  }, [vehicles, search, model, version, yearMin, yearMax, priceMin, priceMax, mileageMin, mileageMax, transmission, condition, colors]);

  const filterContentJsx = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Busca */}
      <div style={{ position: 'relative' }}>
        <input 
          type="text" 
          placeholder="Digite um termo para buscar" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '1rem', paddingRight: '4rem', borderRadius: '30px', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }}
        />
        <button style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span style={{ fontSize: '1.2rem', color: 'var(--color-white)' }}>🔍</span>
        </button>
      </div>

      <hr style={{ borderColor: 'var(--color-gray-800)', opacity: 0.5 }} />

      {/* Marcas (Grid) */}
      {availableBrands.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-white)' }}>Marcas</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {availableBrands.slice(0, 10).map(b => (
              <button 
                key={b}
                onClick={() => setBrand(brand === b ? '' : b)}
                style={{ padding: '0.8rem', borderRadius: 'var(--radius-md)', border: brand === b ? '2px solid var(--color-primary)' : '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', cursor: 'pointer', textAlign: 'center', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--color-gray-800)' }}></div> {b}
              </button>
            ))}
          </div>
          {availableBrands.length > 10 && (
            <button style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'right', width: '100%' }}>Ver todas as marcas</button>
          )}
        </div>
      )}

      <hr style={{ borderColor: 'var(--color-gray-800)', opacity: 0.5 }} />

      {/* Modelo / Versão / Ano */}
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-white)' }}>Modelo / Versão / Ano</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <input type="text" placeholder="Modelo" value={model} onChange={(e) => setModel(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }} />
          <input type="text" placeholder="Versão" value={version} onChange={(e) => setVersion(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            <input type="number" placeholder="Ano Min." value={yearMin} onChange={(e) => setYearMin(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }} />
            <input type="number" placeholder="Ano Max." value={yearMax} onChange={(e) => setYearMax(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }} />
          </div>
        </div>
      </div>

      <hr style={{ borderColor: 'var(--color-gray-800)', opacity: 0.5 }} />

      {/* Faixa de Preço */}
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-white)' }}>Faixa de preço</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
          <input type="number" placeholder="Min. (R$)" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }} />
          <input type="number" placeholder="Max. (R$)" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }} />
        </div>
      </div>

      <hr style={{ borderColor: 'var(--color-gray-800)', opacity: 0.5 }} />

      {/* Quilometragem */}
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-white)' }}>Quilometragem</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
          <input type="number" placeholder="Min." value={mileageMin} onChange={(e) => setMileageMin(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }} />
          <input type="number" placeholder="Max." value={mileageMax} onChange={(e) => setMileageMax(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }} />
        </div>
      </div>

      <hr style={{ borderColor: 'var(--color-gray-800)', opacity: 0.5 }} />

      {/* Estado do Veículo */}
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-white)' }}>Estado do veículo</h3>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={condition.novo} onChange={(e) => setCondition({...condition, novo: e.target.checked})} style={{ width: '18px', height: '18px' }} /> Novo
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={condition.usado} onChange={(e) => setCondition({...condition, usado: e.target.checked})} style={{ width: '18px', height: '18px' }} /> Usado
          </label>
        </div>
      </div>

      <hr style={{ borderColor: 'var(--color-gray-800)', opacity: 0.5 }} />

      {/* Tipo de Câmbio */}
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-white)' }}>Tipo de câmbio</h3>
        <select value={transmission} onChange={(e) => setTransmission(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none', appearance: 'none' }}>
          <option value="">Câmbio (Todos)</option>
          <option value="Automático">Automático</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      <hr style={{ borderColor: 'var(--color-gray-800)', opacity: 0.5 }} />

      {/* Cores */}
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-white)' }}>Cores</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {['Branco', 'Prata', 'Preto', 'Cinza', 'Azul', 'Vermelho', 'Verde'].map(c => (
            <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={colors.includes(c)} onChange={() => setColors(prev => prev.includes(c) ? prev.filter(color => color !== c) : [...prev, c])} style={{ width: '18px', height: '18px' }} /> {c}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', position: 'relative' }}>
      
      {/* Botões Mobile (Escondidos no Desktop) */}
      <div className="mobile-only-buttons" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => setIsOrderModalOpen(true)} style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', padding: '1rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          ⇅ Ordenar
        </button>
        <button onClick={() => setIsFilterModalOpen(true)} style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', padding: '1rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          ▽ Filtrar
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="layout-grid">
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 991px) {
            .desktop-sidebar { display: none !important; }
          }
          @media (min-width: 992px) {
            .mobile-only-buttons { display: none !important; }
            .layout-grid { grid-template-columns: 320px 1fr !important; }
          }
        `}} />

        {/* Barra Lateral (Desktop) */}
        <aside className="desktop-sidebar" style={{ backgroundColor: 'var(--color-gray-900)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-800)', alignSelf: 'start', position: 'sticky', top: '100px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-white)', marginBottom: '2rem' }}>Filtros</h2>
          {filterContentJsx}
        </aside>

        {/* Grid de Veículos */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-white)' }}>Nossas Ofertas</h1>
              <p style={{ color: 'var(--text-secondary)' }}>{filteredAndSortedVehicles.length} {filteredAndSortedVehicles.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}</p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {filteredAndSortedVehicles.length > 0 ? (
              filteredAndSortedVehicles.map(car => (
                <VehicleCard key={car.id} vehicle={car} />
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', backgroundColor: 'var(--color-gray-900)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-800)' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-white)' }}>Nenhum veículo encontrado</p>
                <p>Tente ajustar os filtros para encontrar o que procura.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* === MODAL FILTROS (MOBILE) === */}
      {isFilterModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'var(--color-gray-900)', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--color-gray-800)' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-white)', flex: 1, textAlign: 'center' }}>FILTROS</h2>
            <button onClick={() => setIsFilterModalOpen(false)} style={{ fontSize: '1.5rem', color: 'white', position: 'absolute', right: '1.5rem' }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            {filterContentJsx}
          </div>
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-gray-900)' }}>
            <button onClick={() => setIsFilterModalOpen(false)} style={{ width: '100%', backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', padding: '1.2rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.1rem' }}>
              Aplicar filtros
            </button>
          </div>
        </div>
      )}

      {/* === MODAL ORDENAR (MOBILE) === */}
      {isOrderModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ backgroundColor: 'var(--color-gray-900)', width: '100%', maxWidth: '400px', borderRadius: 'var(--radius-lg)', padding: '1.5rem', position: 'relative', border: '1px solid var(--color-gray-800)' }}>
            <button onClick={() => setIsOrderModalOpen(false)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', fontSize: '1.2rem', color: 'white' }}>✕</button>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-white)', textAlign: 'center', marginBottom: '2rem' }}>Ordenar</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {['Mais relevantes', 'Preço menor', 'Preço maior', 'Ano mais recente'].map(opt => (
                <div key={opt} onClick={() => setSortOption(opt)} style={{ padding: '1rem 0', borderBottom: '1px solid var(--color-gray-800)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span>{opt}</span>
                  {sortOption === opt && <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>✓</span>}
                </div>
              ))}
            </div>

            <button onClick={() => setIsOrderModalOpen(false)} style={{ width: '100%', backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', padding: '1rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.1rem' }}>
              Aplicar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
