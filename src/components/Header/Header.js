import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="Pimentas Car" style={{ height: "45px", width: "auto" }} />
        </Link>

        <nav className={styles.nav}>
          <Link href="/">Início</Link>
          <Link href="/estoque">Estoque</Link>
          <Link href="/ofertas">Ofertas</Link>
          <Link href="/sobre">Sobre nós</Link>
          <Link href="/financiamento">Financiamento</Link>
          <Link href="/vender">Vender</Link>
          <Link href="/contato">Contato</Link>
        </nav>

        <div className={styles.actions}>
          <a
            href="https://wa.me/5511997874777?text=Olá!%20Gostaria%20de%20falar%20com%20um%20vendedor."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnWhatsapp}
          >
            Falar no WhatsApp
          </a>
          
          <button className={styles.btnMenuMobile} aria-label="Abrir menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

