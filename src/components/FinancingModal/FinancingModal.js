"use client";

import { useState } from 'react';

export default function FinancingModal({ isOpen, onClose, vehicleName }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !cpf || !birthDate) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }
    const msg = `Olá! Gostaria de fazer uma simulação de financiamento${vehicleName ? ` para o veículo *${vehicleName}*` : ''}.\n\n*Nome:* ${name}\n*CPF:* ${cpf}\n*Data de Nascimento:* ${birthDate}`;
    const url = `https://wa.me/5511997874777?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    onClose(); // Fechar o modal depois de enviar
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'var(--color-gray-900)',
        width: '100%', maxWidth: '600px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-gray-800)',
        position: 'relative',
        boxShadow: 'var(--shadow-lg)'
      }}>
        
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-gray-800)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-white)', margin: 0 }}>
            Simular Financiamento
          </h2>
          <button onClick={onClose} style={{ color: 'var(--text-muted)', fontSize: '1.5rem', lineHeight: 1 }}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Body */}
          <div style={{ padding: '1.5rem' }}>
            {vehicleName && (
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Simulação para: <strong style={{ color: 'var(--color-white)' }}>{vehicleName}</strong>
              </p>
            )}

            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-white)', marginBottom: '1rem' }}>Sobre você</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)' }}>
            <button 
              type="submit"
              style={{
                width: '100%', padding: '1rem',
                backgroundColor: 'var(--color-primary)', color: 'var(--color-white)',
                border: 'none', borderRadius: '30px',
                fontSize: '1.1rem', fontWeight: 'bold',
                cursor: 'pointer', transition: 'background-color 0.2s'
              }}
            >
              Ver parcelas no WhatsApp
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-gray-800)',
  backgroundColor: 'var(--color-black)',
  color: 'var(--color-white)',
  outline: 'none',
  fontSize: '0.95rem'
};
