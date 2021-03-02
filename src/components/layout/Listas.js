import React from 'react'
import { Link } from "react-router-dom";
import moment from 'moment'
const Listas = (props) => {

    const { mostrar, users, deleteId, filtro ,eleccion,categorias} = props

    return (


        <div className="container">

            <div className="btn-group">
                <button onClick={(e) => eleccion(e)} value="todos" className="btn btn-success">Todos</button>
            </div>
            <div className="btn-group mx-4">
                <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Tipo
                    </button>
                <ul className="dropdown-menu dropdown-menu-end" >
                    <li><button onClick={(e) => eleccion(e)} className="dropdown-item" value="tipo" name="ingreso" type="button">Ingreso</button></li>
                    <li><button onClick={(e) => eleccion(e)} className="dropdown-item" value="tipo" name="egreso" type="button">Egreso</button></li>
                </ul>
            </div>

            <div className="btn-group">
                <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Categoria
                    </button>
                <ul className="dropdown-menu">
                    {categorias.map(cat => (
                        <li key={cat} ><button onClick={(e) => eleccion(e)} className="dropdown-item" value="categoria" name={cat} type="button">{cat}</button></li>
                    ))}
                </ul>
            </div>
            {
                mostrar ? (
                    <div class="table-responsive">
                    <table className="table border shadow mt-4">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Concepto</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Monto</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Categoria</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.nombre}</td>
                                    <td>{moment(user.fecha).utc().format('MM/DD/YYYY')}</td>
                                    <td>{user.monto}</td>
                                    <td>{user.tipo}</td>
                                    <td>{user.categoria}</td>
                                    <td className="d-flex justify-content-evenly" >
                                        <Link
                                            className="btn  btn-primary "
                                            to={`/users/edit/${user._id}`}
                                        >Edit</Link>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteId(user._id)}
                                        > Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>

                ) : (
                    <div class="table-responsive">
                        <table className="table border shadow mt-4">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Concepto</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Monto</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Categoria</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtro.map((f, index) => (
                                    <tr key={f._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{f.nombre}</td>
                                        <td>{moment(f.fecha).utc().format('MM/DD/YYYY')}</td>
                                        <td>{f.monto}</td>
                                        <td>{f.tipo}</td>
                                        <td>{f.categoria}</td>
                                        <td className="d-flex justify-content-evenly" >
                                            <Link
                                                className="btn  btn-primary "
                                                to={`/users/edit/${f._id}`}
                                            >Edit</Link>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteId(f._id)}
                                            > Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    )}


        </div>
    )
}

export default Listas
