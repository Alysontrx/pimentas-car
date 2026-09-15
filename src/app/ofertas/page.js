import VehicleCard from '@/components/VehicleCard/VehicleCard';
import { mockVehicles } from '@/data/mockVehicles';

export const metadata = { title: 'Ofertas Imperdíveis | Pimentas Car' };

export default function Ofertas() {
  const ofertas = mockVehicles.filter(v => v.featured);
  
  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Ofertas Especiais</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>As melhores condições para você sair de carro novo hoje.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {ofertas.map(car => (
          <VehicleCard key={car.id} vehicle={car} />
        ))}
      </div>
    </div>
  );
}