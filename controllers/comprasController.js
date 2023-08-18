"use strict";
const db = require("../models");
const Productos = db.productos;
const Compras = db.compras;
const DetalleCompras = db.detalle_compras;

module.exports = {
  find(req, res) {
    return Compras.findAll({
      include: [
        {
          model: DetalleCompras,
          attributes: [
            "idProducto",
            "cantidad",
            "precioPorUnidad",
            "precioTotal",
          ],
          include: {
            model: Productos,
            attributes: [
              "nombre",
              "fabricante",
              "cantidad",
              "precioVenta",
              "categoria",
            ],
          },
        },
      ],
    })
      .then((cuenta) => res.status(200).send(cuenta))
      .catch((error) => res.status(400).send(error));
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

  async generarCompra(req, res) {
    const proveedor = req.body.proveedor;
    const productos = req.body.productos;

    let total = 0;
    let ivaAplicado = 0;

    for (const productoCompra of productos) {
      const producto = await Productos.findByPk(productoCompra.id);
      if (!producto) {
        return res.status(404).send({
          message: "Producto no encontrado",
        });
      }

      productoCompra.precioTotal =
        Number(productoCompra.precioPorUnidad) *
        Number(productoCompra.cantidad);
      total += Number(productoCompra.precioTotal);
      await Productos.update(
        {
          cantidad: producto.cantidad + productoCompra.cantidad,
        },
        {
          where: {
            id: productoCompra.id,
          },
        }
      );
    }

    ivaAplicado = total * 0.12;
    total += ivaAplicado;

    const compra = await Compras.create({
      proveedor: proveedor,
      total: total,
      ivaAplicado: ivaAplicado,
    });

    for (const productoCompra of productos) {
      await DetalleCompras.create({
        idCompra: compra.id,
        idProducto: productoCompra.id,
        cantidad: productoCompra.cantidad,
        precioPorUnidad: productoCompra.precioPorUnidad,
        precioTotal: productoCompra.precioTotal,
      });
    }

    return res.status(200).send(compra);
  },
};
