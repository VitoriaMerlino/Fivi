import { useEffect, useState } from "react";
import type { Tarefa, Status } from "../tipos";
import { getTarefas } from "../api";
import { TarefaCard } from "../components/TarefaCard";
import { useFiltros } from "../contexts/FiltrosContext";

const COLUNAS: { id: Status; titulo: string }[] = [
  { id: "a-fazer", titulo: "A Fazer" },
  { id: "em-andamento", titulo: "Em Andamento" },
  { id: "em-revisao", titulo: "Em Revisão" },
  { id: "concluida", titulo: "Concluída" },
];

export function QuadroTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Usa o mesmo contexto de filtros para manter a sincronização!
  const { busca, status, prioridade } = useFiltros();

  useEffect(() => {
    getTarefas()
      .then((dados) => setTarefas(dados))
      .catch((erro) => console.error("Erro ao carregar tarefas:", erro))
      .finally(() => setCarregando(false));
  }, []);

  const termo = busca.trim().toLowerCase();

  // Aplica a busca e os filtros
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    const bateBusca = tarefa.titulo.toLowerCase().includes(termo);
    const bateStatus = status === "todos" || tarefa.status === status;
    const batePrioridade =
      prioridade === "todas" || tarefa.prioridade === prioridade;

    return bateBusca && bateStatus && batePrioridade;
  });

  if (carregando) {
    return <p style={{ color: "#ffffff" }}>Carregando quadro...</p>;
  }

  return (
    <div>
      <h1 style={{ color: "#ffffff", marginBottom: "24px", fontSize: "2rem" }}>
        Quadro de Tarefas
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
          alignItems: "start",
        }}
      >
        {COLUNAS.map((coluna) => {
          // Agrupa os cartões filtrados pela coluna correspondente
          const tarefasDaColuna = tarefasFiltradas.filter(
            (t) => t.status === coluna.id
          );

          return (
            <div
              key={coluna.id}
              style={{
                backgroundColor: "#1e1e2e",
                padding: "16px",
                borderRadius: "8px",
                minHeight: "400px",
              }}
            >
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "1.2rem",
                  marginBottom: "16px",
                  borderBottom: "2px solid #313244",
                  paddingBottom: "8px",
                }}
              >
                {coluna.titulo} ({tarefasDaColuna.length})
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {tarefasDaColuna.length > 0 ? (
                  tarefasDaColuna.map((tarefa) => (
                    <TarefaCard key={tarefa.id} tarefa={tarefa} />
                  ))
                ) : (
                  <p style={{ color: "#a6adc8", fontSize: "0.9rem" }}>
                    Nenhuma tarefa
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}