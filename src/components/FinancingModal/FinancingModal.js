"use client";

import { useState } from 'react';

export default function FinancingModal({ isOpen, onClose, vehicleName }) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [hasCnh, setHasCnh] = useState('sim');
  const [downPayment, setDownPayment] = useState('');

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

  const maskCurrency = (value) => {
    let v = value.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    return v;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !cpf || !birthDate || !downPayment) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }
    const msg = `Olá! Gostaria de fazer uma simulação de financiamento${vehicleName ? ` para o veículo *${vehicleName}*` : ''}.\n\n*Nome:* ${name}\n*CPF:* ${cpf}\n*Data de Nascimento:* ${birthDate}\n*Possui CNH:* ${hasCnh === 'sim' ? 'Sim' : 'Não'}\n*Valor da Entrada:* R$ ${downPayment}`;
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

              <div className="grid-cols-responsive">
                <select 
                  value={hasCnh}
                  onChange={e => setHasCnh(e.target.value)}
                  required
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7rem top 50%', backgroundSize: '.65rem auto' }}
                >
                  <option value="sim">Tenho CNH</option>
                  <option value="nao">Não tenho CNH</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Valor da entrada (R$)" 
                  value={downPayment}
                  onChange={e => setDownPayment(maskCurrency(e.target.value))}
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
