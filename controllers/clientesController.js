"use strict";
const db = require("../models");
const Clientes = db.clientes;
const TiposCliente = db.tipos_clientes;

const tiposClienteController = require("./tiposClienteController");

async function clienteExiste(nit) {
  const cliente = await Clientes.findByPk(nit);
  return !!cliente;
}

async function obtenerIdTipoCliente(tipoCliente) {
  const { id } = await tiposClienteController.findByName(tipoCliente);
  return id;
}

module.exports = {
  find(req, res) {
    return Clientes.findAll() //Le hacemos una consulta al modelo
      .then((cuenta) => res.status(200).send(cuenta)) //Devolvemos los datos
      .catch((error) => res.status(400).send(error)); //Enviamos un mensaje de error por si acaso
  },

  findById(req, res) {
    return Clientes.findOne({
      include: {
        model: TiposCliente,
        attributes: ["nombre", "descuento"],
      },
      where: {
        nit: req.params.id,
      },
    })
      .then((tipoClientes) => {
        if (!tipoClientes) {
          return res.status(404).send({
            message: "Cliente no encontrado",
          });
        }
        return res.status(200).send(tipoClientes);
      })
      .catch((error) => res.status(400).send(error));
  },

  async create(req, res) {
    const data = req.body;

    const idTipoCliente = await obtenerIdTipoCliente(data.tipoCliente);

    return Clientes.create({
      nit: data.nit,
      nombre: data.nombre,
      apellido: data.apellido,
      fechaNacimiento: data.fechaNacimiento,
      correo: data.correo,
      telefono: data.telefono,
      direccion: data.direccion,
      idTipoCliente: idTipoCliente,
    })
      .then((tipoClientes) => res.status(201).send(tipoClientes))
      .catch((error) => res.status(400).send(error));
  },

  async update(req, res) {
    const data = req.body;
    const exists = await clienteExiste(data.nit);

    if (!exists) {
      return res.status(404).send({
        message: "Cliente no encontrado",
      });
    }

    let idTipoCliente = null;
    if (data.tipoCliente != null)
      idTipoCliente = await obtenerIdTipoCliente(data.tipoCliente);

    return Clientes.update(
      {
        nombre: data.nombre,
        apellido: data.apellido,
        fechaNacimiento: data.fechaNacimiento,
        correo: data.correo,
        telefono: data.telefono,
        direccion: data.direccion,
        idTipoCliente: idTipoCliente,
      },
      {
        where: {
          nit: data.nit,
        },
      }
    )
      .then((tipoClientes) =>
        res.status(201).send("Se ha actualizado el cliente")
      )
      .catch((error) => res.status(400).send(error));
  },

  async delete(req, res) {
    const nit = req.params.id;

    const cliente = await Clientes.findByPk(nit);
    if (!cliente) {
      return res.status(404).send({
        message: "Cliente no encontrado",
      });
    }

    await cliente.destroy();
    res.status(200).send({ message: "Cliente eliminado" });
  },
};
