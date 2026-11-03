import { useState } from 'react';

interface BotaoExcluirProps {
  titulo: string;
  aoConfirmar: () => Promise<void>;
}

export function BotaoExcluir({ titulo, aoConfirmar }: BotaoExcluirProps) {
  const [confirmando, setConfirmando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState(false);

  async function handleConfirmar() {
    setExcluindo(true);
    setErro(false);

    try {
      await aoConfirmar();
    } catch (e) {
      console.error('Erro ao excluir tarefa:', e);
      setErro(true);
      setExcluindo(false);
    }
  }

  if (!confirmando) {
    return (
      <button
        type="button"
        onClick={() => setConfirmando(true)}
        style={{
          padding: '8px 18px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          fontWeight: 'bold',
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          cursor: 'pointer',
        }}
      >
        🗑 Excluir
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label={`Confirmar exclusão da tarefa ${titulo}`}
      style={{
        padding: '12px 14px',
        borderRadius: '14px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
        Excluir "{titulo}"? Essa ação não pode ser desfeita.
      </p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={handleConfirmar}
          disabled={excluindo}
          style={{
            padding: '8px 18px',
            backgroundColor: '#991b1b',
            color: '#ffffff',
            fontWeight: 'bold',
            borderRadius: '30px',
            border: '1px solid #ffffff',
            cursor: excluindo ? 'wait' : 'pointer',
            opacity: excluindo ? 0.7 : 1,
          }}
        >
          {excluindo ? 'Excluindo...' : 'Sim, excluir'}
        </button>

        <button
          type="button"
          onClick={() => {
            setConfirmando(false);
            setErro(false);
          }}
          disabled={excluindo}
          autoFocus
          style={{
            padding: '8px 18px',
            backgroundColor: '#ffffff',
            color: '#c026d3',
            fontWeight: 'bold',
            borderRadius: '30px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
      </div>

      {erro && (
        <p
          role="alert"
          style={{
            margin: '10px 0 0 0',
            padding: '6px 10px',
            borderRadius: '10px',
            backgroundColor: '#fef2f2',
            color: '#991b1b',
            fontWeight: 'bold',
            fontSize: '0.85rem',
          }}
        >
          ⚠ Não foi possível excluir a tarefa. Tente novamente.
        </p>
      )}
    </div>
  );
}