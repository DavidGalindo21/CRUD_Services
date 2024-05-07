import { Router } from 'express'
import servicioCtrl from '../controllers/servicio.controller.js'
import { verificarToken } from '../middlewares/Auth.js'
const route = Router()


route.post('/', verificarToken, servicioCtrl.createServicio)

route.get('/listid/:id', verificarToken, servicioCtrl.listById)

route.delete('/delete/:id', verificarToken, servicioCtrl.deleteServicio)

route.get('/search/:nombreServicio', verificarToken, servicioCtrl.searchService)

route.put('/update/:id', verificarToken, servicioCtrl.updateServicio)

route.get('/listAllServices', verificarToken, servicioCtrl.listAllServices)


export default route;