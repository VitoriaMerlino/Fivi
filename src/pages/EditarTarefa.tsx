import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTarefaPorId, atualizarTarefa } from '../api';
import type { Status, Prioridade } from '../tipos'; /* Importa os tipos específicos */

export function EditarTarefa() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // Estados do formulário com tipagem estrita
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState<Status>('pendente' as Status);
  const [prioridade, setPrioridade] = useState<Prioridade>('media' as Prioridade);
  const [responsavel, setResponsavel] = useState('');
  const [prazo, setPrazo] = useState('');

  useEffect(() => {
    if (id) {
      getTarefaPorId(id)
        .then((tarefa) => {
          setTitulo(tarefa.titulo || '');
          setDescricao(tarefa.descricao || '');
          if (tarefa.status) setStatus(tarefa.status);
          if (tarefa.prioridade) setPrioridade(tarefa.prioridade);
          setResponsavel(tarefa.responsavel || '');
          setPrazo(tarefa.prazo || '');
        })
        .catch((erro) => console.error('Erro ao carregar tarefa:', erro))
        .finally(() => setCarregando(false));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setSalvando(true);
      await atualizarTarefa(id, {
        titulo,
        descricao,
        status,
        prioridade,
        responsavel,
        prazo,
      });
      navigate(`/tarefas/${id}`);
    } catch (erro) {
      console.error('Erro ao salvar tarefa:', erro);
      alert('Ocorreu um erro ao salvar as alterações.');
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return <p style={{ color: '#ffffff', fontSize: '1.2rem' }}>Carregando dados da tarefa...</p>;
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', color: '#ffffff' }}>
      <Link
        to={id ? `/tarefas/${id}` : '/tarefas'}
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
          marginBottom: '24px',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
        }}
      >
        ← Cancelar
      </Link>

      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Editar Tarefa</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '30px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Título
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Descrição
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              style={inputStyle}
            >
              <option value="pendente" style={{ color: '#000' }}>Pendente</option>
              <option value="em-andamento" style={{ color: '#000' }}>Em andamento</option>
              <option value="concluida" style={{ color: '#000' }}>Concluída</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
              Prioridade
            </label>
            <select
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value as Prioridade)}
              style={inputStyle}
            >
              <option value="baixa" style={{ color: '#000' }}>Baixa</option>
              <option value="média" style={{ color: '#000' }}>Média</option>
              <option value="alta" style={{ color: '#000' }}>Alta</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
              Responsável
            </label>
            <input
              type="text"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
              Prazo
            </label>
            <input
              type="date"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={salvando}
          style={{
            marginTop: '12px',
            padding: '12px 24px',
            backgroundColor: '#ffffff',
            color: '#c026d3',
            fontWeight: 'bold',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
          }}
        >
          {salvando ? 'A guardar...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  color: '#ffffff',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
};