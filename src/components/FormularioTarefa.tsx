
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { Tarefa, Projeto } from '../tipos';
import { getProjetos } from '../api';

interface Props {
  tarefaInicial?: Partial<Tarefa>;
  aoEnviar: (dados: Omit<Tarefa, 'id'>) => void | Promise<void>;
  textoBotao?: string;
}

interface ErrosFormulario {
  titulo?: string;
  projetoId?: string;
}

export function FormularioTarefa({
  tarefaInicial,
  aoEnviar,
  textoBotao = 'Salvar Tarefa',
}: Props) {
  const [titulo, setTitulo] = useState(tarefaInicial?.titulo ?? '');
  const [descricao, setDescricao] = useState(tarefaInicial?.descricao ?? '');
  const [status, setStatus] = useState<Tarefa['status']>(
    tarefaInicial?.status ?? 'a-fazer'
  );
  const [prioridade, setPrioridade] = useState<Tarefa['prioridade']>(
    tarefaInicial?.prioridade ?? 'media'
  );
  const [responsavel, setResponsavel] = useState(tarefaInicial?.responsavel ?? '');
  const [prazo, setPrazo] = useState(tarefaInicial?.prazo ?? '');
  const [projetoId, setProjetoId] = useState(tarefaInicial?.projetoId ?? '');

  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregandoProjetos, setCarregandoProjetos] = useState(true);
  const [erroProjetos, setErroProjetos] = useState(false);

  const [erros, setErros] = useState<ErrosFormulario>({});
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState('');

  useEffect(() => {
    async function carregarProjetos() {
      try {
        const lista = await getProjetos();
        setProjetos(lista);

        if (
          lista.length > 0 &&
          !lista.some((projeto) => String(projeto.id) === String(projetoId))
        ) {
          setProjetoId(lista[0].id);
        }
      } catch (erro) {
        console.error('Erro ao carregar projetos:', erro);
        setErroProjetos(true);
      } finally {
        setCarregandoProjetos(false);
      }
    }

    carregarProjetos();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (enviando) return;

    const novosErros: ErrosFormulario = {};

    if (!titulo.trim()) {
      novosErros.titulo = 'Informe o título da tarefa.';
    }

    if (!projetoId) {
      novosErros.projetoId = 'Selecione um projeto.';
    }

    setErros(novosErros);
    setErroEnvio('');

    if (Object.keys(novosErros).length > 0) {
      if (novosErros.titulo) {
        document.getElementById('titulo')?.focus();
      } else if (novosErros.projetoId) {
        document.getElementById('projeto')?.focus();
      }
      return;
    }

    setEnviando(true);

    try {
      await aoEnviar({
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        status,
        prioridade,
        responsavel: responsavel.trim(),
        prazo,
        projetoId: String(projetoId),
      });
    } catch (erro) {
      console.error('Erro ao salvar tarefa:', erro);
      setErroEnvio(
        'Não foi possível salvar a tarefa. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setEnviando(false);
    }
  }

  const botaoDesabilitado =
    enviando || carregandoProjetos || projetos.length === 0;

  return (
    <form onSubmit={handleSubmit} noValidate style={formStyle}>
      <div>
        <label htmlFor="titulo" style={labelStyle}>
          Título da tarefa *
        </label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value);
            if (e.target.value.trim()) {
              setErros((atuais) => ({ ...atuais, titulo: undefined }));
            }
          }}
          required
          maxLength={120}
          aria-invalid={Boolean(erros.titulo)}
          aria-describedby={erros.titulo ? 'erro-titulo' : undefined}
          style={estiloCampo(Boolean(erros.titulo))}
        />
        {erros.titulo && (
          <p id="erro-titulo" role="alert" style={erroStyle}>
            ⚠ {erros.titulo}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="descricao" style={labelStyle}>
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <div>
        <label htmlFor="projeto" style={labelStyle}>
          Projeto *
        </label>

        {carregandoProjetos ? (
          <p role="status" style={{ margin: 0 }}>
            Carregando projetos...
          </p>
        ) : (
          <>
            <select
              id="projeto"
              name="projetoId"
              value={projetoId}
              onChange={(e) => {
                setProjetoId(e.target.value);
                if (e.target.value) {
                  setErros((atuais) => ({ ...atuais, projetoId: undefined }));
                }
              }}
              required
              disabled={projetos.length === 0}
              aria-invalid={Boolean(erros.projetoId)}
              aria-describedby={erros.projetoId ? 'erro-projeto' : undefined}
              style={estiloCampo(Boolean(erros.projetoId))}
            >
              <option value="" style={{ color: '#000' }}>
                Selecione um projeto
              </option>
              {projetos.map((projeto) => (
                <option key={projeto.id} value={projeto.id} style={{ color: '#000' }}>
                  {projeto.nome}
                </option>
              ))}
            </select>

            {erros.projetoId && (
              <p id="erro-projeto" role="alert" style={erroStyle}>
                ⚠ {erros.projetoId}
              </p>
            )}

            {erroProjetos && (
              <p role="alert" style={erroStyle}>
                ⚠ Não foi possível carregar os projetos. Tente recarregar a página.
              </p>
            )}

            {!erroProjetos && projetos.length === 0 && (
              <p role="status" style={{ margin: '6px 0 0 0' }}>
                Nenhum projeto disponível. Cadastre um projeto antes de criar a tarefa.
              </p>
            )}
          </>
        )}
      </div>

      <div style={doisCampos}>
        <div>
          <label htmlFor="status" style={labelStyle}>
            Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Tarefa['status'])}
            style={inputStyle}
          >
            <option value="a-fazer" style={{ color: '#000' }}>A Fazer</option>
            <option value="em-andamento" style={{ color: '#000' }}>Em Andamento</option>
            <option value="em-revisao" style={{ color: '#000' }}>Em Revisão</option>
            <option value="concluida" style={{ color: '#000' }}>Concluída</option>
          </select>
        </div>

        <div>
          <label htmlFor="prioridade" style={labelStyle}>
            Prioridade
          </label>
          <select
            id="prioridade"
            name="prioridade"
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value as Tarefa['prioridade'])}
            style={inputStyle}
          >
            <option value="baixa" style={{ color: '#000' }}>Baixa</option>
            <option value="media" style={{ color: '#000' }}>Média</option>
            <option value="alta" style={{ color: '#000' }}>Alta</option>
          </select>
        </div>
      </div>

      <div style={doisCampos}>
        <div>
          <label htmlFor="responsavel" style={labelStyle}>
            Responsável
          </label>
          <input
            id="responsavel"
            name="responsavel"
            type="text"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="prazo" style={labelStyle}>
            Prazo
          </label>
          <input
            id="prazo"
            name="prazo"
            type="date"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {erroEnvio && (
        <p role="alert" aria-live="assertive" style={erroStyle}>
          ⚠ {erroEnvio}
        </p>
      )}

      <button
        type="submit"
        disabled={botaoDesabilitado}
        style={{
          marginTop: '12px',
          padding: '12px 24px',
          backgroundColor: '#ffffff',
          color: '#c026d3',
          fontWeight: 'bold',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '30px',
          cursor: botaoDesabilitado ? 'not-allowed' : 'pointer',
          opacity: botaoDesabilitado ? 0.6 : 1,
          boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
        }}
      >
        {enviando ? 'Salvando...' : textoBotao}
      </button>
    </form>
  );
}

const formStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(12px)',
  borderRadius: '20px',
  padding: '30px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  color: '#ffffff',
};

const doisCampos: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: 'bold',
};

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

// Campo com erro ganha borda grossa e clara, além da mensagem escrita
const estiloCampo = (invalido: boolean): React.CSSProperties => ({
  ...inputStyle,
  border: invalido ? '2px solid #ffffff' : inputStyle.border,
});

const erroStyle: React.CSSProperties = {
  margin: '6px 0 0 0',
  padding: '8px 12px',
  borderRadius: '10px',
  backgroundColor: '#fef2f2',
  color: '#991b1b',
  fontWeight: 'bold',
  fontSize: '0.9rem',
};