
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

  const [projetoId, setProjetoId] = useState(
    tarefaInicial?.projetoId ?? ''
  );

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
        responsavel: tarefaInicial?.responsavel ?? '',
        prazo: tarefaInicial?.prazo ?? '',
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

  return (
    <form onSubmit={handleSubmit} className="form-tarefa" noValidate>
      <div className="campo">
        <label htmlFor="titulo">Título da tarefa *</label>
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
        />
        {erros.titulo && (
          <p id="erro-titulo" role="alert">
            {erros.titulo}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

//form projeto
      <div className="campo">
        <label htmlFor="projeto">Projeto *</label>

        {carregandoProjetos ? (
          <p role="status">Carregando projetos...</p>
        ) : (
          <>
            <select
              id="projeto"
              name="projetoId"
              value={projetoId}
              onChange={(e) => {
                setProjetoId(e.target.value);
                if (e.target.value) {
                  setErros((atuais) => ({
                    ...atuais,
                    projetoId: undefined,
                  }));
                }
              }}
              required
              disabled={projetos.length === 0}
              aria-invalid={Boolean(erros.projetoId)}
              aria-describedby={
                erros.projetoId ? 'erro-projeto' : undefined
              }
            >
              <option value="">Selecione um projeto</option>
              {projetos.map((projeto) => (
                <option key={projeto.id} value={projeto.id}>
                  {projeto.nome}
                </option>
              ))}
            </select>

            {erros.projetoId && (
              <p id="erro-projeto" role="alert">
                {erros.projetoId}
              </p>
            )}

            {erroProjetos && (
              <p role="alert">
                Não foi possível carregar os projetos. Tente recarregar a página.
              </p>
            )}

            {!erroProjetos && projetos.length === 0 && (
              <p role="status">
                Nenhum projeto disponível. Cadastre um projeto antes de criar a tarefa.
              </p>
            )}
          </>
        )}
      </div>

      <div className="campo">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as Tarefa['status'])
          }
        >
          <option value="a-fazer">A Fazer</option>
          <option value="em-andamento">Em Andamento</option>
          <option value="em-revisao">Em Revisão</option>
          <option value="concluida">Concluída</option>
        </select>
      </div>

      <div className="campo">
        <label htmlFor="prioridade">Prioridade</label>
        <select
          id="prioridade"
          name="prioridade"
          value={prioridade}
          onChange={(e) =>
            setPrioridade(e.target.value as Tarefa['prioridade'])
          }
        >
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      {erroEnvio && (
        <p role="alert" aria-live="assertive">
          {erroEnvio}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando || carregandoProjetos || projetos.length === 0}
      >
        {enviando ? 'Salvando...' : textoBotao}
      </button>
    </form>
  );
}
