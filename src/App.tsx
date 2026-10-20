
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ListaProjetos } from './pages/ListaProjetos';
import { PaginaProjeto } from './pages/PaginaProjeto';
import { ListaTarefas } from './pages/ListaTarefas';
import { DetalheTarefa } from './pages/DetalheTarefas';
import { NovaTarefa } from './pages/NovaTarefa';
import { EditarTarefa } from './pages/EditarTarefa';
import { CriarProjeto } from './pages/CriarProjeto';
import { EditarProjeto } from './pages/EditarProjeto';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rota inicial */}
          <Route index element={<Navigate to="/tarefas" replace />} />

          {/* Rotas de Tarefas */}
          <Route path="tarefas" element={<ListaTarefas />} />
          <Route path="tarefas/nova" element={<NovaTarefa />} />
          <Route path="tarefas/:id" element={<DetalheTarefa />} />
          <Route path="/tarefas/:id/editar" element={<EditarTarefa />} />

          {/* Rotas de Projetos */}
          <Route path="projetos" element={<ListaProjetos />} />
          <Route path="projetos/:id" element={<PaginaProjeto />} />
          <Route path="/projetos/novo" element={<CriarProjeto />} />
          <Route path="/projetos/:id/editar" element={<EditarProjeto />} />

          {/* Rota 404 */}
          <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
