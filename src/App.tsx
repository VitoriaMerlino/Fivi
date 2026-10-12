import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/tarefas" replace />} />
          <Route path="tarefas" element={<h2>Lista de Tarefas</h2>} />
          <Route path="projetos" element={<h2>Lista de Projetos</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;