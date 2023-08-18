'use strict'
const sequelize = require('sequelize');
const db = require("../../models");
const Ventas = db.ventas;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    //buscar todos los registros
    find (req, res) {
        return Ventas.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            fecha: datos.fecha,
            total: datos.total,
        };

        Ventas.create(datos_ingreso)
        .then(ventas => {
            res.send(ventas);
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
        Ventas.update(
            { //En crudo
                fecha: datos.fecha,
                total: datos.total,
            },
            {
                where: {
                    id: datos.id
                }
            }
        )
        .then(ventas => res.status(200).send("Datos actualizados"))
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
            const venta = await Ventas.findByPk(id);

            if(!venta){
                return res.status(400).json({ error: 'No se encontro el registro' });
            }
            await venta.destroy();
            return res.json({ message: 'Registro eliminado' });
        }catch(error){
            console.error('Error al eliminar el registro', error);
            return res.status(500).json({ error: 'Error al eliminar' });
        }
    },
};