import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { criarProjeto } from '../api';

export function CriarProjeto() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [salvando, setSalvando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSalvando(true);
      await criarProjeto({
        nome,
        descricao,
        disciplina,
        criadoEm: new Date().toISOString().split('T')[0], // Gera a data atual no formato AAAA-MM-DD
      });
      navigate('/projetos');
    } catch (erro) {
      console.error('Erro ao criar projeto:', erro);
      alert('Ocorreu um erro ao criar o projeto.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', color: '#ffffff' }}>
      <Link
        to="/projetos"
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

      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Novo Projeto</h1>

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
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Nome do Projeto
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Disciplina
          </label>
          <input
            type="text"
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Descrição
          </label>
          <textarea
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
          {salvando ? 'A guardar...' : 'Criar Projeto'}
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