'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Cliente = db.clientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");
//const persona = db.personas;

module.exports = {
    find (req, res) {
        return Cliente.findAll()
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
            nit: datos.nit,
            contacto: datos.contacto,
            direccion: datos.direccion,
            estado: 0,
            id_tipoCliente: datos.id_tipoCliente
        };
  
        Cliente.create(datos_ingreso)
        .then(carro => {
            res.send(carro);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },

      update (req, res) {
        //Actualizar
        let datos = req.body
        Cliente.update(
            { //En crudo
              motor: datos.motor,
              precio: datos.precio,
              chasis: datos.chasis,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(carro => res.status(200).send('El registro ha sido actualizado'))
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
          const carro = await Carro.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!carro) {
            return res.status(404).json({ error: 'Carro no encontrada' });
          }
          //Si pasa este punto
          await carro.destroy();
          return res.json({ message: 'Carro eliminada correctamente' });
        } catch (error) {
          console.error('Error al eliminar factura:', error);
          return res.status(500).json({ error: 'Error al eliminar factura' });
        }
      }
    
};