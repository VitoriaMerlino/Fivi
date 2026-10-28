import { Link } from 'react-router-dom';

export function NaoEncontrada() {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', color: '#ffffff', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>404 - Página não encontrada</h1>
      <p style={{ marginBottom: '24px' }}>O endereço que você abriu não existe.</p>
      <Link
        to="/tarefas"
        style={{
          padding: '10px 22px',
          backgroundColor: '#ffffff',
          color: '#c026d3',
          fontWeight: 'bold',
          borderRadius: '30px',
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
        }}
      >
        Voltar para as tarefas
      </Link>
    </div>
  );
}