export const metadata = { title: 'Contato | Pimentas Car' };

export default function Contato() {
  return (
    <div className="container" style={{ padding: '5rem 1.5rem' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', color: 'var(--color-white)', fontWeight: '800', letterSpacing: '-1px', marginBottom: '1rem' }}>Localização</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Venha tomar um café conosco e conhecer seu novo carro de perto.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        
        {/* Lado do Mapa */}
        <div style={{ width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-gray-800)', boxShadow: 'var(--shadow-lg)', height: '450px' }}>
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight="0" 
            marginWidth="0" 
            src="https://maps.google.com/maps?width=100%25&height=600&hl=pt-BR&q=Av.%20Brg.%20Faria%20Lima,%201002%20-%20Centro,%20S%C3%A3o%20Bernardo%20do%20Campo%20-%20SP,%2009720-000+(Pimentas%20Car)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
            style={{ filter: 'grayscale(0.4) contrast(1.2)' }}
          ></iframe>
        </div>

        {/* Lado das Informações da Loja */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div>
            <h2 style={{ fontSize: '2rem', color: 'var(--color-white)', borderBottom: '3px solid var(--color-primary)', paddingBottom: '0.5rem', display: 'inline-block', marginBottom: '2rem', fontWeight: '800' }}>INFORMAÇÕES DA LOJA</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--color-gray-900)', paddingBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📍</span>
              <span>Av. Brg. Faria Lima, 1002 - Centro<br/>São Bernardo do Campo - SP, 09720-000</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', borderBottom: '1px solid var(--color-gray-900)', paddingBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem', marginTop: '0.2rem' }}>📱</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="https://wa.me/5511970582522" target="_blank" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Loja: (11) 97058-2522 <span style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>(WhatsApp)</span></a>
                <a href="https://wa.me/5511997874777" target="_blank" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Consultor Felipe: (11) 99787-4777 <span style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>(WhatsApp)</span></a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--color-gray-900)', paddingBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📸</span>
              <a href="https://instagram.com/pimentas_car" target="_blank" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>@pimentas_car</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🕒</span>
              <span>Segunda a Sexta: 09:00 - 18:00<br/>Sábado: 09:00 - 15:00<br/>Domingo: Fechado</span>
            </div>

          </div>
          
        </div>

      </div>
    </div>
  );
}