import { useEffect, useState } from "react";
import type { Tarefa } from "../tipos";
import { getTarefas } from "../api";
import { TarefaCard } from "../components/TarefaCard";

export function ListaTarefas() {
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

  if (carregando) {
    return <p style={{ color: "#ffffff" }}>Carregando tarefas...</p>;
  }

  return (
    <div>
      <h1 style={{ color: "#ffffff", marginBottom: "24px", fontSize: "2rem" }}>
        Lista de Tarefas
      </h1>

      {/* Container flexível com espaçamento de 20px entre cada cartão */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px' /* AQUI cria o espaçamento entre as caixas */
      }}>
        {tarefas.map((tarefa) => (
          <TarefaCard key={tarefa.id} tarefa={tarefa} />
        ))}
      </div>
    </div>
  );
}