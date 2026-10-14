import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjetos } from '../api';
import type { Projeto } from '../tipos';

export function ListaProjetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  useEffect(() => {
    getProjetos().then(setProjetos);
  }, []);

  return (
    <section>
      <h2>Projetos</h2>
      <ul>
        {projetos.map((projeto) => (
          <li key={projeto.id}>
            <Link to={`/projetos/${projeto.id}`}>{projeto.nome}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}