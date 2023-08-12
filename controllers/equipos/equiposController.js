'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Equipo = db.equipos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Equipo.findAndCountAll({
            attributes: ['nombre', 'entrenador']
          }) //Le hacemos una consulta al modelo
        .then(cuenta => res.status(200).send(cuenta)) //Devolvemos los datos
        .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    },

    findById (req, res) {
        let id = req.body.id
        return Equipo.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    }, //Consulta por medio de una llave primaria


    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            propietario: datos.propietario,
            entrenador: datos.entrenador,
            posicion: datos.posicion,
            estado: datos.estado,
        };

        Equipo.create(datos_ingreso)
        .then(equipos => {
            res.send(equipos);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },  

    update (req, res) {
      //Actualizar
      let datos = req.body
        Equipo.update(
          { //En crudo
            nombre: datos.nombre,
            propietario: datos.propietario,
            entrenador: datos.entrenador,
            posicion: datos.posicion,
            estado: datos.estado,
          },
          { 
            where: { 
              id: datos.id 
            }
          }
        )
        .then(equipos => res.status(200).send('El registro ha sido actualizado'))
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
          const equipos = await Equipo.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!equipos) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
          }
          //Si pasa este punto
          await equipos.destroy();
          return res.json({ message: 'Equipo eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar equipo:', error);
          return res.status(500).json({ error: 'Error al eliminar equipo' });
        }
    },
};
