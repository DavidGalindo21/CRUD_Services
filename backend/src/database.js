import mongoose from 'mongoose'
const URLDatabase = "mongodb://localhost/prueba"

// Se crea la funcion de conexion 
// Nuestra funcion tiene que ser asincrona asi que se le agrega ---- async ---- a la funcion y ---- await ---- a la variable que creamos con la conexion
const connectDB = async () => {
    try {
        const db = await mongoose.connect(URLDatabase);
        console.log('Conexion exitosa a la base de datos: ', db.connection.name);
    } catch (error) {
        console.log("Error: ",error.message);
    }
}


// Exportamos la funcion para que otros archivos la puedan leer
export default connectDB;