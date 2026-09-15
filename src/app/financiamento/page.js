"use client";

import { useState } from 'react';

export default function Financiamento() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const maskCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const maskDate = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\/\d{4})\d+?$/, '$1');
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!name || !cpf || !birthDate) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }
    const msg = `Olá! Gostaria de fazer uma simulação de financiamento.\n\n*Nome:* ${name}\n*CPF:* ${cpf}\n*Data de Nascimento:* ${birthDate}`;
    const url = `https://wa.me/5511997874777?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{
      backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url("/hero.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center', width: '100%' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--color-white)', fontWeight: '800', letterSpacing: '-1px' }}>Financie seu próximo carro</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 4rem', fontSize: '1.2rem', lineHeight: '1.6' }}>
        Trabalhamos em parceria com as melhores instituições financeiras do mercado para garantir as taxas mais competitivas e a aprovação mais rápida para você.
      </p>

      <div style={{ backgroundColor: 'var(--color-gray-900)', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', maxWidth: '600px', margin: '0 auto', border: '1px solid var(--color-gray-800)', boxShadow: 'var(--shadow-lg)' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-white)', marginBottom: '1rem', fontWeight: '700' }}>Quer saber as condições para você?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
          Preencha rapidamente os dados abaixo e fale direto com nossa equipe via WhatsApp para uma simulação rápida e sem compromisso.
        </p>

        <form onSubmit={handleWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          
          <input 
            type="text" 
            placeholder="Nome completo" 
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={inputStyle}
          />
          
          <div className="grid-cols-responsive">
            <input 
              type="text" 
              placeholder="CPF" 
              value={cpf}
              onChange={e => setCpf(maskCPF(e.target.value))}
              required
              style={inputStyle} 
            />
            <input 
              type="text" 
              placeholder="Data de nascimento" 
              value={birthDate}
              onChange={e => setBirthDate(maskDate(e.target.value))}
              required
              style={inputStyle} 
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" required style={{ marginTop: '0.2rem' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Declaro que li e estou de acordo com os <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Termos de uso</a> e <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Política de Privacidade</a>
            </span>
          </label>

          <button 
            type="submit" 
            style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '1.2rem', textAlign: 'center', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.1rem', border: 'none', cursor: 'pointer', marginTop: '1rem', transition: 'var(--transition-fast)' }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; }}
          >
            Fazer Simulação
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '1rem',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--color-gray-800)',
  backgroundColor: 'var(--color-black)',
  color: 'var(--color-white)',
  outline: 'none',
  fontSize: '1rem'
};
