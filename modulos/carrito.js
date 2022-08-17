const { Contenedor } = require('./handleFiles');
const express = require('express');
const { Router } = express;

const listCarrito = new Contenedor('../carrito.json');
const routerCart = Router();


routerCart.post('/', async (req, res) => {
  console.log('Post carrito recibido OK');
  try {
    const carritoACargar = req.body;
    const id = await listCarrito.save(carritoACargar);
    res.status(201).send(carritoACargar);
  } catch (e) {
    console.log(e);
  }
});


routerCart.delete('/:id', async (req, res) => {
  console.log('Delete carrito por Id recibido OK');
  try {
    const id = Number(req.params.id);
    let carrito = await listCarrito.getById(id);
    if (carrito) {
      const newCarrito = await listCarrito.deleteById(id);
      res.status(201).send(newCarrito);
    } else {
      res.status(400).send({ error: 'producto no encontrado' });
    }
  } catch (e) {
    console.log(e);
  }
});


routerCart.get('/:id/productos', async (req, res) => {
  console.log('Get list products by carrito Id recibido OK');
  try {
    const id = Number(req.params.id);
    let carrito = await listCarrito.getById(id);

    console.log(carrito);
    if (carrito) {
      res.status(201).send(carrito.productos);
    } else {
      res.status(400).send({ error: 'carrito no encontrado' });
    }
  } catch (e) {
    console.log(e);
  }
});


routerCart.post('/:id/productos', async (req, res) => {
  console.log('Post producto in Id carrito recibido OK');
  try {
    const id = Number(req.params.id);
    const productoAAgregar = req.body;
    let carrito = await listCarrito.getById(id);
    if (carrito) {
      const listProductos = { productos: [...carrito.productos, productoAAgregar] };
      const carritos = await listCarrito.updateById(id, listProductos);
      res.status(201).send(carritos);
    } else {
      res.status(400).send({ error: 'producto no encontrado' });
    }
  } catch (e) {
    console.log(e);
  }
});


routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
  console.log('Delete Id producto in Id carrito recibido OK');
  try {
    const id = Number(req.params.id);
    const id_prod = Number(req.params.id_prod);

    let carrito = await listCarrito.getById(id);
    if (carrito) {
      const listProductos = carrito.productos;
      const indexToDelete = listProductos.findIndex((producto) => producto.id == id_prod);
      if (indexToDelete != -1) {
        listProductos.splice(indexToDelete, 1);
        const newListProductos = { productos: listProductos };
        const carritos = await listCarrito.updateById(id, newListProductos);
        res.status(201).send(carritos);
      }
    } else {
      res.status(400).send({ error: 'producto no encontrado' });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = routerCart;