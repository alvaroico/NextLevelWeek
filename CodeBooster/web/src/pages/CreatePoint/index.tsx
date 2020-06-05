import React, { useEffect, useState, ChangeEvent, FormEvent} from 'react';
import './styles.css'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import {LeafletMouseEvent} from 'leaflet';
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
    nome: string;
  }
  interface IBGECityResponse {
    id: number;
    nome: string;
  }


  
  const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs ] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECityResponse[]>([]);

  const [initialPosition, setinitialPosition] = useState<[number, number]>([0,0]);

  const [formData, setformData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity , setSelectedCity] = useState('0');
  const [selectedItems, setselectedItems] = useState<number[]>([]);
  const [selectedPosition, setselectedPosition] = useState<[number, number]>([0,0]);
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords

      setinitialPosition([latitude, longitude]);
    });
  }, []);

  //tudo aqui dentro executa uma vez
  useEffect(() => {
    api.get('items').then(Response => {
      setItems(Response.data);
    })
  }, []);
  
  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf);
      //const ufIName = response.data.map(uf => uf.nome);
      setUfs(ufInitials)
    });
  }, []);

  useEffect(() => {
    // carregar as cidades sempre que a UF mudar
    if (selectedUf === '0'){
      return;
    }
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const cityNames = response.data.map(city => city);
      
      setCities(cityNames);
    });
  }, [selectedUf]);

  function handleSelectUF(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf.toString());
  }
  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city.toString());
  }
  function handleMapClick(event: LeafletMouseEvent){  
    setselectedPosition([
      event.latlng.lat,
      event.latlng.lng,
    ])
  }
  function handleImputChange(event: ChangeEvent<HTMLInputElement>){
      const { name, value } = event.target
      console.log(name, value)

      setformData({ ...formData, [name]: value })
  }
  function handleSelectItem(id: number){
    const alreadySelected = selectedItems.findIndex(item => item === id);
    
    if (alreadySelected >= 0 ){
      const filteredItems = selectedItems.filter(item => item !== id);
      setselectedItems(filteredItems);
    } else {
     setselectedItems([...selectedItems, id]);
    }
  }

  /*async*/ function handleSubmit(event: FormEvent){
    //mantem o submit mesma tela
    event.preventDefault();
    const { name, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [ latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = {
      name, 
      email, 
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items,
    };
    //await api.post('points', data);
    console.log(data);
    
    
    alert('Ponto de coleta Criado!');

  }




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
        <form onSubmit={handleSubmit} >
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
                  onChange={handleImputChange}
                />
            </div>
            <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  onChange={handleImputChange}
                />
            </div>
            <div className="field">
              <label htmlFor="Whatsapp">Whatsapp</label>
                <input 
                  type="text" 
                  name="Whatsapp" 
                  id="Whatsapp"
                  onChange={handleImputChange}
                />
            </div>
            </div>

          </fieldset>
          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>
            <Map center={initialPosition} zoom={15} onClick={handleMapClick} >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={selectedPosition}/>
            </Map>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="uf">Estado (UF)</label>
                  <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUF}>
                    <option value="0">Selecione uma UF</option>
                    {ufs.map(uf => (
                      <option key={uf.sigla} value={uf.sigla}>{uf.nome}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="city">Cidade</label>
                  <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                    <option value="0">Selecione uma cidade</option>
                    {cities.map(city => (
                      <option key={city.id} value={city.nome}>{city.nome}</option>
                    ))}
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
                <li key={item.id} onClick={() => handleSelectItem(item.id)} className={selectedItems.includes(item.id) ? 'selected' : ''} >
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