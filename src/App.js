import React from 'react';
import './App.css';

import logo from './assets/logo.svg';
function App() {
  return (
    <div className='container'>
      <img src={logo} alt='AircncLogo' />
      <div className='content'>
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para a sua empresa.
        </p>
        <form action="">
          <label htmlFor="email">E-mail *</label>
          <input
            type="email"
            id="email"
            placeholder="Seu melhor e-mail"
          />
          <button type="submit" className="btn">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
