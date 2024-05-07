import axios from "axios";
import React, { useState, useEffect, useCallback  } from 'react';
import { useUser } from "../context/UserContext";
import Swal from "sweetalert2";
import ModalActionsServices from './ModalActionService';

const Services = () => {
  const { user } = useUser();
  const [servicios, setServicios] = useState([]);

  const getServices= useCallback (async()=>{
    try {
      const { data } = await axios.get("/servicio/listAllServices");
        //console.log(data);
        setServicios(data.data);
    } catch (error) {
      if(!error.response.data.ok){
        return Swal.fire({
           icon: 'error',
           title: error.response.data.message,
           showConfirmButton: false,
           timer: 1500
         });
       }
       console.log('error en la función getServices ',error.message);
    }
  },[]);

  useEffect(() => {
    getServices();
  }, [getServices]);

  const deleteServices = async (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción no es reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete("/servicio/delete/" + id);
        getServices();
        Swal.fire({
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  //manejar modal
  const [service,setService] = useState(false);
  const [edit,setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpenModal = (edit,service) => {
    setOpen(true);
    setEdit(edit);
    setService(service);
  }

  const onCloseModal = () => setOpen(false);

  //busqueda
  //método de búsqueda desde el backend
  
  const search = async (value) => {
    try {
      console.log(value);
         if (value === "") {
           return getServices();
         }
         const { data } = await axios.get(`/servicio/search/${value}`);
         setServicios(data.data);
       } catch (error) {
         console.log("error en search", error.message);
       }
  };
  
  return (
    <div>
      <nav className='navbar py-4'>
        <div className='container'>
          <div className='col-md-3'>
            <button className='btn btn-primary' 
              onClick={()=>onOpenModal(false,{})}>
              <i className='fas fa-plus'></i> Add Service
            </button>
          </div>{/*col-md-3*/}
          <div className='col-md-6 ml-auto'>
            <div className='input-group'>
              <input
                className='form-control'
                type="search"
                placeholder='Buscar...'
                aria-label="Search"
                required
                onChange={(e)=>search(e.target.value)}
              />
            </div>{/*input-group*/}
          </div>{/*col-md-6 ml-auto*/}
        </div>{/*container*/}
      </nav>
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header'>
                  <h4>Empleados de {user.name}</h4>
                </div>
                <div className='table-responsive'>
                  <table className='table table-striped'>
                    <thead className='table-dark'>
                      <tr>
                        <th>#</th>
                        <th>Folio</th>
                        <th>Fecha</th>
                        <th>NombreCliente</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Genero</th>
                        <th>Edad</th>
                        <th>Automovil</th>
                        <th>Servicios</th>
                        <th>Monto</th>
                        <th>Anticipo</th>
                        <th>Pago</th>
                        <th>Saldo</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                      <tbody>
                        {
                          servicios.map((item,i)=>(
                            <tr key={item._id}>
                              <td>{i+1}</td>
                              <td>{item.folio}</td>
                              <td>{item.fecha}</td>
                              <td>{item.nombre}</td>
                              <td>{item.telefono}</td>
                              <td>{item.correo}</td>
                              <td>{item.genero}</td>
                              <td>{item.edad}</td>
                              <td>{item.automovil}</td>
                              <td>{item.servicios}</td>
                              <td>{item.monto}</td>
                              <td>{item.anticipo}</td>
                              <td>{item.pago}</td>
                              <td>{parseInt(item.monto - (item.anticipo + item.pago))}</td>
                              <td>
                                <button className='btn btn-danger me-1'
                                  onClick={()=>deleteServices(item._id)}>
                                  <i className='fas fa-trash'></i>
                                </button>
                                <button className='btn btn-warning'
                                  onClick={()=>onOpenModal(true,item)}>
                                  <i className='fas fa-edit'></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                  </table>
                </div>{/*table-responsive-lg*/}
              </div>{/*card*/}
            </div>{/*col-md-12*/}
          </div>{/*row*/}
        </div> {/*container*/}
      </section>
      <ModalActionsServices
        open={open} 
        onCloseModal={onCloseModal}
        getServices={getServices}
        edit={edit}
        service={service}
      />
    </div>
  );
}

export default Services