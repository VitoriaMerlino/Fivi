import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ListaProjetos } from './pages/ListaProjetos';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rota inicial */}
          <Route index element={<Navigate to="/tarefas" replace />} />
          
          {/* Rotas de Tarefas */}
          <Route path="tarefas" element={<h2>Lista de Tarefas</h2>} />
          <Route path="tarefas/:id" element={<h2>Detalhes da Tarefa</h2>} />
          
          {/* Rotas de Projetos */}
          <Route path="projetos" element={<ListaProjetos />} />
          <Route path="projetos/:id" element={<h2>Página do Projeto</h2>} />

          {/* Rota 404 - Página Não Encontrada */}
          <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;