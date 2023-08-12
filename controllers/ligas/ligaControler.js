'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Liga = db.ligas;
const Equipo = db.equipos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return Liga.findAndCountAll({
            attributes: ['nombre', 'posición', 'tipo'],
            include: { //inclusion del modelo padre
                model: Equipo, //Consulta al modelo padre en base al modelo hijo
                attributes: ['nombre', 'entrenador']
            }
          }) //Le hacemos una consulta al modelo
        .then(cuenta => res.status(200).send(cuenta)) //Devolvemos los datos
        .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    },

    findById (req, res) {
        let id = req.body.id
        return Liga.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    }, //Consulta por medio de una llave primaria

    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            posición: datos.posicion,
            tipo: datos.tipo,
            estado: datos.estado,
            id_equipo: datos.id_equipo,
        };

        Liga.create(datos_ingreso)
        .then(ligas => {
            res.send(ligas);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },

    update (req, res) {
        //Actualizar
        let datos = req.body
          Liga.update(
            { //En crudo
                nombre: datos.nombre,
                posición: datos.posicion,
                tipo: datos.tipo,
                estado: datos.estado,
                id_equipo: datos.id_equipo,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(ligas => res.status(200).send('El registro ha sido actualizado'))
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
          const ligas = await Liga.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!ligas) {
            return res.status(404).json({ error: 'Liga no encontrada' });
          }
          //Si pasa este punto
          await ligas.destroy();
          return res.json({ message: 'Liga eliminada correctamente' });
        } catch (error) {
          console.error('Error al eliminar la Liga:', error);
          return res.status(500).json({ error: 'Error al eliminar Liga' });
        }
      }

};
