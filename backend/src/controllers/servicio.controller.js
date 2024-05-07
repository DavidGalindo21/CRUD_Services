import { ServicioModel } from '../models/servicio.model.js'
import message from '../utils/messages.js'

const { messageGeneral } = message

const servicioCtrl = {}

servicioCtrl.createServicio = async (req, res) => {
    try {
        const data = req.body

        const resp = await ServicioModel.create(data)
        messageGeneral(res, 201, true, resp, "Servicio Creado!!!")
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message)
    }
}
servicioCtrl.listById = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await ServicioModel.findById(id);
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Servicio no encontrado");
        }
        messageGeneral(res, 200, true, resp, "");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};
servicioCtrl.deleteServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await ServicioModel.findById(id);
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Servicio no encontrado");
        }
        await resp.deleteOne();
        messageGeneral(res, 200, true, "", "Servicio eliminado!!!");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};
servicioCtrl.updateServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await ServicioModel.findById(id);
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Servicio no encontrado");
        }
        await resp.updateOne(req.body);
        messageGeneral(res, 200, true, "", "Servicio actualizado!!!");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};

servicioCtrl.listAllServices = async (req, res) => {
    try {
        // Se asume que el ID del empleado está en req.params.IdEmpleado

        // Para asegurarse de que estás obteniendo el ID correctamente
        const resp = await ServicioModel.find({ IdEmpleado: req.userid }).populate({
            path: "IdEmpleado",
            select: "-password"
        });
        console.log(req.userid)
        messageGeneral(res, 200, true, resp, "");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};

servicioCtrl.searchService = async (req, res) => {
    try {
        const { nombreServicio } = req.params;
        const resp = await ServicioModel.find({
            servicios: { $regex: ".*" + nombreServicio + ".*" },
            IdEmpleado: req.userid,
        });
        messageGeneral(res, 200, true, resp, "");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};
export default servicioCtrl