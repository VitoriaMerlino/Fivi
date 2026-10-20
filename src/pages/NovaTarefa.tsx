
import { useNavigate } from 'react-router-dom';
import { FormularioTarefa } from '../components/FormularioTarefa';
import { criarTarefa } from '../api';

export function NovaTarefa() {
  const navigate = useNavigate();

  async function handleCriarTarefa(
    dados: Parameters<typeof criarTarefa>[0]
  ) {
    await criarTarefa(dados);
    navigate('/tarefas');
  }

  return (
    <main>
      <h1>Nova Tarefa</h1>

      <FormularioTarefa
        aoEnviar={handleCriarTarefa}
        textoBotao="Criar Tarefa"
      />
    </main>
  );
}
