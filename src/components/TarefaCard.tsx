import { Link } from 'react-router-dom';
import type { Tarefa } from '../tipos';

interface Props {
    tarefa: Tarefa;
}

export function TarefaCard({ tarefa }: Props) {
    return (
        <div style={{
            border: '1px solid #e2e8e0',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{tarefa.titulo}</h3>
            <p style={{ margin: '4px 0' }}><strong>Status:</strong> {tarefa.status}</p>
            <p style={{ margin: '4px 0' }}><strong>Prioridade:</strong> {tarefa.prioridade}</p>
            <p style={{ margin: '4px 0' }}><strong>Responsável:</strong> {tarefa.responsavel}</p>
            <p style={{ margin: '4px 0' }}><strong>Prazo:</strong> {tarefa.prazo}</p>

            <div style={{ marginTop: '12px' }}>
                <Link
                    to={`/tarefas/${tarefa.id}`}
                    style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}
                >
                    Ver detalhes →
                </Link>
            </div>
        </div>
    );
}