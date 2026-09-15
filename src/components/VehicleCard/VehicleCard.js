import Link from 'next/link';
import styles from './VehicleCard.module.css';

export default function VehicleCard({ vehicle }) {
  return (
    <div className={styles.card}>
      <Link href={`/estoque/${vehicle.id}`} className={styles.imageWrapper}>
        {vehicle.featured && <span className={styles.featured}>Destaque</span>}
        <img src={vehicle.photos[0]} alt={`${vehicle.brand} ${vehicle.model}`} loading="lazy" />
      </Link>
      <div className={styles.content}>
        <Link href={`/estoque/${vehicle.id}`}>
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
        <div className={styles.actions}>
          <Link href={`/estoque/${vehicle.id}`} className={styles.btnDetails}>
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}