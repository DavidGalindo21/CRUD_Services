import { Modal } from 'react-responsive-modal';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';

const ModalActionService = ({ open, onCloseModal, getServices, edit, service }) => {

    const initialState = {
        folio: "",
        IdEmpleado: "",
        fecha: "",
        nombre: "",
        telefono: "",
        correo: "",
        genero: "",
        edad: "",
        automovil: "",
        servicios: "",
        monto: "",
        anticipo: "",
        pago: "",
        saldo: ""
    };

    const [dataService, setDataService] = useState(initialState);

    useEffect(() => {
        edit ? setDataService(service) : setDataService(initialState);
        //eslint-disable-next-line
    }, [edit, service]);

    const handleChange = (e) => {
        setDataService({ ...dataService, [e.target.name]: e.target.value });
    };

    const actions = async (e) => {
        try {
            e.preventDefault();
            let resp = {};
            edit ? (resp = await axios.put(`/servicio/update/${service._id}`, dataService))
                : (resp = await axios.post("/servicio", dataService));
            Swal.fire({
                icon: 'success',
                title: resp.data.data.message,
                showConfirmButton: false,
                timer: 1500
            });
            onCloseModal();
            getServices();
        } catch (error) {
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            console.log('error en la función actions', error.message);
        }
    }

    return (
        <div>
            <Modal open={open} onClose={onCloseModal} center>
                <div className='card'>
                    <div className='card-header'>
                        <h5>{edit ? 'Update servicio' : 'Add Servicio'}</h5>
                    </div>{/*card-header*/}
                    <div className='card-body'>
                        <form onSubmit={actions}>

                            <div className="mb-3">
                                <label className="form-label">Folio:</label>
                                <input type="text" className='form-control' name="folio" required
                                    onChange={(e) => handleChange(e)}
                                    value={dataService.folio} />
                            </div>{ }

                            {
                                edit ?
                                    null:
                                    <div className="mb-3">
                                        <label className="form-label">Id Usuario:</label>
                                        <input type="text" className='form-control' name="IdEmpleado" required
                                            onChange={(e) => handleChange(e)}
                                            value={dataService.IdEmpleado} />
                                    </div>
                            }

                            <div className="mb-3">
                                <label className="form-label">Nombre:</label>
                                <input type="text" className='form-control' name="nombre" required
                                    onChange={(e) => handleChange(e)}
                                    value={dataService.nombre} />
                            </div>{ }

                            <div className='mb-3'>
                                <label className='form-label'>Fecha:</label>
                                <input type="date" className='form-control'
                                    name="fecha" required
                                    onChange={(e) => handleChange(e)}
                                    value={dataService.fecha}
                                />
                            </div>{/*mb-3*/}



                            <div className='mb-3'>
                                <label className='form-label'>Teléfono:</label>
                                <input type="text" className='form-control'
                                    name="telefono" required
                                    onChange={(e) => handleChange(e)}
                                    value={dataService.telefono}
                                />
                            </div>{/*mb-3*/}

                            <div className='mb-3'>
                                <label className='form-label'>Correo:</label>
                                <input type="email" className='form-control'
                                    name="correo" required
                                    onChange={(e) => handleChange(e)}
                                    value={dataService.correo}
                                />
                            </div>{/*mb-3*/}

                            <div className='mb-3'>
                                <label className='form-label'>Genero:</label>
                                <input type="text" className='form-control'
                                    name="genero" required
                                    onChange={(e) => handleChange(e)}
                                    value={dataService.genero}
                                />
                            </div>{/*mb-3*/}

                            <div className='mb-3'>
                                <label className='form-label'>Edad:</label>
                                <input type="number" className='form-control'
                                    name="edad" required
                                    onChange={(e) => handleChange(e)}
                                    value={dataService.edad}
                                />
                            </div>{/*mb-3*/}

                            <div className='mb-3'>
                                <label className='form-label'>Automovil:</label>
                                <input type="text" className='form-control'
                                    name="automovil" required
                                    onChange={(e) => handleChange(e)}
                                    value={dataService.automovil}
                                />
                            </div>{/*mb-3*/}

                            <div className='mb-3'>
                                <label className='form-label'>Servicios:</label>
                                <input type="text" className='form-control'
                                    name="servicios" required
                                    onChange={(e) => handleChange(e)}
                                    value={dataService.servicios}
                                />
                            </div>{/*mb-3*/}

                            <div className='mb-3'>
                                <label className='form-label'>Monto:</label>
                                <input type="text" className='form-control'
                                    name="monto" required
                                    onChange={(e) => handleChange(e)}
                                    value={dataService.monto}
                                />
                            </div>{/*mb-3*/}

                            <div className='mb-3'>
                                <label className='form-label'>Anticipo:</label>
                                <input type="text" className='form-control'
                                    name="anticipo" required
                                    onChange={(e) => handleChange(e)}
                                    value={dataService.anticipo}
                                />
                            </div>{/*mb-3*/}

                            <div className='mb-3'>
                                <label className='form-label'>Pago:</label>
                                <input type="text" className='form-control'
                                    name="pago" required
                                    onChange={(e) => handleChange(e)}
                                    value={dataService.pago}
                                />
                            </div>{/*mb-3*/}



                            <div className='mb-3'>
                                <button type="submit" className='btn btn-primary form-control'>
                                    {edit ? 'Actualizar' : 'Guardar'}
                                </button>
                            </div>{/*mb-3*/}
                        </form>
                    </div>{/*card-body */}
                </div>{/*card*/}
            </Modal>
        </div>
    )
}

export default ModalActionService