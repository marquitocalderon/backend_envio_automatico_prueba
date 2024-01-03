const express = require("express");
const cors = require("cors");
const { conectarBaseDeDatos, conectar } = require("./conexion");
const cron = require('node-cron');
const { config } = require('dotenv');

const app = express();

// Aplicar el middleware cors a todas las rutas
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
conectarBaseDeDatos();

config();

app.get('/', (req, res) => {
    res.send("ya esta funcionando");
});

const fetchDataAndSend = async () => {
    try {
        const nombre = "enviando desde el servidor de nodejs desde el servidor";
        const hora = "enviando cada 20 segundos";

        // Insertar datos en la tabla 'tablaprueba'
        const result = await conectar.query('INSERT INTO tablaprueba (nombre, hora) VALUES ($1, $2) RETURNING hora', [nombre, hora]);
        const horario_enviado = result.rows[0].hora;

        console.log("Datos recibidos y registrados en la base de datos en la hora de abajo", horario_enviado);
    } catch (error) {
        console.error("Error al intentar registrar datos:", error);
    }
};

// Ejecutar fetchDataAndSend cada 20 segundos usando node-cron
cron.schedule('*/20 * * * * *', fetchDataAndSend);

const puerto = process.env.PUERTO || 3000;
app.listen(puerto, () => {
    console.log(`El servidor está corriendo en el puerto ${puerto}`);
});
