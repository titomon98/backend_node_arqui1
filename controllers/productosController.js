"use strict";
const db = require("../models");
const Productos = db.productos;

module.exports = {
  find(req, res) {
    return Productos.findAll() //Le hacemos una consulta al modelo
      .then((cuenta) => res.status(200).send(cuenta)) //Devolvemos los datos
      .catch((error) => res.status(400).send(error)); //Enviamos un mensaje de error por si acaso
  },

  findById(req, res) {
    return Productos.findByPk(req.params.id)
      .then((producto) => {
        if (!producto) {
          return res.status(404).send({
            message: "Producto no encontrado",
          });
        }
        return res.status(200).send(producto);
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    const data = req.body;

    return Productos.create({
      nombre: data.nombre,
      fabricante: data.fabricante,
      cantidad: data.cantidad,
      precioVenta: data.precioVenta,
      categoria: data.categoria,
    })
      .then((producto) => res.status(201).send(producto))
      .catch((error) => res.status(400).send(error));
  },

  async update(req, res) {
    const data = req.body;

    const producto = await Productos.findByPk(data.id);
    if (!producto) {
      return res.status(404).send({
        message: "Producto no encontrado",
      });
    }

    return Productos.update(
      {
        nombre: data.nombre,
        fabricante: data.fabricante,
        cantidad: data.cantidad,
        precioVenta: data.precioVenta,
        categoria: data.categoria,
      },
      {
        where: {
          id: data.id,
        },
      }
    )
      .then((producto) => res.status(201).send("Se ha actualizado el producto"))
      .catch((error) => res.status(400).send(error));
  },

  async delete(req, res) {
    const id = req.params.id;

    const producto = await Productos.findByPk(id);
    if (!producto) {
      return res.status(404).send({
        message: "Producto no encontrado",
      });
    }

    await producto.destroy();
    res.status(200).send({ message: "Producto eliminado" });
  },
};
