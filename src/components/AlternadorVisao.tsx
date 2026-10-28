import { Link, useLocation } from 'react-router-dom';

export function AlternadorVisao() {
  const { pathname } = useLocation();
  const noQuadro = pathname.startsWith('/quadro');

  const estilo = (ativo: boolean): React.CSSProperties => ({
    padding: '8px 20px',
    borderRadius: '25px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: ativo ? '#c026d3' : '#ffffff',
    backgroundColor: ativo ? '#ffffff' : 'transparent',
    border: ativo ? '1px solid #ffffff' : '1px solid transparent',
  });

  return (
    <nav
      aria-label="Alternar visão das tarefas"
      style={{
        display: 'inline-flex',
        gap: '6px',
        padding: '4px',
        marginBottom: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        borderRadius: '30px',
      }}
    >
      <Link to="/tarefas" style={estilo(!noQuadro)} aria-current={!noQuadro ? 'page' : undefined}>
        ☰ Lista
      </Link>
      <Link to="/quadro" style={estilo(noQuadro)} aria-current={noQuadro ? 'page' : undefined}>
        ▦ Quadro
      </Link>
    </nav>
  );
}