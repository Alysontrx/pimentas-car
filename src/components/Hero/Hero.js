import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background image com overlay escuro */}
      <div className={styles.background}>
        <div className={styles.overlay}></div>
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Seu próximo carro <br /> está aqui.
          </h1>
          <p className={styles.subtitle}>
            Encontre seu próximo veículo na Pimentas Car. Qualidade, procedência e as melhores condições de São Bernardo do Campo.
          </p>

          <div className={styles.searchBox}>
            <div className={styles.searchGrid}>
              <div className={styles.inputGroup}>
                <label>Marca</label>
                <select defaultValue="">
                  <option value="" disabled>Todas as marcas</option>
                  <option value="volkswagen">Volkswagen</option>
                  <option value="chevrolet">Chevrolet</option>
                  <option value="bmw">BMW</option>
                  <option value="toyota">Toyota</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>Modelo</label>
                <select defaultValue="">
                  <option value="" disabled>Todos os modelos</option>
                  <option value="polo">Polo</option>
                  <option value="compass">Compass</option>
                  <option value="hilux">Hilux</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>Preço Máximo</label>
                <select defaultValue="">
                  <option value="" disabled>Qualquer valor</option>
                  <option value="50000">Até R$ 50.000</option>
                  <option value="100000">Até R$ 100.000</option>
                  <option value="150000">Até R$ 150.000</option>
                  <option value="200000">Até R$ 200.000</option>
                </select>
              </div>

              <button className={styles.btnSearch}>
                Encontrar meu carro
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
