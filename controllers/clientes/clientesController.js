'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Clientes = db.clientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    
    findById (req, res) {
        let id = req.params.id;
        return Clientes.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    }, //Consulta por medio de una llave primaria

    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            tipo: datos.tipo,
            telefono: datos.telefono
        };
  
        Clientes.create(datos_ingreso)
        .then(cliente => {
            res.send(cliente);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },


      update (req, res) {
        //Actualizar
        let datos = req.body
          Clientes.update(
            { //En crudo
                nombre: datos.nombre,
                tipo: datos.tipo,
                telefono: datos.telefono
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
          const cliente = await Clientes.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrada' });
          }
          //Si pasa este punto
          await cliente.destroy();
          return res.json({ message: 'Cliente eliminada correctamente' });
        } catch (error) {
          console.error('Error al eliminar cliente:', error);
          return res.status(500).json({ error: 'Error al eliminar cliente' });
        }
      }
};
