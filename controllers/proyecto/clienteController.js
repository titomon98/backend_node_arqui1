'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Clientes = db.clientes;
const Tipos = db.tipos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Clientes.findAll({
            include: {
                model: Tipos,
                attibutes: ['nombre', 'descripcion', 'descuento']
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
            nombre: datos.nombre,
            apellido: datos.apellido,
            fecha_nacimiento: datos.fecha_nacimiento,
            telefono: datos.telefono,
            direccion: datos.direccion,
            email: datos.email,
            tipo_id: datos.tipo_id,
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

    update (req, res) {
        //Actualizar
        let datos = req.body
          Clientes.update(
            { //En crudo
                nombre: datos.nombre,
                apellido: datos.apellido,
                fecha_nacimiento: datos.fecha_nacimiento,
                telefono: datos.telefono,
                direccion: datos.direccion,
                email: datos.email,
                tipo_id: datos.tipo_id,
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

    async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
          const clientes = await Clientes.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!clientes) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
          }
          //Si pasa este punto
          await clientes.destroy();
          return res.json({ message: 'Cliente eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar cliente:', error);
          return res.status(500).json({ error: 'Error al eliminar cliente' });
        }
    },
};