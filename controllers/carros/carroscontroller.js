'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const CARRO = db.carros;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return CARRO.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },
    findById (req, res) {
        let id = req.body.id
        return CARRO.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    }, //Consulta por medio de una llave primaria
    
    
    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            marca: datos.marca,
            modelo: datos.modelo,
            anio: datos.anio,
            estado: datos.estado,
            id_persona: datos.id_persona,
        };

        CARRO.create(datos_ingreso)
        .then(carros => {
            res.send(carros);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },
    //update
    update (req, res) {
        //Actualizar
        let datos = req.body
        CARRO.update(
            { //En crudo
                marca: datos.marca,
                modelo: datos.modelo,
                anio: datos.anio,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(carros => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
        });
    },

    //delete
    async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
          const carros = await CARRO.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!carros) {
            return res.status(404).json({ error: 'Producto no encontrado' });
          }
          //Si pasa este punto
          await carros.destroy();
          return res.json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar producto:', error);
          return res.status(500).json({ error: 'Error al eliminar producto' });
        }
      }
};