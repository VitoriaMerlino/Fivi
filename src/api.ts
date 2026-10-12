import axios from 'axios';
import type { Projeto, Tarefa} from './tipos';


// Interface estendida para o projeto com tarefas embutidas
export interface ProjetoComTarefas extends Projeto {
  tarefas: Tarefa[];
}

// Configuração base da URL do json-server
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// 1. Listar todas as tarefas
export async function getTarefas(): Promise<Tarefa[]> {
  const resposta = await api.get<Tarefa[]>('/tarefas');
  return resposta.data;
}

// 2. Buscar uma tarefa específica pelo ID
export async function getTarefaPorId(id: string): Promise<Tarefa> {
  const resposta = await api.get<Tarefa>(`/tarefas/${id}`);
  return resposta.data;
}

// 3. Listar todos os projetos
export async function getProjetos(): Promise<Projeto[]> {
  const resposta = await api.get<Projeto[]>('/projetos');
  return resposta.data;
}

// 4. Buscar um projeto com suas tarefas embutidas
export async function getProjetoComTarefas(id: string): Promise<ProjetoComTarefas> {
  const resposta = await api.get<ProjetoComTarefas>(`/projetos/${id}?_embed=tarefas`);
  return resposta.data;
}