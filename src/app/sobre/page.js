export const metadata = { title: 'Sobre Nós | Pimentas Car' };

export default function Sobre() {
  return (
    <div>
      {/* Banner / Cabeçalho da Página */}
      <div style={{ backgroundColor: 'var(--color-gray-900)', padding: '5rem 1.5rem', borderBottom: '1px solid var(--color-gray-800)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', color: 'var(--color-white)', marginBottom: '1rem', fontWeight: '800', letterSpacing: '-1px' }}>Sobre a Pimentas Car</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Mais do que vender carros, entregamos sonhos sobre rodas com total transparência e segurança.
        </p>
      </div>

      <div className="container" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Lado do Texto */}
          <div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '2rem', fontWeight: '800', letterSpacing: '-1px' }}>Uma nova experiência.</h2>
            <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p>A Pimentas Car nasceu com o objetivo de transformar a forma como você compra, vende ou troca o seu veículo. Localizada no coração de São Bernardo do Campo, oferecemos um atendimento premium, focado em total transparência, qualidade e confiança.</p>
              <p>Trabalhamos com um estoque rigorosamente selecionado. Todos os nossos veículos são revisados e possuem garantia de procedência. Sabemos que a compra de um carro é um passo importante, por isso nossa equipe está sempre preparada para facilitar ao máximo essa conquista.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                <div style={{ backgroundColor: 'var(--color-gray-900)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--color-primary)', boxShadow: 'var(--shadow-md)' }}>
                  <h4 style={{ color: 'var(--color-white)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Procedência</h4>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Veículos rigorosamente periciados e revisados.</span>
                </div>
                <div style={{ backgroundColor: 'var(--color-gray-900)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--color-primary)', boxShadow: 'var(--shadow-md)' }}>
                  <h4 style={{ color: 'var(--color-white)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Confiança</h4>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Negociação 100% clara e com transparência total.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lado da Imagem */}
          <div style={{ position: 'relative', width: '100%', height: '600px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
            <img 
              src="/hero.jpg" 
              alt="Fachada Pimentas Car" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.4) 50%, transparent 100%)' }}></div>
            <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', right: '2.5rem' }}>
              <h3 style={{ color: 'var(--color-white)', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: '700' }}>Venha nos visitar!</h3>
              <p style={{ color: 'var(--color-gray-300)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📍 Av. Brg. Faria Lima, 1002 - Centro, SBC
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}