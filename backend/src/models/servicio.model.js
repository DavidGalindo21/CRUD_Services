import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const servicioSchema = new Schema({
    folio: {
        type: String
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    nombre: {
        type: String
    },
    telefono: {
        type: String
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    genero: {
        type: String
    },
    edad: {
        type: Number,
        required: true
    },
    IdEmpleado: {
        type: Schema.ObjectId,
        ref: 'usuario'
    },
    automovil: {
        type: String
    },
    servicios: {
        type: String
    },
    monto: {
        type: Number,
        required: true
    },
    anticipo: {
        type: Number,
        required: true
    },
    pago: {
        type: Number,
        required: true
    },
    saldo: {
        type: Number,
    }
},
    {
        timestamps: true
    }
);
// Exportamos el modelo para ser usado en otros archivos
export const ServicioModel = model('servicio', servicioSchema);