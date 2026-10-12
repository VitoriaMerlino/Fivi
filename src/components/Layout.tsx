import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div>
      <header style={{ padding: '1rem', background: '#f4f4f4', borderBottom: '1px solid #ccc' }}>
        <h1>Fivi</h1>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/tarefas">Tarefas</Link>
          <Link to="/projetos">Projetos</Link>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}