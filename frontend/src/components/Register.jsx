import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  //viene del react-router-dom
  const navigate = useNavigate();
  const { registerUser } = useUser();
  const [dataUser, setDataUser] = useState({
    correo: '',
    password: '', nombre: '', nivel: ''
  });

  //creamos una función llamada login para evitar que con la acción del botón submit
  //el navegador actualice la página.

  const register = (e) => {
    e.preventDefault();
    registerUser(dataUser, navigate);
  }

  const handleChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <div className='card'>
            <div className='container text-center'>
              <i className='fas fa-user-plus fa-5x'></i>
            </div>
            <div className='card-header text-center mt-3'>
              <h4>Crear registro del jefe!!!</h4>
            </div>{/* card-header text-center mt-3 */}
            <div className='card-body'>
              <form onSubmit={register}>
                <div className='mb-3'>
                  <label className='form-label'>Nombre:</label>
                  <input type="text" name="nombre" className='form-control'
                    onChange={(e) => handleChange(e)} autoFocus required />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Correo:</label>
                  <input type="email" name="correo" className='form-control'
                    onChange={(e) => handleChange(e)} required />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Nivel:</label>
                  <input type="text" name="nivel" className='form-control'
                    onChange={(e) => handleChange(e)} required />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Contraseña:</label>
                  <input type="password" name="password" className='form-control'
                    onChange={(e) => handleChange(e)} required />
                </div>{/* mb-3 */}
                <button type="submit" className='form-control btn btn-primary'>
                  Login
                </button>
              </form>
            </div>{/* card-body */}
          </div>{/* card */}
        </div>{/* col-md-6 mx-auto */}
      </div>{/* row */}
    </div>//container mt-4
  )
}

export default Register