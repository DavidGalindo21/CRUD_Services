// Forma antigua de importar paquetes
//var express = require('express');

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import connectDB from './database.js'

connectDB()

// importamos nuestra ruta de usuarios
import userRoute from './routes/usuario.route.js'
import empleadoRoute from './routes/empleado.route.js'
import servicioRoute from './routes/servicio.route.js'

// Asignar a una variable el funcionamiento de express.
const app = express()

// Crear el puerto por el que va a escuchar nuestro servidor local
app.set('Port', 4000)

// Asignar a morgan como dependencia de desarrollo para poder ver las peticiones en la consola
app.use(morgan('dev'))

// Establecer la respuesta del servidor en formato tipo JSON
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// Para poder recibir peticiones de diferentes fuentes.
app.use(cors({origin:'*'}))

// por medio de esta ruta /api podemos acceder a realizar un registro o al metodo del registro
app.use('/api', userRoute)
app.use('/api/employee', empleadoRoute)
app.use('/api/servicio', servicioRoute)

// Funcion para correr el servidor
app.listen(app.get('Port'),() => {
    console.log('Servidor escuchando por el puerto',app.get('Port'))
});