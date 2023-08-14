'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Ventas = db.ventas;
const Clientes = db.clientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Ventas.findAll({
            attributes: ['fecha_venta', 'total'],
            include:{
                model: Clientes,
                attributes: ['nombres', 'apellidos', 'nit']    
            }
        })
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },
    create (req, res) {
      //Crear
      //extraer datos de req.body
      let datos = req.body //Serializar los datos
      const datos_ingreso = { //Objeto
        fecha_venta: datos.fecha_venta,
        total: datos.total,
        id_clientes: datos.id_clientes
        
      };
      Ventas.create(datos_ingreso)
      .then(ventas => {
          res.send(ventas);
      })
      .catch(error => {
          console.log(error)
          return res.status(500).json({ error: 'Error al insertar' });
      });
    },
    update(req, res) {
        //Actualizar
        let datos = req.body
        Ventas.update(
            { //En crudo
                fecha_venta: datos.fecha_venta,
                total: datos.total,
                id_clientes: datos.id_clientes
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
};