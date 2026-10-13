import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjetoComTarefas } from '../api';
import type { ProjetoComTarefas } from '../api';

export function PaginaProjeto() {
  const { id } = useParams();
  const [projeto, setProjeto] = useState<ProjetoComTarefas | null>(null);

  useEffect(() => {
    if (!id) return;
    getProjetoComTarefas(id).then(setProjeto);
  }, [id]);

  if (!projeto) return <p>Carregando...</p>;

  return (
    <section>
      <h2>{projeto.nome}</h2>
      <p>{projeto.descricao}</p>
      <p>Disciplina: {projeto.disciplina}</p>
      <p>Criado em: {projeto.criadoEm}</p>

      <h3>Tarefas</h3>
      <ul>
        {projeto.tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {/* PROVISÓRIO: trocar por <CartaoTarefa tarefa={tarefa} /> quando a #4 for unida */}
            {tarefa.titulo} - {tarefa.status} - {tarefa.prioridade} - {tarefa.responsavel} - {tarefa.prazo}
          </li>
        ))}
      </ul>
    </section>
  );
}