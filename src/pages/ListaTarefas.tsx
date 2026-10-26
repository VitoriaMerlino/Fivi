import { useFiltros } from "../contexts/FiltrosContext";
import { useEffect, useState } from "react";
import type { Tarefa, Status, Prioridade } from "../tipos";
import { getTarefas } from "../api";
import { TarefaCard } from "../components/TarefaCard";


export function ListaTarefas() {
  const { busca, setBusca, status, setStatus, prioridade, setPrioridade } = useFiltros();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getTarefas()
      .then((dados) => {
        setTarefas(dados);
      })
      .catch((erro) => {
        console.error("Erro ao buscar tarefas:", erro);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);
    const termo = busca.trim().toLowerCase();

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    const bateBusca = tarefa.titulo.toLowerCase().includes(termo);
    const bateStatus = status === "todos" || tarefa.status === status;
    const batePrioridade =
      prioridade === "todas" || tarefa.prioridade === prioridade;

    return bateBusca && bateStatus && batePrioridade;
  });

  if (carregando) {
    return <p style={{ color: "#ffffff" }}>Carregando tarefas...</p>;
  }

  return (
    <div>
      <h1 style={{ color: "#ffffff", marginBottom: "24px", fontSize: "2rem" }}>
        Lista de Tarefas
      </h1>
      <div
        role="search"
        aria-label="Buscar e filtrar tarefas"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label htmlFor="busca-titulo">Buscar por título</label>
          <input
            id="busca-titulo"
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label htmlFor="filtro-status">Status</label>
          <select
            id="filtro-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status | "todos")}
          >
            <option value="todos">Todos</option>
            <option value="a-fazer">A fazer</option>
            <option value="em-andamento">Em andamento</option>
            <option value="em-revisao">Em revisão</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label htmlFor="filtro-prioridade">Prioridade</label>
          <select
            id="filtro-prioridade"
            value={prioridade}
            onChange={(e) =>
              setPrioridade(e.target.value as Prioridade | "todas")
            }
          >
            <option value="todas">Todas</option>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
    </div>


      {/* Lista de tarefas filtradas */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {tarefasVisiveis.length > 0 ? (
          tarefasVisiveis.map((tarefa) => (
            <TarefaCard key={tarefa.id} tarefa={tarefa} />
          ))
        ) : (
          <p>Nenhuma tarefa encontrada.</p>
        )}
      </div>

    </div>
  );
}