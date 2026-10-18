import { useState, useEffect } from 'react';
import type { Tarefa, Projeto } from '../tipos';
import { getProjetos } from '../api';

interface Props {
  tarefaInicial?: Partial<Tarefa>;
  aoEnviar: (dados: Omit<Tarefa, 'id'>) => void;
  textoBotao?: string;
}

export function FormularioTarefa({ tarefaInicial, aoEnviar, textoBotao = 'Salvar Tarefa' }: Props) {
  const [titulo, setTitulo] = useState(tarefaInicial?.titulo || '');
  const [descricao, setDescricao] = useState(tarefaInicial?.descricao || '');
const [status, setStatus] = useState<Tarefa['status']>(
  tarefaInicial?.status ?? ('A Fazer' as Tarefa['status'])
);

const [prioridade, setPrioridade] = useState<Tarefa['prioridade']>(
  tarefaInicial?.prioridade ?? ('Média' as Tarefa['prioridade'])
);
  const [projetoId, setProjetoId] = useState<string | number>(tarefaInicial?.projetoId || '');

  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregandoProjetos, setCarregandoProjetos] = useState(true);

  // Carrega a lista de projetos para o seletor (<select>)
  useEffect(() => {
    async function carregarProjetos() {
      try {
        const lista = await getProjetos();
        setProjetos(lista);
        if (lista.length > 0 && !projetoId) {
          setProjetoId(lista[0].id);
        }
      } catch (erro) {
        console.error('Erro ao carregar projetos:', erro);
      } finally {
        setCarregandoProjetos(false);
      }
    }
    carregarProjetos();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim()) return alert('O título é obrigatório!');

    aoEnviar({
        titulo,
        descricao,
        status,
        prioridade,
        responsavel: tarefaInicial?.responsavel ?? '',
        prazo: tarefaInicial?.prazo ?? '',
        projetoId: String(projetoId),
});
  }

  return (
    <form onSubmit={handleSubmit} className="form-tarefa">
      <div className="campo">
        <label htmlFor="titulo">Título da Tarefa:</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>

      <div className="campo">
        <label htmlFor="descricao">Descrição:</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div className="campo">
        <label htmlFor="projeto">Projeto:</label>
        {carregandoProjetos ? (
          <p>Carregando projetos...</p>
        ) : (
          <select
            id="projeto"
            value={projetoId}
            onChange={(e) => setProjetoId(e.target.value)}
          >
            {projetos.map((proj) => (
              <option key={proj.id} value={proj.id}>
                {proj.nome}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="campo">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Tarefa['status'])}
        >
          <option value="A Fazer">A Fazer</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Concluída">Concluída</option>
        </select>
      </div>

      <div className="campo">
        <label htmlFor="prioridade">Prioridade:</label>
        <select
          id="prioridade"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value as Tarefa['prioridade'])}
        >
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
      </div>

      <button type="submit">{textoBotao}</button>
    </form>
  );
}