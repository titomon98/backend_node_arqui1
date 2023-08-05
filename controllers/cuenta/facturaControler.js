'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Factura = db.facturas;
const DetalleFactura = db.detalle_facturas;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Factura.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return Factura.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    }, //Consulta por medio de una llave primaria

    findByDiscount (req, res) {
        return Factura.findAll({
            where: {
              descuento: {
                [Op.gt]: 0 //Estas condiciones pueden encontrarlas en la documentacion
              }
            }
          })
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    }, //Consulta para los que tengan un descuento mayor a 0

    create (req, res) {
      //Crear
      //extraer datos de req.body
      let datos = req.body //Serializar los datos
      const datos_ingreso = { //Objeto
          pertenece_a: datos.nombre,
          nit: datos.nit,
          total: datos.total,
          direccion: datos.direccion,
          descuento: datos.descuento,
          estado: 0
      };

      Factura.create(datos_ingreso)
      .then(factura => {
          res.send(factura);
      })
      .catch(error => {
          console.log(error)
          return res.status(500).json({ error: 'Error al insertar' });
      });
    },

    update (req, res) {
      //Actualizar
      let datos = req.body
        Factura.update(
          { //En crudo
            pertenece_a: datos.nombre,
            nit: datos.nit,
            total: datos.total,
            direccion: datos.direccion,
            descuento: datos.descuento
          },
          { 
            where: { 
              id: datos.id 
            }
          }
        )
        .then(factura => res.status(200).send('El registro ha sido actualizado'))
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
        const factura = await Factura.findByPk(id);
        //evaluamos si el objeto trajo algo
        if (!factura) {
          return res.status(404).json({ error: 'Factura no encontrada' });
        }
        //Si pasa este punto
        await factura.destroy();
        return res.json({ message: 'Factura eliminada correctamente' });
      } catch (error) {
        console.error('Error al eliminar factura:', error);
        return res.status(500).json({ error: 'Error al eliminar factura' });
      }
    }
};

