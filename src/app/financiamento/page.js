"use client";

import { useState } from 'react';

export default function Financiamento() {
  const [name, setName] = useState('');
  const [vehicle, setVehicle] = useState('');

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Por favor, preencha seu nome!");
      return;
    }
    const msg = `Olá, meu nome é *${name}* e gostaria de simular um financiamento${vehicle ? ` para o veículo *${vehicle}*` : ''}.`;
    const url = `https://wa.me/5511997874777?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{
      backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url("/storefront.jpg")',
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

        <form onSubmit={handleWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 'bold' }}>Seu Nome</label>
            <input 
              type="text" 
              placeholder="Ex: João da Silva" 
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none', fontSize: '1rem' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 'bold' }}>Qual veículo deseja financiar? (Opcional)</label>
            <input 
              type="text" 
              placeholder="Ex: BMW X1" 
              value={vehicle}
              onChange={e => setVehicle(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none', fontSize: '1rem' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '1.2rem', textAlign: 'center', borderRadius: 'var(--radius-md)', fontWeight: 'bold', fontSize: '1.1rem', border: 'none', cursor: 'pointer', marginTop: '1rem', transition: 'var(--transition-fast)' }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#cc0000'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; }}
          >
            Fazer Simulação no WhatsApp
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}