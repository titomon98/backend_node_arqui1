'use strict'
const Sequelize = require('sequelize');
const db = require("../models");
const Compra = db.compras;
const Producto = db.productos;
const DetalleCompra = db.detallecompras;
const moment = require('moment');

module.exports = {
  find(req, res) { //Busca todas las ventas
    return Compra.findAll()
      .then(cuenta => res.status(200).send(cuenta))
      .catch(error => res.status(400).send(error))
  },

  findById(req, res) { //Busca las Compras por id
    let id = req.body.id
    return Compra.findByPk(id)
      .then(cuenta => res.status(200).send(cuenta))
      .catch(error => res.status(400).send(error))
  },

  findDetalle(req, res) { //Busca todos los detalles de Compra
    return DetalleCompra.findAll()
      .then(cuenta => res.status(200).send(cuenta))
      .catch(error => res.status(400).send(error))
  },

  findByIdDetalle(req, res) { //Busca todos los detalles de Compra por id
    let id = req.body.id
    return DetalleCompra.findByPk(id)
      .then(cuenta => res.status(200).send(cuenta))
      .catch(error => res.status(400).send(error))
  },

  findCompra(req, res) {
    let id = req.body.id
    return DetalleCompra.findByPk(id, {
      attributes: ['id', 'createdAt', 'iva', 'total'],
      include: [
        {
          model: Compra,
          attributes: ['cantidad'],
          include: [{
            model: Producto,
            attributes: ['nombre', 'costo', 'precio_venta'],
          },]
        },],
    })
      .then(cuenta => res.status(200).send(cuenta))
      .catch(error => res.status(400).send(error))
  },

  createCompra(req, res) {
    //Crear
    //extraer datos de req.body
    let datos = req.body //Serializar los datos
    Producto.findByPk(datos.id_producto)
      .then(producto => {
        if (!producto) {
          return res.status(404).json({ error: 'Producto no encontrado. Ingrese un producto valido' }); //Si el id del producto no existe
        }

        const datos_ingreso = { //Objeto
          id_producto: datos.id_producto,
          cantidad: datos.cantidad,
          estado: 1,
        };

        Compra.create(datos_ingreso)
          .then(Compra => {
            //res.send(Compra)

            const ingreso = producto.cantidad + datos.cantidad;

            producto.update({ cantidad: ingreso }
            )
              .then(existencia => {
                res.send(existencia);
              })
              .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al actualizar' });
              });
          })
          .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
          });
      })
      .catch(error => {
        console.log(error)
        return res.status(500).json({ error: 'Error al insertar' });
      });
  },

  createDetalleCompra(req, res) {
    //Crear
    //extraer datos de req.body
    let datos = req.body //Serializar los datos
    Compra.findByPk(datos.id_compra)
      .then(compra => {
        if (!compra) {
          return res.status(404).json({ error: 'Compra no encontrada' });
        }

        Producto.findByPk(compra.id_producto)
          .then(producto => {
            if (!producto) {
              return res.status(404).json({ error: 'Producto no encontrado' });
            }

            const total = producto.precio_venta * compra.cantidad;
            const iva = total * 0.12;

            const datos_Compra = { //Objeto
              id_compra: datos.id_compra,
              total: total,
              iva: iva,
              estado: 1,
            };

            DetalleCompra.create(datos_Compra)
              .then(detallecompras => {
                res.send(detallecompras);
              })
              .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al insertar' });
              });
          })
      })
  },

  /*async delete (req, res) {
    //Eliminar
    console.log(req.params.id)
    let id = req.params.id; //Serializamos el id
    try {
      //Busqueda de un objeto especifico por id
      const editorial = await Editorial.findByPk(id);
      //evaluamos si el objeto trajo algo
      if (!editorial) {
        return res.status(404).json({ error: 'Editorial no encontrada' });
      }
      //Si pasa este punto
      await editorial.destroy(); 
      return res.json({ message: 'Editorial eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar editorial:', error);
      return res.status(500).json({ error: 'Error al eliminar editorial' });
    }
  },*/
};

