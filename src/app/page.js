import Hero from '@/components/Hero/Hero';
import VehicleCard from '@/components/VehicleCard/VehicleCard';
import { getVehicles } from '@/services/api';
import Link from 'next/link';
import styles from './page.module.css';

export default async function Home() {
  const vehicles = await getVehicles();
  
  // Pegar carros com modelos diferentes para não parecer duplicado
  const uniqueModels = [];
  const destaques = [];
  
  for (const car of vehicles) {
    if (!uniqueModels.includes(car.model)) {
      uniqueModels.push(car.model);
      destaques.push(car);
    }
    if (destaques.length === 3) break;
  }

  return (
    <>
      <Hero />
      
      <section className="container" style={{ padding: '0 1.5rem', marginTop: '5rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-white)', marginBottom: '0.5rem' }}>Destaques</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Os veículos mais procurados do nosso estoque.</p>
          </div>
        </div>

        <div className={styles.featuredGrid}>
          {destaques.map(car => (
            <VehicleCard key={car.id} vehicle={car} />
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/ofertas" className={styles.offersLink}>
            Ver Ofertas Completas
          </Link>
        </div>
      </section>
    </>
  );
}
