import ClientOfertas from './ClientOfertas';
import { getVehicles } from '@/services/api';

export default async function Ofertas() {
  const vehicles = await getVehicles();

  return <ClientOfertas vehicles={vehicles} />;
}