'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const TipoCliente = db.tipoClientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");
//const persona = db.personas;

module.exports = {
    find (req, res) {
        return TipoCliente.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    // findById (req, res) {
    //     let id = req.body.id
    //     return Carro.findByPk(id)
    //     .then(cuenta => res.status(200).send(cuenta))
    //     .catch(error => res.status(400).send(error))
    // }, //Consulta por medio de una llave primaria
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            descuento: datos.descuento,
            estado: 0
        };
  
        TipoCliente.create(datos_ingreso)
        .then(tipoCliente => {
            res.send(tipoCliente);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar un tipo de cliente' });
        });
      },

      update (req, res) {
        //Actualizar
        let datos = req.body
        TipoCliente.update(
            { //En crudo
              nombre: datos.nombre,
              descuento: datos.descuento,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(tipoCliente => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },

      updateOtro (req, res) {
        //Actualizar
        let datos = req.body
        TipoCliente.update(
            { //En crudo
              nombre: datos.nombre,
              descuento: datos.descuento,
            },
            { 
              where: { 
                id: datos.id 
              }
            } 
          )
          .then(tipoCliente => res.status(200).send('El registro ha sido actualizado'))
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
          const tipoCliente = await TipoCliente.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!tipoCliente) {
            return res.status(404).json({ error: 'tipoCliente no encontrada' });
          }
          //Si pasa este punto
          await tipoCliente.destroy();
          return res.json({ message: 'tipoCliente eliminada correctamente' });
        } catch (error) {
          console.error('Error al eliminar factura:', error);
          return res.status(500).json({ error: 'Error al eliminar factura' });
        }
      }
    
};