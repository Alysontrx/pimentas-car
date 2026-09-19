"use client";

import { useState } from 'react';
import Link from 'next/link';
import FinancingModal from '@/components/FinancingModal/FinancingModal';

const SpecItem = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
    <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-white)' }}>{value}</span>
  </div>
);

export default function ClientVehicleDetails({ vehicle }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset touch end to prevent false positives on next swipe
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Avançar foto
      setMainPhotoIndex(prev => (prev + 1) % vehicle.photos.length);
    } else if (isRightSwipe) {
      // Voltar foto
      setMainPhotoIndex(prev => (prev - 1 + vehicle.photos.length) % vehicle.photos.length);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      
      <Link href="/ofertas" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', marginBottom: '1.5rem', textDecoration: 'none', fontWeight: 'bold' }}>
        &larr; Voltar para as Ofertas
      </Link>

      <div style={{ backgroundColor: 'var(--color-gray-900)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-800)' }}>
        
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
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2rem' }}>
          
          {/* Coluna da Esquerda: Imagem */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div 
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', position: 'relative', touchAction: 'pan-y' }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEndEvent}
            >
              {vehicle.photos && vehicle.photos.length > 0 ? (
                <>
                  <img 
                    src={vehicle.photos[mainPhotoIndex]} 
                    alt={`${vehicle.brand} ${vehicle.model}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '4/3', display: 'block', transition: 'opacity 0.3s ease', pointerEvents: 'none' }} 
                  />
                  {vehicle.photos.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMainPhotoIndex(prev => (prev - 1 + vehicle.photos.length) % vehicle.photos.length); }}
                        style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', zIndex: 10 }}
                      >
                        &#10094;
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMainPhotoIndex(prev => (prev + 1) % vehicle.photos.length); }}
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', zIndex: 10 }}
                      >
                        &#10095;
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div style={{ width: '100%', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  Sem foto disponível
                </div>
              )}
            </div>

            {/* Miniaturas */}
            {vehicle.photos && vehicle.photos.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {vehicle.photos.map((photo, index) => (
                  <div 
                    key={index}
                    onClick={() => setMainPhotoIndex(index)}
                    style={{ 
                      width: '80px', 
                      height: '60px', 
                      borderRadius: 'var(--radius-sm)', 
                      overflow: 'hidden', 
                      cursor: 'pointer',
                      border: mainPhotoIndex === index ? '2px solid var(--color-primary)' : '2px solid transparent',
                      opacity: mainPhotoIndex === index ? 1 : 0.6,
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                  >
                    <img src={photo} alt={`Miniatura ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
            {/* Opcionais */}
            {vehicle.opcionais && vehicle.opcionais.length > 0 && vehicle.opcionais[0] !== "Nenhum opcional informado" && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-white)', marginBottom: '1rem' }}>Opcionais</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {vehicle.opcionais.map(opc => (
                    <span key={opc} style={{ backgroundColor: 'var(--color-black)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)', border: '1px solid var(--color-gray-800)' }}>
                      {opc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Coluna da Direita: Preço e Especificações */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem', backgroundColor: 'var(--color-black)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-800)' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preço à vista</span>
              <p style={{ fontSize: '2.5rem', fontWeight: '800', color: '#FFFFFF', margin: '0.5rem 0 0' }}>
                R$ {vehicle.price.toLocaleString('pt-BR')}
              </p>
            </div>

            <div className="grid-cols-responsive" style={{ backgroundColor: 'var(--color-black)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-800)', marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.5rem' }}>
              <SpecItem label="Ano" value={vehicle.year} />
              <SpecItem label="Quilometragem" value={`${vehicle.mileage.toLocaleString('pt-BR')} km`} />
              <SpecItem label="Combustível" value={vehicle.fuel} />
              <SpecItem label="Câmbio" value={vehicle.transmission} />
              <SpecItem label="Motor" value={vehicle.engine} />
              <SpecItem label="Portas" value={vehicle.doors} />
              <SpecItem label="Cor" value={vehicle.color} />
              <SpecItem label="Código" value={vehicle.id.toUpperCase()} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
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
