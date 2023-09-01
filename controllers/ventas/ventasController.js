'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Ventas = db.ventas;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");
const detalleVentas = require('../../migrations/6-detalleVentas');

module.exports = {
    async findById(req, res) {
      try {
          let id = req.params.id;
          const venta = await Ventas.findByPk(id, {
              include: ["detalles"] 
          });

          if (!venta) {
              return res.status(404).json({ error: 'Venta no encontrada' });
          }

          return res.status(200).send(venta);
      } catch (error) {
          console.log(error);
          return res.status(500).json({ error: 'Error al obtener venta' });
      }
  },


    async create (req, res) {
        //Crear
        //extraer datos de req.body
        let venta = req.body //Serializar los datos

        // actualizar precios
        for (let i = 0; i < venta.detalles.length; i++) {
          var prod = await db.productos.findByPk(venta.detalles[i].idProducto);
          venta.detalles[i].precioUnidad = prod.precio;

          // todo: validar stock

        }
        
        // calculos extras
        var total = 0;
        venta.detalles.forEach(det => {
          det.subtotal = det.cantidad * det.precioUnidad;        
          total += det.subtotal;
        });
        
        // descuento
        var cliente = await db.clientes.findByPk(venta.idCliente);

        if (cliente.tipo == "F")
        {
          venta.descuento =  total * 0.05;
        }
        
        if (cliente.tipo == "M")
        {
          venta.descuento = total * 0.1;
        }

        venta.total = total - venta.descuento;
        venta.iva = venta.total * 0.12;
        venta.fecha = new Date();
          
        Ventas.create(venta, 
          {
            include: ["detalles"]
          })
        .then(ventas => {
            // todo: reducir stock

            res.send(ventas);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
      
      update (req, res) {
        //Actualizar
        let datos = req.body
          Ventas.update(
            { //En crudo
                total: datos.total,
                descuento: datos.descuento,
                iva: datos.iva,
                fecha: datos.fecha
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(cliente => res.status(200).send('El registro ha sido actualizado'))
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
          const Ventas = await Ventas.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!ventas) {
            return res.status(404).json({ error: 'Ventas no encontrada' });
          }
          //Si pasa este punto
          await ventas.destroy();
          return res.json({ message: 'Ventas eliminada correctamente' });
        } catch (error) {
          console.error('Error al eliminar ventas:', error);
          return res.status(500).json({ error: 'Error al eliminar ventas' });
        }
      }
};
