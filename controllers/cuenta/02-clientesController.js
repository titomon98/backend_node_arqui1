'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Clientes = db.clientes;
const Tipo_clientes = db.tipo_clientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Clientes.findAll({
            attributes: ['nombres', 'apellidos', 'nit'],
            include:{
                model: Tipo_clientes,
                attributes: ['nombre', 'descuento']    
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
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        nit: datos.nit,
        id_tipo_clientes: datos.id_tipo_clientes

        
      };
      Clientes.create(datos_ingreso)
      .then(clientes => {
          res.send(clientes);
      })
      .catch(error => {
          console.log(error)
          return res.status(500).json({ error: 'Error al insertar' });
      });
    },
    update(req, res) {
        //Actualizar
        let datos = req.body
        Clientes.update(
            { //En crudo
                nombres: datos.nombres,
                apellidos: datos.apellidos,
                nit: datos.nit,
                id_tipos_clientes: datos.id_tipos_clientes
            },
            {
                where: {
                    id: datos.id
                }
            }
        )
            .then(clientes => res.status(200).send('El registro ha sido actualizado'))
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al actualizar' });
            });
    },
};