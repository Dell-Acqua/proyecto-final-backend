const express = require('express');
const { Router } = express;

const productos = [
  { title: 'Lechuga Hidroponica', price: 250, thumbnail: 'imgLechuga', id: 1 },
  { title: 'Rucula Hidroponica', price: 450, thumbnail: 'imgRucula', id: 2 },
  { title: 'Tomatitos Cherry', price: 300, thumbnail: 'imgTomatitos', id: 3 },
];

const router = Router();


class Productos {
  constructor(productos) {
    this.idNvo = productos.length;
    this.productos = productos;

    router.get('/', this.getAllProducts);
    router.post('/', this.setProduct);
    router.get('/:id', this.getProduct);
    router.put('/:id', this.updateProduct);
    router.delete('/:id', this.deleteProduct);
  }

  getAllProducts = (req, res) => {
    console.log('Get todos los productos OK');
    res.status(201).send(this.productos);
  };

  getProduct = (req, res) => {
    console.log('Get producto por ID OK');
    const { id } = req.params;
    if (id >= 1 && id <= this.productos.length) {
      res.status(201).send(this.productos[id - 1]);
    } else {
      res.status(400).send({ error: 'no se encontro el producto' });
    }
  };
  setProduct = (req, res) => {
    console.log('Post producto OK');
    const productoRecibido = req.body;
    this.idNvo++;

    const productoAGuardar = { ...productoRecibido, id: this.idNvo };
    this.productos.push(productoAGuardar);
    res.status(201).send(productoAGuardar);
  };

  updateProduct = (req, res) => {
    console.log('Put producto OK');
    const { id } = req.params;
    const productoRecibido = req.body;

    if (id >= 1 && id <= this.productos.length) {
      const productoAGuardar = { ...productoRecibido, id: parseInt(id) };
      productos.splice(id - 1, 1, productoAGuardar);
      res.status(201).send(productoAGuardar);
    } else {
      res.status(400).send({ error: 'No se encontro el producto' });
    }
  };

  deleteProduct = (req, res) => {
    console.log('Delete producto OK');
    const { id } = req.params;

    if (id >= 1 && id <= this.productos.length) {
      productos.splice(id - 1, 1, { error: 'El producto fue eliminado' });
      res.status(201).send({ message: 'Deleted producto OK' });
    } else {
      res.status(400).send({ error: 'No se encontro el producto' });
    }
  };
}

new Productos(productos);

module.exports = router;