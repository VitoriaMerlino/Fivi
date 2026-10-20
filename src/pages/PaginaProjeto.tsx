import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjetoComTarefas } from '../api';
import type { ProjetoComTarefas } from '../api';
import { TarefaCard } from '../components/TarefaCard';

export function PaginaProjeto() {
  const { id } = useParams();
  const [projeto, setProjeto] = useState<ProjetoComTarefas | null>(null);

  useEffect(() => {
    if (!id) return;
    getProjetoComTarefas(id).then(setProjeto);
  }, [id]);

  if (!projeto) {
    return <p style={{ color: '#ffffff', fontSize: '1.2rem' }}>Carregando...</p>;
  }

  return (
    <section style={{ maxWidth: '1000px', margin: '0 auto', color: '#ffffff' }}>
      {/* Botões de navegação no topo */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
        <Link
          to="/projetos"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff',
            fontWeight: 'bold',
            borderRadius: '30px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
          }}
        >
          ← Voltar para projetos
        </Link>

        <Link
          to={`/projetos/${projeto.id}/editar`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            backgroundColor: '#ffffff',
            color: '#c026d3',
            fontWeight: 'bold',
            borderRadius: '30px',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
          }}
        >
          ✎ Editar Projeto
        </Link>
      </div>

      {/* Detalhes do Projeto */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: '0 0 12px 0', color: '#ffffff' }}>
          {projeto.nome}
        </h2>
        {projeto.descricao && (
          <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: '6px 0' }}>
            {projeto.descricao}
          </p>
        )}
        {projeto.disciplina && (
          <p style={{ fontSize: '0.95rem', opacity: 0.85, margin: '4px 0' }}>
            <strong>Disciplina:</strong> {projeto.disciplina}
          </p>
        )}
        {projeto.criadoEm && (
          <p style={{ fontSize: '0.95rem', opacity: 0.85, margin: '4px 0' }}>
            <strong>Criado em:</strong> {projeto.criadoEm}
          </p>
        )}
      </div>

      <h3 style={{ fontSize: '1.5rem', marginBottom: '18px', color: '#ffffff', fontWeight: 'bold' }}>
        Tarefas
      </h3>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {projeto.tarefas.map((tarefa) => (
          <TarefaCard key={tarefa.id} tarefa={tarefa} />
        ))}
      </div>
    </section>
  );
}