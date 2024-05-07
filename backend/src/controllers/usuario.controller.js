import { UserModel } from '../models/usuario.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import message from '../utils/messages.js'
const { messageGeneral } = message;
const userCtrl = {}

// Creamos un registro 
userCtrl.register = async (req, res) => {
    try {
        // si entra aqui, entonces si se puede realizar el registro 
        // por medio del body se mandan los datos
        const data = req.body;
        // comparamos si hay un correo en la tabla, no puede hacer el registro
        const respuesta = await UserModel.findOne({ correo: data.correo })
        // si el correo existe entonces se finaliza el registro y envia un mensaje
        if (respuesta) {
            return messageGeneral(res, 400, false, "", "El correo ya existe!!!")
        }

        // por medio de esta accion, podemos encriptar la contraseña 
        data.password = await bcrypt.hash(data.password, 10)
        // usamos nuestro modelo para hacer la creacion
        const newUser = await UserModel.create(data)

        // es para checar que el dato que ingresa es correcto por medio del _id
        const token = jwt.sign({ _id: newUser._id }, "secreta")

        // enviamos el mensaje si todo va correcto, de igual manera mandamos los datos que el usuario ingresa
        messageGeneral(res, 201, true, { ...newUser._doc, password: null, token }, "El usuario se creó correctamente")

    } catch (error) {
        // Si da error, mandará los parametros al otro archivo y cambiara los valores de los parametros
        messageGeneral(res, 500, false, "", error.message)
    }
}
userCtrl.login = async (req, res) => {
    try {
        const data = req.body;
        const resp = await UserModel.findOne({ correo: data.correo });
        if (!resp) {
            return messageGeneral(res, 400, false, "", "El correo no existe!!!");
        }
        const match = await bcrypt.compare(data.password, resp.password);
        if (match) {
            const token = jwt.sign({ _id: resp._id }, "secreta");
            return messageGeneral(res, 201, true, { ...resp._doc, password: null, token },
                "Bienvenido!!!");
        }
        messageGeneral(res, 400, false, "", "Contraseña incorrecta!!!")
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}
export default userCtrl;