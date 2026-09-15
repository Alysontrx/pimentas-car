import Hero from '@/components/Hero/Hero';
import VehicleCard from '@/components/VehicleCard/VehicleCard';
import { mockVehicles } from '@/data/mockVehicles';
import Link from 'next/link';

export default function Home() {
  const destaques = mockVehicles.slice(0, 6);

  return (
    <>
      <Hero />
      
      <section className="container" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-white)', marginBottom: '0.5rem' }}>Destaques</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Os veículos mais procurados do nosso estoque.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {destaques.map(car => (
            <VehicleCard key={car.id} vehicle={car} />
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/estoque" style={{ display: 'inline-block', padding: '1.2rem 3rem', backgroundColor: 'transparent', color: 'var(--color-primary)', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-primary)', fontWeight: 'bold', fontSize: '1.1rem', transition: 'var(--transition-fast)' }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.color = 'white'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-primary)'; }}
          >
            Ver Estoque Completo
          </Link>
        </div>
      </section>
    </>
  );
}