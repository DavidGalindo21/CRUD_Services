import { UserModel } from '../models/usuario.model.js';
import jsonwebtoken from 'jsonwebtoken';
import message from "../utils/messages.js";
const { messageGeneral } = message;
//todo lo que recibe el backend es a traves del request
//el next es para dar continuidad a la función
//el token se envía por las cabeceras o headers.
//en el caso de postman lo podemos enviar por Authorization o por los headers.
//creamos y exportamos la función verificarToken
export const verificarToken = (req, res, next) => {
  //si no envían los headers
  //el return es para que se salga de la función y no continúe.
  if (!req.headers.authorization) {
    return messageGeneral(
      res,
      401,
      false,
      null,
      "No se encontró headers de authorization",
    );
  }
  //la cabecera se envia con la palabra Bearer un espacio y el token.
  //el split es para obtener solo el token, ya que con el split queda un arreglo
  //["Bearer",token], solo queemos el token [1], la posición [0] es bearer
  const token = req.headers.authorization.split(" ")[1];
  //se verifica si el token es nulo
  if (!token) {
    return messageGeneral(
      res,
      401,
      false,
      null,
      "You are not authorized to access this resource 2"
    );
  }
  //se decodifica el token, verificando la palabra clave y el resultado se
  //devuelve como payload
  //la palabra secreta esta en el usuario.controller, usada para la ecriptación.
  jsonwebtoken.verify(token, "secreta", async (error, payload) => {
    //si error es true, si hay error
    if (error) {
      return messageGeneral(
        res,
        401,
        false,
        null,
        "Error en el token",
      );
    }
    //si error=false, se obtiene el id del payload y se busca en la BD.
    //el resultado se guarda en resp.
    const { _id } = payload;
    const resp = await UserModel.findById(_id);
    if (!resp) {
      return messageGeneral(
        res,
        401,
        false,
        null,
        "Error en el Id"
      );
    }
    //si llega hasta aquí, es que se auntenticó el usuario y 
    //obtenemos el userid para usarlo en los controladores
    req.userid = _id;
    //mandamos llamar a next para que contiúe con la función del controlador.
    next();
  });
};