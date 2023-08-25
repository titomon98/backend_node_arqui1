"use strict";
const db = require("../models");
const Productos = db.productos;
const Clientes = db.clientes;
const TiposCliente = db.tipos_clientes;
const Facturas = db.facturas;
const DetalleFacturas = db.detalle_facturas;

module.exports = {
  find(req, res) {
    return Facturas.findAll({
      include: [
        {
          model: Clientes,
          attributes: [
            "nit",
            "nombre",
            "apellido",
            "fechaNacimiento",
            "correo",
            "telefono",
            "direccion",
          ],
        },
        {
          model: DetalleFacturas,
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

  create(req, res) {
    const data = req.body;

    return Facturas.create({
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

    const factura = await Facturas.findByPk(id);
    if (!factura) {
      return res.status(404).send({
        message: "Factura no encontrada",
      });
    }

    const detalleFacturas = await DetalleFacturas.findAll({
      where: { idFactura: factura.id },
    });

    for (const detalleFactura of detalleFacturas) {
      const producto = await Productos.findByPk(detalleFactura.idProducto);
      if (!producto) {
        return res.status(404).send({
          message: "Producto no encontrado",
        });
      }
      await Productos.update(
        {
          cantidad: producto.cantidad + detalleFactura.cantidad,
        },
        {
          where: {
            id: detalleFactura.idProducto,
          },
        }
      );
    }

    await factura.destroy();
    res.status(200).send({ message: "Venta eliminada" });
  },

  async generarFactura(req, res) {
    const nitCliente = req.body.nit;
    const productos = req.body.productos;

    let total = 0;
    let descuentoAplicado = 0;
    let descuentoCliente = 0;
    let ivaAplicado = 0;

    const cliente = await Clientes.findByPk(nitCliente);
    if (!cliente) {
      return res.status(404).send({
        message: "Cliente no encontrado",
      });
    }

    for (const productoVenta of productos) {
      const producto = await Productos.findByPk(productoVenta.id);
      if (!producto) {
        return res.status(404).send({
          message: "Producto no encontrado",
        });
      }
      if (producto.cantidad <= 0) {
        return res.status(404).send({
          message: "Producto no disponible",
        });
      }

      productoVenta.precioPorUnidad = producto.precioVenta;
      productoVenta.precioTotal =
        Number(producto.precioVenta) * Number(productoVenta.cantidad);
      total += productoVenta.precioTotal;
      await Productos.update(
        {
          cantidad: producto.cantidad - productoVenta.cantidad,
        },
        {
          where: {
            id: productoVenta.id,
          },
        }
      );
    }

    ivaAplicado = total * 0.12;
    total += ivaAplicado;

    const tipoCliente = await TiposCliente.findByPk(cliente.idTipoCliente);
    if (tipoCliente.descuento > 0) {
      descuentoCliente = tipoCliente.descuento;
      descuentoAplicado = total * descuentoCliente;
    }
    total -= descuentoAplicado;

    const factura = await Facturas.create({
      nitCliente: nitCliente,
      total: total,
      descuentoAplicado: descuentoAplicado,
      ivaAplicado: ivaAplicado,
    });

    for (const productoVenta of productos) {
      await DetalleFacturas.create({
        idFactura: factura.id,
        idProducto: productoVenta.id,
        cantidad: productoVenta.cantidad,
        precioPorUnidad: productoVenta.precioPorUnidad,
        precioTotal: productoVenta.precioTotal,
      });
    }

    return res.status(200).send(factura);
  },
};
