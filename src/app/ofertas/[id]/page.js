import { notFound } from 'next/navigation';
import { getVehicles } from '@/services/api';
import ClientVehicleDetails from './ClientVehicleDetails';

export default async function VehicleDetails({ params }) {
  // O Next.js 15+ envia params como Promise
  const resolvedParams = await params;
  const vehicleId = resolvedParams.id;
  
  const vehicles = await getVehicles();
  const vehicle = vehicles.find(v => v.id === vehicleId);

  if (!vehicle) {
    notFound();
  }

  return <ClientVehicleDetails vehicle={vehicle} />;
}