"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './VehicleCard.module.css';
import FinancingModal from '@/components/FinancingModal/FinancingModal';

export default function VehicleCard({ vehicle }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.card}>
      <Link href={`/ofertas/${vehicle.id}`} className={styles.imageWrapper}>
        {vehicle.photos && vehicle.photos.length > 0 ? (
          <img src={vehicle.photos[0]} alt={`${vehicle.brand} ${vehicle.model}`} className={styles.image} />
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-gray-900)', color: 'var(--text-muted)' }}>
            Sem Foto
          </div>
        )}
        {vehicle.featured && <span className={styles.tag}>Destaque</span>}
      </Link>
      
      <div className={styles.content}>
        <Link href={`/ofertas/${vehicle.id}`} style={{ textDecoration: 'none' }}>
          <h3 className={styles.title}>{vehicle.brand} {vehicle.model}</h3>
          <p className={styles.version}>{vehicle.version}</p>
        </Link>
        <div className={styles.info}>
          <span className={styles.infoItem}>📅 {vehicle.year}</span>
          <span className={styles.infoItem}>🛣️ {vehicle.mileage.toLocaleString('pt-BR')} km</span>
          <span className={styles.infoItem}>⚙️ {vehicle.transmission}</span>
          <span className={styles.infoItem}>⛽ {vehicle.fuel}</span>
        </div>
        <div className={styles.price}>
          R$ {vehicle.price.toLocaleString('pt-BR')}
        </div>
        <div className={styles.actionsMobile} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', marginTop: '1rem' }}>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ width: '100%', padding: '0.8rem', backgroundColor: '#000', color: 'white', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'center', border: '1px solid var(--color-gray-800)', cursor: 'pointer' }}
          >
            Simular Financiamento
          </button>
          <a 
            href={`https://api.whatsapp.com/send?phone=5511997874777&text=Olá! Tenho interesse no veículo ${vehicle.brand} ${vehicle.model}.`} 
            target="_blank" rel="noreferrer"
            style={{ width: '100%', padding: '0.8rem', backgroundColor: '#25D366', color: 'white', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
          >
            WhatsApp
          </a>
        </div>
      </div>

      <FinancingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        vehicleName={`${vehicle.brand} ${vehicle.model}`} 
      />
    </div>
  );
}