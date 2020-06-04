import React, { useEffect, useState } from 'react';
import './styles.css'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import api from '../../services/api';


  // criando estados para a função
  // sempre quando criar estado tem que informar o tipo do Array ou objeto manualmente
  interface Item {
    id: number;
    title: string;
    image_url: string;
  }

  interface IBGEUFResponse {
    sigla: string;
    //nome: string;
  }

  
  const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs ] = useState<string[]>([]);

  //tudo aqui dentro executa uma vez
  useEffect(() => {
    api.get('items').then(Response => {
      setItems(Response.data);
    })
  }, []);
  
  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);
      //const ufIName = response.data.map(uf => uf.nome);
      setUfs(ufInitials)
    });
  }, []);






  //----- Site ----
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home 
        </Link>
      </header>
        <form action="">
          <h1>Cadastro do<br/> ponto de coleta</h1>
          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>  
            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                />
            </div>
            <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                />
            </div>
            <div className="field">
              <label htmlFor="Whatsapp">Whatsapp</label>
                <input 
                  type="text" 
                  name="Whatsapp" 
                  id="Whatsapp"
                />
            </div>
            </div>

          </fieldset>
          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>
            <Map center={[-21.1572213,-47.7341727]} zoom={15} >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[-21.1572213,-47.7341727]}/>
            </Map>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="uf">Estado (UF</label>
                  <select name="uf" id="uf">
                    <option value="0">Selecione uma UF</option>
                    {ufs.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="city">Cidade</label>
                  <select name="city" id="city">
                    <option value="0">Selecione uma cidade</option>
                   
                  </select>
                </div>
              </div>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Ítens de coleta</h2>
              <span>Selecione um ou mais ítens abaixo</span>
            </legend>
            <ul className="items-grid" >
              {items.map(item => (
                <li key={item.id}>
                <img src={item.image_url} alt={item.title}/>
                <span>{item.title}</span>
              </li>
              ))}
            </ul>
          </fieldset>
          <button type="submit">
            Cadastrar ponto de coleta
          </button>
        </form>
    </div>
  );
};

export default CreatePoint;