import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import clienteAxios from '../../config/axios';
import Barra from './Barra'

const AddUser = () => {
  let history = useHistory();

  const categorias = ['comida', 'cine', 'nafta', 'renta', 'sueldo', 'compras', 'otros']
  const [error, setError] = useState(false)
  const [user, setUser] = useState({
    nombre: "",
    categoria: "",
    tipo: "",
    monto: "",
    fecha: ""
  });

  const { nombre, categoria, tipo, monto, fecha } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });

  };

  const onSubmit = async e => {
    e.preventDefault();
    if (nombre === "" || categoria === "" || tipo === "" || fecha === "" || monto === 0) {
      setError(true)
      return
    }
    await clienteAxios.post("/api/operacion", user);
    history.push("/");
    setError(false)
  };

  return (
    <>
      <Barra />

      <div className="container">

        <Link to="/home" className="btn btn-secondary btn-lg my-4">Atras</Link>
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Nuevo Registro</h2>
          <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg "
                placeholder="Nombre"
                name="nombre"
                value={nombre}
                onChange={e => onInputChange(e)}
              />
            </div>

            <div>
              <select onChange={(e) => onInputChange(e)}
                name="categoria"
                className="form-select form-select-lg mt-2"
                aria-label=".form-select-lg example"
                defaultValue={'DEFAULT'}>

                <option value="DEFAULT" disabled >Elige segun categoria</option>
                {categorias.map((cat) => (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <select name="tipo" defaultValue={'DEFAULT'}
                onChange={e => onInputChange(e)}
                className="form-select form-select-lg mt-2"
                aria-label=".form-select-lg example">
                <option value="DEFAULT" disabled>Elige una opcion</option>
                <option value="ingreso">Ingreso</option>
                <option value="egreso">Egreso</option>
              </select>

            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control form-control-lg mt-2"
                placeholder="Monto"
                name="monto"
                value={monto}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                className="form-control form-control-lg mt-2"
                placeholder="Fecha"
                name="fecha"
                value={fecha}
                onChange={e => onInputChange(e)}
              />
            </div>
            {
              error ? (
                <div className="p-3 mb-2 bg-danger text-white mt-2">
                  Llene todos los datos
                </div>
              ) : null
            }
          
              <button className="btn btn-secondary mt-4">Agregar</button>
           
            
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;






















// import React from 'react'
// import {useForm} from 'react-hook-form'

// const AddUserForm = (props) => {

//     const {register,errors,handleSubmit}=useForm();

//     const onSubmit=(data,e)=>{
//         console.log(data)
//         props.crear(data)
//         e.target.reset()
//     }

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <label>Name</label>
//             <input type="text" name="nombre" 
//                 ref={register({required: {value: true, 
//                                 message: 'Nombre requerido'}
//                 })}     
//             />
//              <span className="text-danger text-smal d-block mb-2">
//                  {errors.nombre && errors.nombre.message  }
//              </span>

//             <label>Monto</label>
//             <input type="number" name="monto"
//                     ref={register({required: {value: true, 
//                         message: 'Monto requerido'}
//                     })}  
//             />
//              <span className="text-danger text-smal d-block mb-2">
//                  {errors.name && errors.name.message  }
//              </span>

//             <label>Fecha</label>
//             <input type="date" name="fecha"
//                     ref={register({required: {value: true, 
//                         message: 'Fecha requerido'}
//                     })}  
//             />
//             <span className="text-danger text-smal d-block mb-2">
//                  {errors.name && errors.name.message  }
//              </span>

//             <label>Tipo</label>
//             <input type="text" name="tipo"
//                     ref={register({required: {value: true, 
//                         message: 'Tipo requerido'}
//                     })}  
//             />
//              <span className="text-danger text-smal d-block mb-2">
//                  {errors.name && errors.name.message  }
//              </span>

//             <label>Categoria</label>
//             <input type="text" name="categoria"
//                     ref={register({required: {value: true, 
//                         message: 'Categoria requerido'}
//                     })}  
//             />
//              <span className="text-danger text-smal d-block mb-2">
//                  {errors.name && errors.name.message  }
//              </span>

//             <button>Add new user</button>
//         </form>
//     )
// }

// export default AddUserForm
