"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Estoque', path: '/estoque' },
    { name: 'Ofertas', path: '/ofertas' },
    { name: 'Sobre nós', path: '/sobre' },
    { name: 'Financiamento', path: '/financiamento' },
    { name: 'Vender', path: '/vender' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
          <img src="/logo.png" alt="Pimentas Car" style={{ height: "45px", width: "auto" }} />
        </Link>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={pathname === link.path ? styles.active : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile-only Whatsapp Button inside Nav */}
          <a
            href="https://wa.me/5511997874777?text=Olá!%20Gostaria%20de%20falar%20com%20um%20vendedor."
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btnWhatsapp} ${styles.mobileNavWhatsapp}`}
          >
            Falar no WhatsApp
          </a>
        </nav>

        <div className={styles.actions}>
          <a
            href="https://wa.me/5511997874777?text=Olá!%20Gostaria%20de%20falar%20com%20um%20vendedor."
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btnWhatsapp} ${styles.desktopWhatsapp}`}
          >
            Falar no WhatsApp
          </a>
          
          <button 
            className={styles.btnMenuMobile} 
            aria-label="Abrir menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
