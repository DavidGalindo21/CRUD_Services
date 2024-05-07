import axios from "axios";
import Swal from "sweetalert2";
import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();
const initialState = { login: false, token: '', name: '' };

export const UserProvider = (props) => {
  //se crea el estado del usuario.
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    const initial = JSON.parse(localStorage.getItem("user"));
    //console.log(initial);
    initial ? initial.login && setUser(initial) : setUser(initialState);
  }, []);

  //ahora se crea la función de logearse.
  //recibe la data del empleado y el navigate para poder
  //redirigirse a otras páginas.
  const loginUser = async (dataUser, navigate) => {
    try {
      //se hace la petición con el axios, se envía la url y la data
      //que contiene el password y el correo.
      const { data } = await axios.post('http://localhost:4000/api/login', dataUser);
      //console.log(data);
      if (data.ok) {
        //si se logeó correctamente se crea un objeto llamado userLogin
        //con login, token y name.
        const userLogin = {
          login: true,
          token: data.data.token,
          name: data.data.nombre
        };
        //guardamos el userLogin en local storage, como user, con formato json.
        localStorage.setItem("user", JSON.stringify(userLogin));
        //pasamos al estado setUser el userLogin
        setUser(userLogin);
        navigate('/employees');
        //mandamos el mensaje con sweet alert. En el title mandamos em msg que llega
        //del backend
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
      //si no es un error de backend sino de front end se muestra con
      // la siguiente línea.
      console.log('error en la función login ', error.message);
    }
  };

  const registerUser = async (dataUser, navigate) => {
    try {
      //se hace la petición con el axios, se envía la url y la data
      //que contiene el password y el correo.
      const { data } = await axios.post('http://localhost:4000/api/register', dataUser);
      //console.log(data);
      if (data.ok) {
        //si se logeó correctamente se crea un objeto llamado userLogin
        //con login, token y name.
        const userLogin = {
          login: true,
          token: data.data.token,
          name: data.data.nombre
        };
        //guardamos el userLogin en local storage, como user, con formato json.
        localStorage.setItem("user", JSON.stringify(userLogin));
        //pasamos al estado setUser el userLogin
        setUser(userLogin);
        navigate('/employees');
        //mandamos el mensaje con sweet alert. En el title mandamos em msg que llega
        //del backend
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
      //si no es un error de backend sino de frontend se muestra con
      // la siguiente línea.
      console.log('error en la función register ', error.message);
    }
  };


  const exit = () => {
    setUser(initialState);
    localStorage.removeItem("user");
  }

  //para poder probar la función loginUser, la vamos a exportar, para ello
  //creamos un objeto llamado value.
  const value = {
    loginUser,
    user,
    exit,
    registerUser
  };
  return <UserContext.Provider value={value} {...props} />
}

//Ahora exportamos una función llamada useUser, para a través de ella
//usar la función loginUser.
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser error');
  }
  return context;
}
