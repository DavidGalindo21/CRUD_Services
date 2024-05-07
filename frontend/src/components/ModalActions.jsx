import { Modal } from 'react-responsive-modal';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';

const ModalActions = ({ open, onCloseModal, getEmployees, edit, employee }) => {

  const initialState = {
    nombres: "",
    apellidos: "",
    id: "",
    tcontrato: "Fijo",
  };

  const [dataEmployee, setDataEmployee] = useState(initialState);
  const tcontratos = ["Fijo", "Temporal", "Practicante"];

  useEffect(() => {
    edit ? setDataEmployee(employee) : setDataEmployee(initialState);
    //eslint-disable-next-line
  }, [edit, employee]);

  const handleChange = (e) => {
    setDataEmployee({ ...dataEmployee, [e.target.name]: e.target.value });
  };

  const actions = async (e) => {
    try {
      e.preventDefault();
      let resp = {};
      edit ? (resp = await axios.put(`/employee/update/${employee._id}`, dataEmployee))
        : (resp = await axios.post("/employee", dataEmployee));
      Swal.fire({
        icon: 'success',
        title: resp.data.data.message,
        showConfirmButton: false,
        timer: 1500
      });
      onCloseModal();
      getEmployees();
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
            <h5>{edit ? 'Update empleado' : 'Add Empleado'}</h5>
          </div>{/*card-header*/}
          <div className='card-body'>
            <form onSubmit={actions}>
              <div className='mb-3'>
                <label className='form-label'>Nombres:</label>
                <input type="text" className='form-control'
                  name="nombres" required autoFocus
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.nombres}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Apellidos:</label>
                <input type="text" className='form-control' name="apellidos"
                  required onChange={(e) => handleChange(e)}
                  value={dataEmployee.apellidos}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Identificación:</label>
                <input type="text" className='form-control'
                  name="id" required onChange={(e) => handleChange(e)}
                  value={dataEmployee.id}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Tipo de contrato:</label>
                <select name="tcontrato" className='form-select'
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.tcontrato} >
                  {
                    tcontratos.map((item) => (
                      <option key={item}>{item}</option>
                    ))
                  }
                </select>
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

export default ModalActions