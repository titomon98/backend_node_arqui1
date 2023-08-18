'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const DETALLEVENTAS = db.detalleVentas;
const VENTAS = db.ventas;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");


module.exports = {
    findDetalleVentas(req, res) {
        return DETALLEVENTAS.findAndCountAll({
                attributes: ['id', 'idVenta', 'idInventario', 'cantidad', 'Subtotal'],
                include: [{
                    model: VENTAS,
                    attributes: ['id', 'fecha', 'total', 'idCliente']
                }]
            }) //Le hacemos una consulta al modelo
            .then(detalleVentas => res.status(200).send(detalleVentas)) //Devolvemos los datos
            .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    },

    //create
    create(req, res) {
        //crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            idVenta: datos.idVenta,
            idInventario: datos.idInventario,
            cantidad: datos.cantidad,
            Subtotal: datos.Subtotal
        };
        
        DETALLEVENTAS.create(datos_ingreso)
        .then(detalleVentas => {
            res.send(detalleVentas);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },

    //update
    update(req, res) {
        //Actualizar
        let datos = req.body
            DETALLEVENTAS.update(
                { //En crudo
                    idVenta: datos.idVenta,
                    idInventario: datos.idInventario,
                    cantidad: datos.cantidad,
                    Subtotal: datos.Subtotal
                }, {
                    where: { id: datos.id }
                })
            .then(detalleVentas => res.status(200).send('detalleVentas actualizado correctamente')) //Devolvemos los datos  
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al actualizar' });
            });
            },

    //delete
    async delete(req, res) {
        console.log(req.params.id)
        let id = req.params.id
        try {
            const detalleVentas = await DETALLEVENTAS.findByPk(id);
            if (!detalleVentas) {
                return res.status(404).send({ message: 'detalleVentas no encontrado' })
            }
            await detalleVentas.destroy();
            res.status(200).send({ message: 'detalleVentas eliminado correctamente' })  
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Error al eliminar' })
        }
    }
};
                
