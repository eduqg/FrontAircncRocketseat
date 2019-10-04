import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  // useMemo = Armazenar valor ate que variável mude
  // Refazer a conexão com o usuário apenas quando user_id mudar
  const user_id = localStorage.getItem('user');
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id }
  }), [user_id]);

  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data])
    });
  }, [requests, socket]);

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
      console.log(user_id);

      setSpots(response.data);
    }
    loadSpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);
    // Remover request de spot pois foi aprovada
    setRequests(requests.filter(requests => requests._id =! id))
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);
    // Remover request de spot pois foi aprovada
    setRequests(requests.filter(requests => requests._id =! id))
  }

  return (
    <>
      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company} </strong>para a data: <strong>{request.date}</strong>
            </p>
            <button onClick={() => handleAccept(request._id)} className="accept">ACEITAR</button>
            <button onClick={() => handleReject(request._id)} className="reject">REJEITAR</button>
          </li>
        ))}
      </ul>
      <ul className="spot-list">
        {
          spots.map((spot) => (
            <li key={spot._id}>
              {/* Com header consigo deixar imagens do mesmo tamanho */}
              <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
              <strong>{spot.company}</strong>
              <span>{spot.price ? `R$${spot.price}/dia` : `GRÁTIS`}</span>
            </li>
          ))
        }

      </ul>
      <Link to="/new">
        <button className="btn">Cadastrar novo Spot</button>
      </Link>
    </>
  );
}
