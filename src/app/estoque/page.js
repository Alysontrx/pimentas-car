"use client";

import { useState, useMemo } from 'react';
import VehicleCard from '@/components/VehicleCard/VehicleCard';
import { mockVehicles } from '@/data/mockVehicles';

export default function Estoque() {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [transmission, setTransmission] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter(car => {
      if (search && !car.model.toLowerCase().includes(search.toLowerCase()) && !car.brand.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (brand && car.brand !== brand) {
        return false;
      }
      if (transmission && car.transmission !== transmission) {
        return false;
      }
      if (maxPrice && car.price > parseInt(maxPrice)) {
        return false;
      }
      return true;
    });
  }, [search, brand, transmission, maxPrice]);

  const uniqueBrands = [...new Set(mockVehicles.map(c => c.brand))].sort();

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-white)' }}>Nosso Estoque</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Encontre o carro perfeito para você com nossos filtros.</p>
      </div>
      
      {/* Barra de Filtros */}
      <div style={{ backgroundColor: 'var(--color-gray-900)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-800)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 'bold' }}>Buscar modelo</label>
          <input 
            type="text" 
            placeholder="Ex: Polo, Compass..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', width: '100%', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 'bold' }}>Marca</label>
          <select 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)}
            style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', width: '100%', outline: 'none' }}
          >
            <option value="">Todas as marcas</option>
            {uniqueBrands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 'bold' }}>Câmbio</label>
          <select 
            value={transmission} 
            onChange={(e) => setTransmission(e.target.value)}
            style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', width: '100%', outline: 'none' }}
          >
            <option value="">Qualquer um</option>
            <option value="Automático">Automático</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 'bold' }}>Preço Máximo</label>
          <select 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', width: '100%', outline: 'none' }}
          >
            <option value="">Sem limite</option>
            <option value="100000">Até R$ 100.000</option>
            <option value="150000">Até R$ 150.000</option>
            <option value="200000">Até R$ 200.000</option>
            <option value="300000">Até R$ 300.000</option>
          </select>
        </div>

      </div>

      {/* Grid de Veículos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map(car => (
            <VehicleCard key={car.id} vehicle={car} />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            Nenhum veículo encontrado com os filtros selecionados.
          </div>
        )}
      </div>
    </div>
  );
}