"use client";

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockVehicles } from '@/data/mockVehicles';
import FinancingModal from '@/components/FinancingModal/FinancingModal';

const SpecItem = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
    <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-white)' }}>{value}</span>
  </div>
);

export default function VehicleDetails({ params }) {
  // O hook 'use' desembrulha params em Next 16 (App Router)
  const resolvedParams = use(params);
  const vehicleId = resolvedParams.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const vehicle = mockVehicles.find(v => v.id === vehicleId);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      
      <Link href="/estoque" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', marginBottom: '1.5rem', textDecoration: 'none', fontWeight: 'bold' }}>
        &larr; Voltar para o Estoque
      </Link>

      <div style={{ backgroundColor: 'var(--color-gray-900)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-800)' }}>
        
        {/* Cabeçalho */}
        <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--color-gray-800)', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '6px', height: '32px', backgroundColor: 'var(--color-primary)', borderRadius: '4px' }}></div>
            <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--color-white)', fontWeight: '800' }}>
              {vehicle.brand} <span style={{ fontWeight: '400' }}>{vehicle.model}</span>
            </h1>
          </div>
          <h2 style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: '0', paddingLeft: '1.5rem', fontWeight: '500' }}>
            {vehicle.version}
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          
          {/* Coluna da Esquerda: Imagem */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-gray-800)' }}>
              <img 
                src={vehicle.photos[0]} 
                alt={`${vehicle.brand} ${vehicle.model}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '4/3', display: 'block' }} 
              />
            </div>
            {/* Opcionais / Tags Simuladas */}
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-white)', marginBottom: '1rem' }}>Opcionais Principais</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Ar Condicionado', 'Direção Hidráulica', 'Vidros Elétricos', 'Travas Elétricas', 'Alarme'].map(opc => (
                  <span key={opc} style={{ backgroundColor: 'var(--color-black)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)', border: '1px solid var(--color-gray-800)' }}>
                    {opc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Preço e Especificações */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem', backgroundColor: 'var(--color-black)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-800)' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preço à vista</span>
              <p style={{ fontSize: '2.5rem', fontWeight: '800', color: '#FFFFFF', margin: '0.5rem 0 0' }}>
                R$ {vehicle.price.toLocaleString('pt-BR')}
              </p>
            </div>

            <div className="grid-cols-responsive" style={{ backgroundColor: 'var(--color-black)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-800)', marginBottom: '2rem' }}>
              <SpecItem label="Ano" value={vehicle.year} />
              <SpecItem label="Quilometragem" value={`${vehicle.mileage.toLocaleString('pt-BR')} km`} />
              <SpecItem label="Combustível" value={vehicle.fuel} />
              <SpecItem label="Câmbio" value={vehicle.transmission} />
              <SpecItem label="Motor" value={vehicle.engine} />
              <SpecItem label="Portas" value={vehicle.doors} />
              <SpecItem label="Cor" value={vehicle.color} />
              <SpecItem label="Código" value={vehicle.id.toUpperCase()} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
              <button 
                onClick={() => setIsModalOpen(true)}
                style={{ 
                  width: '100%', padding: '1rem', backgroundColor: '#F9FAFB', color: '#000000', 
                  border: 'none', borderRadius: 'var(--radius-md)', fontSize: '1.1rem', fontWeight: 'bold', 
                  cursor: 'pointer', transition: 'background-color 0.2s' 
                }}
              >
                Simular Financiamento
              </button>
              
              <a 
                href={`https://api.whatsapp.com/send?phone=5511997874777&text=Olá! Tenho interesse no veículo ${vehicle.brand} ${vehicle.model} (${vehicle.year}) anunciado no site por R$ ${vehicle.price.toLocaleString('pt-BR')}.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  width: '100%', padding: '1rem', backgroundColor: '#25D366', color: 'white', 
                  border: 'none', borderRadius: 'var(--radius-md)', fontSize: '1.1rem', fontWeight: 'bold', 
                  cursor: 'pointer', textDecoration: 'none', textAlign: 'center', transition: 'background-color 0.2s',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                }}
              >
                Falar com Vendedor no WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>

      <FinancingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        vehicleName={`${vehicle.brand} ${vehicle.model} ${vehicle.version}`} 
      />
    </div>
  );
}