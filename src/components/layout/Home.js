import React, { useState, useEffect } from "react";
import clienteAxios from '../../config/axios';
import { Link } from "react-router-dom";
import Listas from "./Listas";
import Barra from './Barra';

const Home = () => {
  const [users, setUser] = useState([]);
  const [contador, setContador] = useState(0);
  const [mostrar,setMostrar]=useState(true)
  const [filtro, setFiltro] = useState([])

  const categorias = ['comida', 'cine', 'nafta', 'renta', 'sueldo', 'compras', 'otros']
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    const resultado = await clienteAxios.get('/api/operacion');
    const data = resultado.data.proyectos
    setUser(data)
    total(data)
  };
 
  const total = (data) => {
    data.forEach(e => {
      if (e.tipo === 'ingreso') {
        setContador(contador => contador + e.monto)
      } else {
        (setContador(contador => contador - e.monto))
      }
    });
  }

  const deleteId = async id => {
    try {
      await clienteAxios.delete(`/api/operacion/${id}`)
      loadUsers();
      window.location.reload(); 
    } catch (error) {
      console.log(error)
    } 
  };

  const eleccion = async (e) => {
    if(e.target.value==="todos"){
        setMostrar(true)
    }
    else if (e.target.value === "tipo") {
      setMostrar(false)
      const filtrado = users.filter(user => user.tipo === e.target.name)
      setFiltro(filtrado)
    }
    else if (e.target.value === "categoria") {
      setMostrar(false)
      const filtrado = users.filter(user => user.categoria === e.target.name)
      setFiltro(filtrado)
    }
  }

  return (
    <>
      <Barra />
        <div className="container">
          
          <div className="py-4">
            <h1>Balance $ {contador}</h1>
            <h2>Ver</h2>
            
            {
              contador!==0?
              (<Listas mostrar={mostrar}
                        users={users}
                        deleteId={deleteId}
                        filtro={filtro}
                        eleccion={eleccion}
                        categorias={categorias}

              />)
              :
              (
                <div className="my-4 text-uppercase">
                  <h3>no hay datos</h3>
                </div>
              )
            }
          
        
            <br />
            <Link className="btn btn-secondary btn-lg" to="/users/add">Agregar nuevo</Link>
          </div>
        </div>
    </>
  );
};

export default Home;
