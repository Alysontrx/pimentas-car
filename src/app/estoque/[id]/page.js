import { mockVehicles } from '@/data/mockVehicles';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const car = mockVehicles.find(v => v.id === resolvedParams.id);
  if (!car) return { title: 'Veículo não encontrado' };
  return { title: `${car.brand} ${car.model} ${car.year} | Pimentas Car` };
}

export default async function VehicleDetails({ params }) {
  const resolvedParams = await params;
  const car = mockVehicles.find(v => v.id === resolvedParams.id);
  
  if (!car) {
    notFound();
  }

  const zapMessage = `Olá! Vi o ${car.brand} ${car.model} (${car.year}) no site e gostaria de saber mais informações.`;
  
  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
        
        {/* Galeria Simples para V1 */}
        <div style={{ width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', backgroundColor: '#000' }}>
          <img src={car.photos[0]} alt={`${car.brand} ${car.model}`} style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }} />
        </div>

        {/* Informações */}
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-white)' }}>{car.brand} {car.model}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>{car.version}</p>
          
          <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '2rem' }}>
            R$ {car.price.toLocaleString('pt-BR')}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: 'var(--color-gray-900)', padding: '2rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', border: '1px solid var(--color-gray-800)' }}>
            <div><strong style={{color: 'var(--text-muted)'}}>Ano:</strong> <br/><span style={{color: 'var(--color-white)'}}>{car.year}</span></div>
            <div><strong style={{color: 'var(--text-muted)'}}>Quilometragem:</strong> <br/><span style={{color: 'var(--color-white)'}}>{car.mileage.toLocaleString('pt-BR')} km</span></div>
            <div><strong style={{color: 'var(--text-muted)'}}>Câmbio:</strong> <br/><span style={{color: 'var(--color-white)'}}>{car.transmission}</span></div>
            <div><strong style={{color: 'var(--text-muted)'}}>Combustível:</strong> <br/><span style={{color: 'var(--color-white)'}}>{car.fuel}</span></div>
            <div><strong style={{color: 'var(--text-muted)'}}>Cor:</strong> <br/><span style={{color: 'var(--color-white)'}}>{car.color}</span></div>
            <div><strong style={{color: 'var(--text-muted)'}}>Motor:</strong> <br/><span style={{color: 'var(--color-white)'}}>{car.engine}</span></div>
            <div><strong style={{color: 'var(--text-muted)'}}>Portas:</strong> <br/><span style={{color: 'var(--color-white)'}}>{car.doors}</span></div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <a href={`https://wa.me/5511997874777?text=${encodeURIComponent(zapMessage)}`} target="_blank" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '1.2rem', textAlign: 'center', borderRadius: 'var(--radius-md)', fontWeight: 'bold', fontSize: '1.1rem' }}>
              Tenho Interesse via WhatsApp
            </a>
            <a href="https://wa.me/5511997874777?text=Gostaria%20de%20agendar%20uma%20visita." target="_blank" style={{ backgroundColor: 'var(--color-gray-800)', color: 'white', padding: '1rem', textAlign: 'center', borderRadius: 'var(--radius-md)', fontWeight: 'bold', border: '1px solid var(--color-gray-300)' }}>
              Agendar Visita
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}