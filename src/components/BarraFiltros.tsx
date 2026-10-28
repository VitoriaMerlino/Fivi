import { useFiltros } from '../contexts/FiltrosContext';
import type { Status, Prioridade } from '../tipos';

export function BarraFiltros() {
  const { busca, setBusca, status, setStatus, prioridade, setPrioridade } = useFiltros();

  return (
    <div
      role="search"
      aria-label="Buscar e filtrar tarefas"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
        color: '#ffffff',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="busca-titulo">Buscar por título</label>
        <input
          id="busca-titulo"
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="filtro-status">Status</label>
        <select
          id="filtro-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status | 'todos')}
        >
          <option value="todos">Todos</option>
          <option value="a-fazer">A fazer</option>
          <option value="em-andamento">Em andamento</option>
          <option value="em-revisao">Em revisão</option>
          <option value="concluida">Concluída</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="filtro-prioridade">Prioridade</label>
        <select
          id="filtro-prioridade"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value as Prioridade | 'todas')}
        >
          <option value="todas">Todas</option>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>
    </div>
  );
}