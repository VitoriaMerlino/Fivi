import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Tarefa } from '../tipos';
import { getTarefaPorId } from "../api";

export function DetalheTarefa() {
    const { id } = useParams<{ id: string }>();
    const [tarefa, setTarefa] = useState<Tarefa | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (id) {
            getTarefaPorId(id)
                .then((dados) => {
                    setTarefa(dados);
                })
                .catch((erro) => {
                    console.error('Erro ao buscar detalhe da tarefa:', erro);
                })
                .finally(() => {
                    setCarregando(false);
                });
        }
    }, [id]);

    if (carregando) {
        return <p style={{ color: '#ffffff', fontSize: '1.2rem' }}>Carregando detalhes...</p>;
    }

    if (!tarefa) {
        return <p style={{ color: '#ffffff', fontSize: '1.2rem' }}>Tarefa não encontrada...</p>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', color: '#ffffff' }}>
            {/* Barra superior de ações */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {/* Botão de voltar estilo pill translúcido */}
                <Link 
                    to="/tarefas" 
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
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
                    }}
                >
                    ← Voltar para a lista
                </Link>

                {/* Botão para navegar até a página de edição */}
                <Link 
                    to={`/tarefas/${tarefa.id}/editar`}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 22px',
                        backgroundColor: '#ffffff',
                        color: '#c026d3',
                        fontWeight: 'bold',
                        borderRadius: '30px',
                        textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
                    }}
                >
                    ✎ Editar Tarefa
                </Link>
            </div>

            {/* Título da Tarefa */}
            <h1 style={{ marginTop: '24px', marginBottom: '20px', fontSize: '2.2rem', color: '#ffffff' }}>
                {tarefa.titulo}
            </h1>

            {/* Caixa de detalhes no estilo Glassmorphism */}
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(12px)',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                fontSize: '1.1rem',
                lineHeight: '1.6'
            }}>
                <p><strong>Descrição:</strong> {tarefa.descricao || 'Sem descrição'}</p>
                <p><strong>Status:</strong> {tarefa.status}</p>
                <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>
                <p><strong>Responsável:</strong> {tarefa.responsavel}</p>
                <p><strong>Prazo:</strong> {tarefa.prazo}</p>
                <p><strong>ID do Projeto:</strong> {tarefa.projetoId}</p>
            </div>
        </div>
    );
}