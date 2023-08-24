'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Ventas = db.ventas;
const Clientes = db.clientes;
const Tipos = db.tipos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Ventas.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },
    
    async create (req, res) {
      try {
          let datos = req.body; // Serializar los datos
        
          // Obtener el descuento del cliente a través de su tipo
          const cliente = await Clientes.findByPk(datos.cliente_id, {
              include: {
                  model: Tipos,
                  attributes: ['descuento']
              }
          });
        
          if (!cliente) {
              return res.status(400).json({ error: 'Cliente no encontrado' });
          }

          // Calcular el descuento aplicado en la venta
          const descuentoAplicado = cliente.tipo.descuento; // Supongo que quieres aplicar el descuento al total de la venta

          // Calcular el monto del IVA
          const montoIVA = datos.total * 0.12;

          const datos_ingreso = {
              total_venta: datos.total,
              fecha_venta: datos.fecha_venta,
              cliente_id: datos.cliente_id,
              descuento_aplicado: descuentoAplicado,
              monto_iva: montoIVA, // Asignar el monto del IVA calculado
          };

          const venta = await Ventas.create(datos_ingreso);

          res.send(venta);
      } catch (error) {
          console.log(error);
          return res.status(500).json({ error: 'Error al insertar' });
      }
  },
  
    update (req, res) {
        //Actualizar
        let datos = req.body
          Ventas.update(
            { //En crudo
              fecha_venta: datos.fecha_venta,
              cliente_id: datos.cliente_id,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(ventas => res.status(200).send('El registro ha sido actualizado'))
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
          const ventas = await Ventas.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!ventas) {
            return res.status(404).json({ error: 'Ventas no encontrado' });
          }
          //Si pasa este punto
          await ventas.destroy();
          return res.json({ message: 'Ventas eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar venta:', error);
          return res.status(500).json({ error: 'Error al eliminar venta' });
        }
    },
};