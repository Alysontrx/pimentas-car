import styles from './Hero.module.css';

export default function Hero() {
  const brands = ['VW', 'Toyota', 'Land Rover', 'Nissan', 'Fiat', 'Chevrolet', 'Ford', 'Jeep', 'Honda', 'Mitsubishi', 'Hyundai', 'Peugeot'];

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.overlay}></div>
      </div>

      <div className={"container \"}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Seu próximo carro <br /> está aqui.
          </h1>
          <p className={styles.subtitle}>
            Encontre seu próximo veículo na Pimentas Car. Qualidade, procedência e as melhores condições de São Bernardo do Campo.
          </p>

          <div className={styles.searchBox}>
            <div className={styles.brandList}>
              {brands.map((brand) => (
                <button key={brand} className={styles.brandItem}>
                  {brand}
                </button>
              ))}
            </div>

            <div className={styles.filterGrid}>
              <div className={styles.inputGroup}>
                <label>MODELO</label>
                <select defaultValue="">
                  <option value="" disabled>Modelo</option>
                  <option value="polo">Polo</option>
                  <option value="compass">Compass</option>
                  <option value="hilux">Hilux</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>ANO DE</label>
                <select defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option value="2015">2015</option>
                  <option value="2018">2018</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>ANO ATÉ</label>
                <select defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option value="2020">2020</option>
                  <option value="2024">2024</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>PREÇO DE</label>
                <select defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option value="50000">50k</option>
                  <option value="100000">100k</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>PREÇO ATÉ</label>
                <select defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option value="150000">150k</option>
                  <option value="250000">250k+</option>
                </select>
              </div>

              <button className={styles.btnSearch}>
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
