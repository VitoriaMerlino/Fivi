import { Link } from 'react-router-dom';

interface EstadoTelaProps {
  titulo: string;
  mensagem: string;
  voltarPara: string;
  textoVoltar: string;
  aoTentarNovamente?: () => void;
}

export function EstadoTela({
  titulo,
  mensagem,
  voltarPara,
  textoVoltar,
  aoTentarNovamente,
}: EstadoTelaProps) {
  return (
    <div
      role="alert"
      style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '30px',
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(12px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
      }}
    >
      <h1 style={{ margin: '0 0 12px 0', fontSize: '2rem' }}>{titulo}</h1>
      <p style={{ margin: '0 0 24px 0', fontSize: '1.1rem' }}>{mensagem}</p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        {aoTentarNovamente && (
          <button
            type="button"
            onClick={aoTentarNovamente}
            style={{
              padding: '10px 22px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              fontWeight: 'bold',
              borderRadius: '30px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
            }}
          >
            Tentar novamente
          </button>
        )}

        <Link
          to={voltarPara}
          style={{
            padding: '10px 22px',
            backgroundColor: '#ffffff',
            color: '#c026d3',
            fontWeight: 'bold',
            borderRadius: '30px',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
          }}
        >
          {textoVoltar}
        </Link>
      </div>
    </div>
  );
}