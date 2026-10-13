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
        return <p>Carregando detalhes...</p>;
    }

    if (!tarefa) {
        return <p>Tarefa não encontrada...</p>;
    }

    return (
        <div style={{ padding: '16px', maxWidth: '600px' }}>
            <Link to="/tarefas" style={{ color: '#2563eb', textDecoration: 'none' }}>
                ← Voltar para a lista
            </Link>

            <h1 style={{ marginTop: '16px' }}>{tarefa.titulo}</h1>

            <div style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#ffffff'
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