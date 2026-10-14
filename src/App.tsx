import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ListaProjetos } from './pages/ListaProjetos';
import { PaginaProjeto } from './pages/PaginaProjeto';
import { ListaTarefas } from './pages/ListaTarefas';
import { DetalheTarefa } from './pages/DetalheTarefas';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rota inicial */}
          <Route index element={<Navigate to="/tarefas" replace />} />
          
          {/* Rotas de Tarefas */}
          <Route path="tarefas" element={<ListaTarefas />} />
          <Route path="tarefas/:id" element={<DetalheTarefa />} />
          
          {/* Rotas de Projetos */}
          <Route path="projetos" element={<ListaProjetos />} />
          <Route path="projetos/:id" element={<PaginaProjeto />} />

          {/* Rota 404 - Página Não Encontrada */}
          <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;