import { Router } from 'express'
import empleadoCtrl from '../controllers/empleado.controller.js'
import { verificarToken } from '../middlewares/Auth.js'
const route = Router()


route.post('/', verificarToken, empleadoCtrl.createEmployee)

route.get('/', empleadoCtrl.listAllEmployees)

route.get('/listboss', verificarToken,empleadoCtrl.listEmployeeBoss)

route.get('/search/:nombres', verificarToken,empleadoCtrl.searchEmployee)

route.get('/listid/:id', verificarToken,empleadoCtrl.listById)

route.delete('/delete/:id', verificarToken,empleadoCtrl.deleteEmployee)

route.put('/update/:id', verificarToken,empleadoCtrl.updateEmployee)


export default route;