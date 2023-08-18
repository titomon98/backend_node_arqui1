'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Inventario = db.inventarios;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    //buscar todos los registros
    find (req, res) {
        return Inventario.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            cantidad: datos.cantidad,
            precio: datos.precio,
        };

        Inventario.create(datos_ingreso)
        .then(inventarios => {
            res.send(inventarios);
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
        Inventario.update(
            { //En crudo
                nombre: datos.nombre,
                descripcion: datos.descripcion,
                cantidad: datos.cantidad,
                precio: datos.precio,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
        .then(inventarios => res.status(200).send("Datos actualizados"))
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al actualizar' });
        });
    },

    //delete
    async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id;

        try{
            const inventario = await Inventario.findByPk(id);

            if(!inventario){
                return res.status(400).json({ error: 'No se encontro el registro' });
            }
            await inventario.destroy();
            return res.json({ message: 'Registro eliminado' });
        }catch(error){
            console.error('Error al eliminar el registro', error);
            return res.status(500).json({ error: 'Error al eliminar' });
        }
    },
};