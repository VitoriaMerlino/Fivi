import { useEffect, useState } from 'react';
import type { Tarefa } from '../tipos';
import { getTarefas } from '../api';
import { TarefaCard } from '../components/TarefaCard';

export function ListaTarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        getTarefas()
            .then((dados) => {
                setTarefas(dados);
            })
            .catch((erro) => {
                console.error('Erro ao buscar tarefas:', erro);
            })
            .finally(() => {
                setCarregando(false);
            })
    }, []);

    if (carregando) {
        return <p>Carregando tarefas...</p>
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Lista de Tarefas</h2>

            {tarefas.length === 0 ? (
                <p>Nenhuma tarefa encontrada.</p>
            ) : (
                tarefas.map((tarefa) => (
                    // Usando o id da tarefa como chave obrigatoria
                    <TarefaCard key={tarefa.id} tarefa={tarefa} />
                ))
            )}
        </div>
    );
}