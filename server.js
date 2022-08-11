const express = require('express');
const productos = require('./modulos/productos');

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP corriendo en el puerto: ${server.address().port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productos);


app.use('/static', express.static(__dirname + '/public'))

server.on('error', (error) => console.log(`Error en el servidor: ${error}`));