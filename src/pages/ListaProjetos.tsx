import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjetos } from '../api';
import type { Projeto } from '../tipos';

export function ListaProjetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getProjetos()
      .then(setProjetos)
      .catch((erro) => console.error('Erro ao buscar projetos:', erro))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return <p style={{ color: '#ffffff', fontSize: '1.2rem' }}>Carregando projetos...</p>;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', color: '#ffffff' }}>
      {/* CABEÇALHO ÚNICO NO TOPO (FORA do .map) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '2.2rem', color: '#ffffff' }}>Projetos</h1>
        <Link
          to="/projetos/novo"
          style={{
            padding: '10px 22px',
            backgroundColor: '#ffffff',
            color: '#c026d3',
            fontWeight: 'bold',
            borderRadius: '30px',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
          }}
        >
          + Novo Projeto
        </Link>
      </div>

      {/* LISTA DE CARTÕES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {projetos.map((projeto) => (
          <div
            key={projeto.id}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(12px)',
              borderRadius: '20px',
              padding: '24px 30px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* LADO ESQUERDO: Nome e Descrição */}
            <div>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '1.4rem' }}>{projeto.nome}</h2>
              <p style={{ margin: 0, opacity: 0.9 }}>{projeto.descricao}</p>
            </div>

            {/* LADO DIREITO: Apenas o botão Ver Projeto */}
            <Link
              to={`/projetos/${projeto.id}`}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ffffff',
                color: '#c026d3',
                fontWeight: 'bold',
                borderRadius: '30px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap'
              }}
            >
              Ver projeto →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}