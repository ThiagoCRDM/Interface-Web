import React, { useState ,useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Main.css';
import './Sidebar.css';


function App() {

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [github_username, setGithubUsername]= useState('');
  const [techs, setTechs]= useState('');


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  async function handleAddDev(e){
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    });

    console.log(response.data);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" required value= {github_username} onChange={e => setGithubUsername(e.target.value)}/>
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)}/>
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="number" name="latitude" id="latitude" required value= {latitude} onChange={e => setLatitude(e.target.value)}/>
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="number" name="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)}/>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/59209966?s=460&v=4" alt="Thiago Cesar" />
              <div className="user-info">
                <strong>Thiago César</strong>
                <span> C++, Java, Dart, Node</span>
              </div>
            </header>
            <p>Aluno do Instituto Federal de Educação Tecnológica de IPORÁ - GO. Cursando Tecnologia em Análise e Desenvolvimento de Sistemas.</p>
            <a href="https://github.com/ThiagoCRDM">Acessar Perfil</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
