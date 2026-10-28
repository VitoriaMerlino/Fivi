import axios from 'axios';
import type { Projeto, Tarefa, Status } from './tipos';


// Interface estendida para o projeto com tarefas embutidas
export interface ProjetoComTarefas extends Projeto {
  tarefas: Tarefa[];
}

// Configuração base da URL do json-server
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Listar todas as tarefas
export async function getTarefas(): Promise<Tarefa[]> {
  const resposta = await api.get<Tarefa[]>('/tarefas');
  return resposta.data;
}

// Buscar uma tarefa específica pelo ID
export async function getTarefaPorId(id: string): Promise<Tarefa> {
  const resposta = await api.get<Tarefa>(`/tarefas/${id}`);
  return resposta.data;
}

// Listar todos os projetos
export async function getProjetos(): Promise<Projeto[]> {
  const resposta = await api.get<Projeto[]>('/projetos');
  return resposta.data;
}

// Buscar um projeto com suas tarefas embutidas
export async function getProjetoComTarefas(id: string): Promise<ProjetoComTarefas> {
  const resposta = await api.get<ProjetoComTarefas>(`/projetos/${id}?_embed=tarefas`);
  return resposta.data;
}

// Criar uma nova tarefa (POST)
export async function criarTarefa(tarefa: Omit<Tarefa, 'id'>): Promise<Tarefa> {
  const resposta = await api.post<Tarefa>('/tarefas', tarefa);
  return resposta.data;
}

// Atualizar/Editar uma tarefa existente (PUT)
export async function atualizarTarefa(id: string | number, tarefa: Partial<Tarefa>): Promise<Tarefa> {
  const resposta = await api.put<Tarefa>(`/tarefas/${id}`, tarefa);
  return resposta.data;
}

// Deletar uma tarefa (DELETE) - opcional, mas ótimo ter!
export async function deletarTarefa(id: string | number): Promise<void> {
  await api.delete(`/tarefas/${id}`);
}

// Criar um novo projeto (POST)
export async function criarProjeto(projeto: Omit<Projeto, 'id'>): Promise<Projeto> {
  const resposta = await api.post<Projeto>('/projetos', projeto);
  return resposta.data;
}

export async function atualizarProjeto(id: string | number, projeto: Partial<Projeto>): Promise<Projeto> {
  const resposta = await api.put<Projeto>(`/projetos/${id}`, projeto);
  return resposta.data;
}

export async function getProjetoPorId(id: string | number): Promise<Projeto> {
  const resposta = await api.get<Projeto>(`/projetos/${id}`);
  return resposta.data;
}

// Atualiza apenas o status de uma tarefa (PATCH não apaga os outros campos)
export async function atualizarStatusTarefa(
  id: string | number,
  status: Status
): Promise<Tarefa> {
  const resposta = await api.patch<Tarefa>(`/tarefas/${id}`, { status });
  return resposta.data;
}