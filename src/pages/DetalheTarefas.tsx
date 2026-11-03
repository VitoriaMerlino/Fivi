import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { Tarefa } from '../tipos';
import { getTarefaPorId, deletarTarefa, ehErro404 } from "../api";
import { BotaoExcluir } from "../components/BotaoExcluir";
import { EstadoTela } from "../components/EstadoTela";

export function DetalheTarefa() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [tarefa, setTarefa] = useState<Tarefa | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<'nao-encontrada' | 'falha' | null>(null);
    const [tentativa, setTentativa] = useState(0);

    useEffect(() => {
        if (!id) return;
        let cancelado = false;

        setCarregando(true);
        setErro(null);

        getTarefaPorId(id)
            .then((dados) => {
                if (!cancelado) setTarefa(dados);
            })
            .catch((e) => {
                if (cancelado) return;
                console.error('Erro ao buscar detalhe da tarefa:', e);
                setTarefa(null);
                setErro(ehErro404(e) ? 'nao-encontrada' : 'falha');
            })
            .finally(() => {
                if (!cancelado) setCarregando(false);
            });

        return () => {
            cancelado = true;
        };
    }, [id, tentativa]);

    if (carregando) {
        return <p style={{ color: '#ffffff', fontSize: '1.2rem' }}>Carregando detalhes...</p>;
    }

    if (erro === 'nao-encontrada') {
        return (
            <EstadoTela
                titulo="Tarefa não encontrada"
                mensagem={`Não existe nenhuma tarefa com o código ${id}.`}
                voltarPara="/tarefas"
                textoVoltar="← Voltar para a lista"
            />
        );
    }

    if (erro === 'falha') {
        return (
            <EstadoTela
                titulo="Não foi possível carregar a tarefa"
                mensagem="Verifique se a API está no ar e tente novamente."
                voltarPara="/tarefas"
                textoVoltar="← Voltar para a lista"
                aoTentarNovamente={() => setTentativa((t) => t + 1)}
            />
        );
    }

    if (!tarefa) return null;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', color: '#ffffff' }}>
            {/* Barra superior de ações */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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

            <h1 style={{ marginTop: '24px', marginBottom: '20px', fontSize: '2.2rem', color: '#ffffff' }}>
                {tarefa.titulo}
            </h1>

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

            {/* Exclusão com confirmação */}
            <div style={{ marginTop: '20px' }}>
                <BotaoExcluir
                    titulo={tarefa.titulo}
                    aoConfirmar={async () => {
                        await deletarTarefa(tarefa.id);
                        navigate('/tarefas');
                    }}
                />
            </div>
        </div>
    );
}