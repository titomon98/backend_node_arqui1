'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Tipos = db.tipos;
const DetalleCliente = db.detalle_tipos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Tipos.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            descuento: datos.descuento,
        };

        Tipos.create(datos_ingreso)
        .then(tipos => {
            res.send(tipos);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },

    update (req, res) {
        //Actualizar
        let datos = req.body
          Tipos.update(
            { //En crudo
                nombre: datos.nombre,
                descripcion: datos.descripcion,
                descuento: datos.descuento,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(tipos => res.status(200).send('El registro ha sido actualizado'))
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
          const tipos = await Tipos.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!tipos) {
            return res.status(404).json({ error: 'Tipos no encontrado' });
          }
          //Si pasa este punto
          await tipos.destroy();
          return res.json({ message: 'Tipos eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar tipos:', error);
          return res.status(500).json({ error: 'Error al eliminar tipos' });
        }
    },
};