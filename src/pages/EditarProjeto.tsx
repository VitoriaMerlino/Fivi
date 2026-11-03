import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProjetoPorId, atualizarProjeto, ehErro404 } from '../api';
import type { Projeto } from '../tipos';
import { EstadoTela } from '../components/EstadoTela';

export function EditarProjeto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<'nao-encontrado' | 'falha' | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    if (!id) return;
    let cancelado = false;

    setCarregando(true);
    setErro(null);

    getProjetoPorId(id)
      .then((dados) => {
        if (cancelado) return;
        setProjeto(dados);
        setNome(dados.nome || '');
        setDescricao(dados.descricao || '');
      })
      .catch((e) => {
        if (cancelado) return;
        console.error('Erro ao carregar projeto:', e);
        setProjeto(null);
        setErro(ehErro404(e) ? 'nao-encontrado' : 'falha');
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [id, tentativa]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !projeto) return;

    try {
      setSalvando(true);
      // Manda o projeto inteiro: o PUT substitui o objeto e apagaria os outros campos
      await atualizarProjeto(id, { ...projeto, nome, descricao });
      navigate(`/projetos/${id}`);
    } catch (erro) {
      console.error('Erro ao atualizar projeto:', erro);
      alert('Ocorreu um erro ao guardar as alterações.');
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return <p style={{ color: '#ffffff', fontSize: '1.2rem' }}>Carregando dados do projeto...</p>;
  }

  if (erro === 'nao-encontrado') {
    return (
      <EstadoTela
        titulo="Projeto não encontrado"
        mensagem={`Não existe nenhum projeto com o código ${id}.`}
        voltarPara="/projetos"
        textoVoltar="← Voltar para projetos"
      />
    );
  }

  if (erro === 'falha') {
    return (
      <EstadoTela
        titulo="Não foi possível carregar o projeto"
        mensagem="Verifique se a API está no ar e tente novamente."
        voltarPara="/projetos"
        textoVoltar="← Voltar para projetos"
        aoTentarNovamente={() => setTentativa((t) => t + 1)}
      />
    );
  }

  if (!projeto) return null;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', color: '#ffffff' }}>
      <Link
        to={`/projetos/${id}`}
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

      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Editar Projeto</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '30px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        <div>
          <label
            htmlFor="nome-projeto"
            style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}
          >
            Nome do Projeto
          </label>
          <input
            id="nome-projeto"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label
            htmlFor="descricao-projeto"
            style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}
          >
            Descrição
          </label>
          <textarea
            id="descricao-projeto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          disabled={salvando}
          style={{
            marginTop: '12px',
            padding: '12px 24px',
            backgroundColor: '#ffffff',
            color: '#c026d3',
            fontWeight: 'bold',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
          }}
        >
          {salvando ? 'A guardar...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  color: '#ffffff',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
};