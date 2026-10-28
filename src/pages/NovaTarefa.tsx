import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { FormularioTarefa } from '../components/FormularioTarefa';
import { criarTarefa } from '../api';

export function NovaTarefa() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Vem preenchido quando a tela é aberta pela página de um projeto
  const projetoIdDaUrl = searchParams.get('projetoId') ?? '';
  const voltarPara = projetoIdDaUrl ? `/projetos/${projetoIdDaUrl}` : '/tarefas';

  async function handleCriarTarefa(dados: Parameters<typeof criarTarefa>[0]) {
    await criarTarefa(dados);
    navigate('/tarefas');
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', color: '#ffffff' }}>
      <Link
        to={voltarPara}
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
          marginBottom: '24px',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
        }}
      >
        ← Cancelar
      </Link>

      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Nova Tarefa</h1>

      <FormularioTarefa
        tarefaInicial={{ projetoId: projetoIdDaUrl }}
        aoEnviar={handleCriarTarefa}
        textoBotao="Criar Tarefa"
      />
    </div>
  );
}