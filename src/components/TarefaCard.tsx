import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Tarefa, Status } from '../tipos';
import { atualizarStatusTarefa } from '../api';

interface TarefaCardProps {
  tarefa: Tarefa;
  aoAtualizar?: (tarefaAtualizada: Tarefa) => void;
}

export function TarefaCard({ tarefa, aoAtualizar }: TarefaCardProps) {
  const [statusAtual, setStatusAtual] = useState<Status>(tarefa.status);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState(false);

  // Mantém o seletor igual ao dado quando a tela pai atualiza a tarefa
  useEffect(() => {
    setStatusAtual(tarefa.status);
  }, [tarefa.status]);

  async function handleMudarStatus(e: ChangeEvent<HTMLSelectElement>) {
    const novoStatus = e.target.value as Status;
    const statusAnterior = statusAtual;

    setStatusAtual(novoStatus);
    setSalvando(true);
    setErro(false);

    try {
      const atualizada = await atualizarStatusTarefa(tarefa.id, novoStatus);
      aoAtualizar?.(atualizada);
    } catch (e) {
      console.error('Erro ao mudar status:', e);
      setStatusAtual(statusAnterior);
      setErro(true);
    } finally {
      setSalvando(false);
    }
  }

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
      justifyContent: 'space-between',
      gap: '12px'
    }}>
      <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 'bold' }}>
        {tarefa.titulo}
      </h3>

      <div style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: '1.5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
          <label htmlFor={`status-${tarefa.id}`}>
            <strong>Status:</strong>
          </label>
          <select
            id={`status-${tarefa.id}`}
            value={statusAtual}
            onChange={handleMudarStatus}
            disabled={salvando}
            style={{
              padding: '4px 10px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontSize: '0.95rem',
              cursor: salvando ? 'wait' : 'pointer',
            }}
          >
            <option value="a-fazer" style={{ color: '#000' }}>A fazer</option>
            <option value="em-andamento" style={{ color: '#000' }}>Em andamento</option>
            <option value="em-revisao" style={{ color: '#000' }}>Em revisão</option>
            <option value="concluida" style={{ color: '#000' }}>Concluída</option>
          </select>
        </div>

        {erro && (
          <p
            role="alert"
            style={{
              margin: '6px 0',
              padding: '6px 10px',
              borderRadius: '10px',
              backgroundColor: '#fef2f2',
              color: '#991b1b',
              fontWeight: 'bold',
              fontSize: '0.85rem',
            }}
          >
            ⚠ Não foi possível mudar o status. Tente novamente.
          </p>
        )}

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