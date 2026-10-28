import { Link } from "react-router-dom";
import { useFiltros } from "../contexts/FiltrosContext";
import { useEffect, useState } from "react";
import type { Tarefa } from "../tipos";
import { getTarefas } from "../api";
import { TarefaCard } from "../components/TarefaCard";
import { BarraFiltros } from "../components/BarraFiltros";
import { AlternadorVisao } from "../components/AlternadorVisao";

export function ListaTarefas() {
  const { busca, status, prioridade } = useFiltros();
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

  function handleTarefaAtualizada(atualizada: Tarefa) {
    setTarefas((atuais) =>
      atuais.map((t) => (t.id === atualizada.id ? atualizada : t))
    );
  }

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ color: "#ffffff", margin: 0, fontSize: "2rem" }}>
          Lista de Tarefas
        </h1>
        <Link
          to="/tarefas/nova"
          style={{
            padding: "10px 22px",
            backgroundColor: "#ffffff",
            color: "#c026d3",
            fontWeight: "bold",
            borderRadius: "30px",
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
        >
          + Nova Tarefa
        </Link>
      </div>

      <AlternadorVisao />

      <BarraFiltros />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {tarefasVisiveis.length > 0 ? (
          tarefasVisiveis.map((tarefa) => (
            <TarefaCard
              key={tarefa.id}
              tarefa={tarefa}
              aoAtualizar={handleTarefaAtualizada}
            />
          ))
        ) : (
          <p>Nenhuma tarefa encontrada.</p>
        )}
      </div>
    </div>
  );
}