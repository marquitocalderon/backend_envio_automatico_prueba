const express = require("express");
const cors = require("cors");
const { conectarBaseDeDatos , conectar } = require("./conexion");

const { config } = require('dotenv');

const app = express();


// Aplicar el middleware cors a todas las rutas
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
conectarBaseDeDatos();




config()


app.get('/', (req, res) => {
    res.send("ya esta funcionando")
})

app.post('/enviar', async (req, res) => {
    try {
      const { nombre, hora } = req.body;
  
      // Insertar datos en la tabla 'tablaprueba'
      const result = await conectar.query('INSERT INTO tablaprueba (nombre, hora) VALUES ($1, $2) RETURNING hora', [nombre, hora]);
      const horario_enviado = result.rows[0].hora;
  
      res.status(200).send({ mensaje: "Datos recibidos y registrados en la base de datos en la hora de abajo", horario_enviado });
    } catch (error) {
      console.error("Error al intentar registrar datos:", error);
      res.status(500).send("Error interno del servidor");
    }
  });
  




app.listen(process.env.PUERTO, () => {
  console.log(`El servidor esta corriendo en el puerto = ${process.env.PUERTO}`);
});