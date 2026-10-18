import { Link } from 'react-router-dom';
import type { Tarefa } from '../tipos';

interface TarefaCardProps {
  tarefa: Tarefa;
}

export function TarefaCard({ tarefa }: TarefaCardProps) {
  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(12px)',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', /* Corrigido de 'justify' para 'justifyContent' */
      gap: '12px'
    }}>
      <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 'bold' }}>
        {tarefa.titulo}
      </h3>

      <div style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: '1.5' }}>
        <p style={{ margin: '4px 0' }}><strong>Status:</strong> {tarefa.status}</p>
        <p style={{ margin: '4px 0' }}><strong>Prioridade:</strong> {tarefa.prioridade}</p>
        <p style={{ margin: '4px 0' }}><strong>Responsável:</strong> {tarefa.responsavel}</p>
        <p style={{ margin: '4px 0' }}><strong>Prazo:</strong> {tarefa.prazo}</p>
      </div>

      <Link 
        to={`/tarefas/${tarefa.id}`} 
        style={{
          display: 'inline-block',
          marginTop: '8px',
          padding: '10px 20px',
          backgroundColor: '#ffffff',
          color: '#c026d3',
          fontWeight: 'bold',
          borderRadius: '30px',
          textDecoration: 'none',
          textAlign: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
        }}
      >
        Ver detalhes →
      </Link>
    </div>
  );
}