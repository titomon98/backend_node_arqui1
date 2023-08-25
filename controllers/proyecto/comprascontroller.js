'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Compras = db.compras;
const Proveedores = db.proveedores;
const DetalleCompra = db.detallescompras;
const Inventario = db.inventarios; 
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Compras.findAll(
          {
            include: {
              model: Proveedores,
              attributes: ['nombre', 'apellido', 'telefono', 'direccion', 'email']
            }
          }
        )
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

     create (req, res) {
      try {
          let datos = req.body; // Serializar los datos
          let montoIVA = datos.total * 0.12;

          // Crear registro en tabla compras
          Compras.create({
              proveedor_id: datos.proveedor_id,
              nombre: datos.nombre,
              fecha_compra: datos.fechacompra,
              total: datos.total,
              cantidad: datos.cantidad,
          }).then(compras => {
              // Calcular el subtotal
              const subtotal = datos.total * datos.cantidad;

              // Crear registro en tabla detallecompra
            DetalleCompra.create({
                  compra_id: compras.id,
                  cantidad: datos.cantidad,
                  subtotal: subtotal,
              }).then(detalleCompra => {
                  // Crear registro en tabla inventario
            Inventario.create({
                      descripcion: datos.descripcion,
                      preciounitario: datos.preciounitario,
                      nombre: datos.nombre,
                      cantidad: datos.cantidad,
                  }).then(inventario => {
                      // Asignar el ID de inventario al detalle de compra
                      detalleCompra.inventario_id = inventario.id;
                      return detalleCompra.save();
                  }).then(detalleCompra => {
                      res.send(detalleCompra);
                  });
              });
          }).catch(error => {
              console.log(error);
              return res.status(500).json({ error: 'Error al insertar' });
          });
      } catch (error) {
          console.log(error);
          return res.status(500).json({ error: 'Error al insertar' });
      }
  },
    update (req, res) {
        //Actualizar
        let datos = req.body
          Compras.update(
            { //En crudo
              //falta agregar la relacion entre tablas
              proveedor_id: datos.proveedor_id,
                fecha_compra: datos.fechacompra,
                total_compra: 150,
                monto_IVA: 15,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(compras => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },

      async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
          const compras = await Compras.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!compras) {
            return res.status(404).json({ error: 'Compras no encontrado' });
          }
          //Si pasa este punto
          await compras.destroy();
          return res.json({ message: 'Compras eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar equipo:', error);
          return res.status(500).json({ error: 'Error al eliminar equipo' });
        }
    },
};