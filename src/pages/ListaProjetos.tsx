import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Projeto } from "../tipos";
import { getProjetos } from "../api"; // Certifica-te de ter esta função na tua API

export function ListaProjetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getProjetos()
      .then((dados) => {
        setProjetos(dados);
      })
      .catch((erro) => {
        console.error("Erro ao buscar projetos:", erro);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return <p style={{ color: "#ffffff", fontSize: "1.2rem" }}>Carregando projetos...</p>;
  }

  return (
    <div style={{ color: "#ffffff" }}>
      <h1 style={{ marginBottom: "24px", fontSize: "2rem", color: "#ffffff" }}>
        Projetos
      </h1>

      {/* Lista de Cartões de Projetos em Grid/Flex */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        {projetos.map((projeto) => (
          <div
            key={projeto.id}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(12px)",
              borderRadius: "20px",
              padding: "24px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "bold", color: "#ffffff" }}>
                {projeto.nome || projeto.titulo}
              </h2>
              {projeto.descricao && (
                <p style={{ marginTop: "8px", opacity: 0.9, fontSize: "0.95rem" }}>
                  {projeto.descricao}
                </p>
              )}
            </div>

            {/* Botão Ver Projeto */}
            <Link
              to={`/projetos/${projeto.id}`}
              style={{
                padding: "10px 22px",
                backgroundColor: "#ffffff",
                color: "#c026d3",
                fontWeight: "bold",
                borderRadius: "30px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)"
              }}
            >
              Ver projeto →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}