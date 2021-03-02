import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import clienteAxios from '../../config/axios';
import Barra from "./Barra";
import {Link} from 'react-router-dom'

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    nombre: "",
    categoria: "",
    tipo: "",
    monto: "",
    fecha: ""
  });

  const { nombre, categoria, monto, fecha } = user;
  const categorias = ['comida', 'cine', 'nafta', 'renta', 'sueldo', 'compras', 'otros']
  
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, [id]);

  const onSubmit = async e => {
    e.preventDefault();
    await clienteAxios.put(`/api/operacion/${id}`, user);
    history.push("/");
  };

  const loadUser = async () => {
    const result = await clienteAxios.get(`/api/operacion/${id}`);
    setUser(result.data.proyecto);
  };
  
  return (
   <>
    <Barra/>
      <div className="container mt-5">
      <Link to="/home" className="btn btn-secondary btn-lg mb-4">Atras</Link>
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Editar</h2>
          <form onSubmit={e => onSubmit(e)}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your Name"
                name="nombre"
                value={nombre}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div>
              <select onChange={(e) => onInputChange(e)}
                name="categoria"
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
                defaultValue={'DEFAULT'}>

                <option value="DEFAULT" disabled >{categoria}</option>
                {categorias.map((cat) => (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <input
                type="number"
                className="form-control form-control-lg mb-3"
                placeholder="Enter Your Phone Number"
                name="monto"
                value={monto}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                className="form-control form-control-lg mb-3"
                placeholder="Enter Your Website Name"
                name="fecha"
                value={fecha}
                
                onChange={e => onInputChange(e)}
              />
            </div>
            <button className="btn btn-dark btn-block">Editar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;


