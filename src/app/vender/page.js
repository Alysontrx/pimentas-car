"use client";
import { useState } from 'react';

export default function Vender() {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [km, setKm] = useState('');
  const [nome, setNome] = useState('');
  const [financiado, setFinanciado] = useState('');

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!marca || !modelo || !ano || !km || !nome || !financiado) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    const msg = "Olá, me chamo *\*. Tenho interesse em vender meu veículo: *\ \ \*, com *\km* rodados. (Financiado: *\*)";
    const url = "https://wa.me/5511997874777?text=\";
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
      alignItems: 'center',
      padding: '5rem 1.5rem'
    }}>
      <div className="container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ backgroundColor: 'var(--color-gray-900)', padding: '3rem 2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-800)', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-white)', fontWeight: '800', letterSpacing: '-0.5px' }}>VENDA SEU VEÍCULO</h2>
          </div>

          <form onSubmit={handleWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.5px' }}>MARCA</label>
                <input type="text" value={marca} onChange={e => setMarca(e.target.value)} required style={{ padding: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.5px' }}>MODELO</label>
                <input type="text" value={modelo} onChange={e => setModelo(e.target.value)} required style={{ padding: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.5px' }}>ANO</label>
                <input type="text" value={ano} onChange={e => setAno(e.target.value)} required style={{ padding: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.5px' }}>KM</label>
                <input type="text" value={km} onChange={e => setKm(e.target.value)} required style={{ padding: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.5px' }}>NOME CONTATO</label>
              <input type="text" value={nome} onChange={e => setNome(e.target.value)} required style={{ padding: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-800)', backgroundColor: 'var(--color-black)', color: 'white', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.5px' }}>FINANCIADO?</label>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', cursor: 'pointer' }}>
                  <input type="radio" name="financiado" value="Sim" onChange={e => setFinanciado(e.target.value)} required style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }} />
                  Sim
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', cursor: 'pointer' }}>
                  <input type="radio" name="financiado" value="Não" onChange={e => setFinanciado(e.target.value)} required style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }} />
                  Não
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '1.2rem', borderRadius: 'var(--radius-md)', fontWeight: 'bold', fontSize: '1.1rem', border: 'none', cursor: 'pointer', marginTop: '1.5rem', transition: 'var(--transition-fast)' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#cc0000'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; }}
            >
              Enviar para o WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
