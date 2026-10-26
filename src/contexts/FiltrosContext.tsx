import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Status, Prioridade } from '../tipos';

interface FiltrosContextType {
  busca: string;
  setBusca: (texto: string) => void;
  status: Status | 'todos';
  setStatus: (status: Status | 'todos') => void;
  prioridade: Prioridade | 'todas';
  setPrioridade: (prioridade: Prioridade | 'todas') => void;
}

const FiltrosContext = createContext<FiltrosContextType>({} as FiltrosContextType);

export function FiltrosProvider({ children }: { children: ReactNode }) {
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState<Status | 'todos'>('todos');
  const [prioridade, setPrioridade] = useState<Prioridade | 'todas'>('todas');

  return (
    <FiltrosContext.Provider
      value={{ busca, setBusca, status, setStatus, prioridade, setPrioridade }}
    >
      {children}
    </FiltrosContext.Provider>
  );
}

export function useFiltros() {
  return useContext(FiltrosContext);
}