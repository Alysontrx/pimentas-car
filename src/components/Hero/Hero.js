import styles from './Hero.module.css';

export default function Hero() {


  return (
    <section className={styles.hero}>
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

          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className={styles.wppButton}>
            Fale com um consultor
          </a>
        </div>
      </div>
    </section>
  );
}
