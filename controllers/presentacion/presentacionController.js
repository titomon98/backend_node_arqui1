'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const PRESENTACION = db.presentaciones;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    findPresentacion(req, res) {
        return PRESENTACION.findAndCountAll({
                attributes: ['id','TipoPresentacion','DescripcionPresentacion']
            }) //Le hacemos una consulta al modelo
            .then(cuenta => res.status(200).send(cuenta)) //Devolvemos los datos
            .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    },

    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            TipoPresentacion: datos.TipoPresentacion,
            DescripcionPresentacion: datos.DescripcionPresentacion,
        };

        PRESENTACION.create(datos_ingreso)
        .then(presentaciones => {
            res.send(presentaciones);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        })
    },

    //update
    update (req, res) {
        let datos = req.body

        PRESENTACION.update(
            {
                TipoPresentacion: datos.TipoPresentacion,
                DescripcionPresentacion: datos.DescripcionPresentacion,
            },
            {
                where: {
                    id: datos.id
                }
            }
        )
        .then(presentaciones => res.status(200).send('El registro se actualizo correctamente'))
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al actualizar' });
        });
    },

    //delete
    async delete (req, res) {
        console.log(req.body)
        let id = req.body.id
        try {
            const presentaciones = await PRESENTACION.findByPk(id); 
            if(!presentaciones) {
                return res.status(400).send('No se encontro el registro')
            }
            await presentaciones.destroy();
            return res.status(200).send('El registro se elimino correctamente')     
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: 'Error al eliminar' });
        }
    }
};  