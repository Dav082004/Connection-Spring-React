import React, { useEffect } from "react";
import { useState } from "react";
import ClienteService from "../services/ClienteService";
import { Link } from "react-router-dom";

export const ListClientesComponent = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    ListClientesComponent();
  }, []);

  const ListClientesComponent = () => {
    ClienteService.getAllClientes()
      .then((response) => {
        setClientes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const deleteCliente = (clienteId) => {
    ClienteService.deleteCliente(clienteId)
      .then((response) => {
        ListClientesComponent();
      })
      .catch((error) => {
        console.error("Error deleting cliente:", error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Lista de empleados</h2>
      <Link to="/add-cliente" className="btn btn-primary mb-2">
        Agregar cliente
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.email}</td>
              <td>
                <Link
                  className="btn btn-info"
                  to={`/edit-cliente/${cliente.id}`}>
                  Actualizar
                </Link>
                <button
                  style={{ marginLeft: "10px" }}
                  className="btn btn-danger"
                  onClick={() => deleteCliente(cliente.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListClientesComponent;
