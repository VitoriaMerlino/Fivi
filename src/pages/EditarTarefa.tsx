import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTarefaPorId, atualizarTarefa, ehErro404 } from '../api';
import type { Tarefa } from '../tipos';
import { FormularioTarefa } from '../components/FormularioTarefa';
import { EstadoTela } from '../components/EstadoTela';

export function EditarTarefa() {
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
        console.error('Erro ao carregar tarefa:', e);
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

  // Se der erro, o FormularioTarefa mostra o aviso e mantém o que foi digitado
  async function handleSalvar(dados: Omit<Tarefa, 'id'>) {
    if (!id) return;
    await atualizarTarefa(id, dados);
    navigate(`/tarefas/${id}`);
  }

  if (carregando) {
    return <p style={{ color: '#ffffff', fontSize: '1.2rem' }}>Carregando dados da tarefa...</p>;
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
    <div style={{ maxWidth: '700px', margin: '0 auto', color: '#ffffff' }}>
      <Link
        to={`/tarefas/${id}`}
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

      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Editar Tarefa</h1>

      <FormularioTarefa
        key={tarefa.id}
        tarefaInicial={tarefa}
        aoEnviar={handleSalvar}
        textoBotao="Salvar Alterações"
      />
    </div>
  );
}