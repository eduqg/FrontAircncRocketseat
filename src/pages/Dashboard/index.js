import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  // Ao iniciar, executar o que está em useEffect.
  // [] = Variáveis que quando alteradas, executar useEffect. Pode ser por exemplo um filtro
  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: {
          user_id
        }
      });
      setSpots(response.data);
    }
    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {
          spots.map((spot) => (
            <li key={spot._id}>
              {/* Com header consigo deixar imagens do mesmo tamanho */}
              <header />
              <strong>{spot.company}</strong>
              <span>{spot.price}</span>
            </li>
          ))
        }

      </ul>
    </>
  );
}
