"use strict";
const db = require("../models");
const TiposCliente = db.tipos_clientes;

module.exports = {
  find(req, res) {
    return TiposCliente.findAll() //Le hacemos una consulta al modelo
      .then((cuenta) => res.status(200).send(cuenta)) //Devolvemos los datos
      .catch((error) => res.status(400).send(error)); //Enviamos un mensaje de error por si acaso
  },

  findById(req, res) {
    return TiposCliente.findByPk(req.params.id)
      .then((tipoCliente) => {
        if (!tipoCliente) {
          return res.status(404).send({
            message: "Tipo de cliente no encontrado",
          });
        }
        return res.status(200).send(tipoCliente);
      })
      .catch((error) => res.status(400).send(error));
  },

  async findByName(req, res) {
    return TiposCliente.findOne({
      where: { nombre: req },
    });
  },
  create(req, res) {
    const { nombre, descuento } = req.body;

    return TiposCliente.create({
      nombre: nombre,
      descuento: descuento,
    })
      .then((tipoCliente) => res.status(201).send(tipoCliente))
      .catch((error) => res.status(400).send(error));
  },

  async update(req, res) {
    const { id, nombre, descuento } = req.body;

    const tipoCliente = await TiposCliente.findByPk(id);
    if (!tipoCliente) {
      return res.status(404).send({
        message: "Tipo de cliente no encontrado",
      });
    }

    return TiposCliente.update(
      {
        nombre: nombre,
        descuento: descuento,
      },
      {
        where: {
          id: id,
        },
      }
    )
      .then((tipoCliente) =>
        res.status(201).send("Se ha actualizado el tipo de cliente")
      )
      .catch((error) => res.status(400).send(error));
  },

  async delete(req, res) {
    const id = req.params.id;

    const tipoCliente = await TiposCliente.findByPk(id);
    if (!tipoCliente) {
      return res.status(404).send({
        message: "Tipo de cliente no encontrado",
      });
    }

    await tipoCliente.destroy();
    res.status(200).send({ message: "Tipo de cliente eliminado" });
  },
};
