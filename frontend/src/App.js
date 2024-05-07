import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Employees from './components/Employees';
import Login from './components/Login';
import Nav from './components/Nav';
import Register from './components/Register';
import Services from './components/Services';
import axios from 'axios';
import { useUser } from "./context/UserContext";
axios.defaults.baseURL = 'http://localhost:4000/api';

function App() {
  const { user } = useUser();
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const Public = ({ children }) => {
    return !user.login ? children : <Navigate to="/employees" />;
  };

  const Private = ({ children }) => {
    return user.login ? children : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route
          path='/'
          element={
            <Public>
              <Login />
            </Public>
          }
        />
        <Route
          path='/employees'
          element={
            <Private>
              <Employees />
            </Private>
          }
        />
        <Route
          path='/register'
          element={
            <Public>
              <Register />
            </Public>
          }
        />
        <Route
          path='/services'
          element={
            <Private>
              <Services />
              {console.log("Hola")}
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
