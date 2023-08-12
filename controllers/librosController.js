'use strict'
const Sequelize     = require('sequelize');
const db = require("../models");
const Libro = db.libros;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Libro.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return Libro.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    findEditoriales (req, res) {
        return Libro.findAndCountAll({
            attributes: ['titulo', 'autor'],
            include: { //inclusion del modelo padre
                model: Editorial, //Consulta al modelo padre en base al modelo hijo
                attributes: ['nombre_editorial', 'direccion', 'numero_telefonico'],
            }
          }) //Le hacemos una consulta al modelo
        .then(cuenta => res.status(200).send(cuenta)) //Devolvemos los datos
        .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    },

    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            autor: datos.autor,
            isbn: datos.isbn,
            titulo: datos.titulo,
            publicacion: datos.publicacion,
            estado: 1,
            id_editoriales: datos.editorial,
        };
  
        Libro.create(datos_ingreso)
        .then(libro => {
            res.send(libro);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },

      update (req, res) {
        //Actualizar
        let datos = req.body
          Libro.update(
            { //En crudo
                autor: datos.autor,
                isbn: datos.isbn,
                titulo: datos.titulo,
                publicacion: datos.publicacion,
                estado: 1,
                id_editoriales: datos.editorial,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(libro => res.status(200).send('El registro ha sido actualizado'))
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
          const libro = await Libro.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!libro) {
            return res.status(404).json({ error: 'Libro no encontrado' });
          }
          //Si pasa este punto
          await libro.destroy(); 
          return res.json({ message: 'Libro eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar libro:', error);
          return res.status(500).json({ error: 'Error al eliminar libro' });
        }
      },
};

