import { Link, Outlet, useLocation } from 'react-router-dom';

export function Layout() {
  const location = useLocation();

  // Verifica qual rota está ativa (funciona mesmo em sub-rotas como /tarefas/1)
  const isTarefasActive = location.pathname.startsWith('/tarefas');
  const isProjetosActive = location.pathname.startsWith('/projetos');

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4c1d95 0%, #c026d3 35%, #ea580c 70%, #facc15 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#ffffff',
      padding: '20px 20px 40px 20px',
      margin: 0
    }}>
      {/* Cabeçalho superior estilo Glassmorphism */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto 32px auto',
        padding: '10px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        borderRadius: '50px',
        border: '1px solid rgba(255, 255, 255, 0.25)'
      }}>
        {/* Logo Fivi */}
        <Link to="/tarefas" style={{ textDecoration: 'none' }}>
          <div style={{
            backgroundColor: '#ffffff',
            color: '#4c1d95',
            fontWeight: 'bold',
            padding: '8px 22px',
            borderRadius: '25px',
            fontSize: '1.1rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            Fivi
          </div>
        </Link>

        {/* Menu com destaque para a aba ativa */}
        <nav style={{
          display: 'flex',
          gap: '6px',
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          padding: '4px',
          borderRadius: '30px'
        }}>
          {/* Botão Tarefas */}
          <Link
            to="/tarefas"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: '600',
              padding: '8px 20px',
              borderRadius: '25px',
              backgroundColor: isTarefasActive ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
              border: isTarefasActive ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid transparent',
              boxShadow: isTarefasActive ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
              transition: 'all 0.3s ease',
              opacity: isTarefasActive ? 1 : 0.7
            }}
          >
            Tarefas
          </Link>

          {/* Botão Projetos */}
          <Link
            to="/projetos"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: '600',
              padding: '8px 20px',
              borderRadius: '25px',
              backgroundColor: isProjetosActive ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
              border: isProjetosActive ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid transparent',
              boxShadow: isProjetosActive ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
              transition: 'all 0.3s ease',
              opacity: isProjetosActive ? 1 : 0.7
            }}
          >
            Projetos
          </Link>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Outlet />
      </main>
    </div>
  );
}