'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const INVENTARIOS = db.inventarios;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return INVENTARIOS.findAndCountAll({
            attributes: ['id', 'Nombre_Producto', 'Cantidad_Producto', 'Precio_Producto', 'Id_Proveedor']
        }) //Le hacemos una consulta al modelo
            .then(cuenta => res.status(200).send(cuenta)) //Devolvemos los datos
            .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    },

    //create
    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            Nombre_Producto: datos.Nombre_Producto,
            Cantidad_Producto: datos.Cantidad_Producto,
            Precio_Producto: datos.Precio_Producto,
            Id_Proveedor: datos.Id_Proveedor,
        };

        INVENTARIOS.create(datos_ingreso)
        .then(inventarios => {
            res.send(inventarios);
        } )
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },


        //update
        update (req, res) {
            let datos = req.body
            INVENTARIOS.update(
                { //En crudo
                    Nombre_Producto: datos.Nombre_Producto,
                    Cantidad_Producto: datos.Cantidad_Producto,
                    Precio_Producto: datos.Precio_Producto,
                    Id_Proveedor: datos.Id_Proveedor,
                },
                {
                    where: {
                        id: datos.id
                    }
                }
            )
                .then(inventarios => res.status(200).send('El registro ha sido actualizado'))
                .catch(error => {
                    console.log(error)
                    return res.status(500).json({ error: 'Error al actualizar' });
                });
        },

        //delete
        async delete(req, res) {
            console.log(req.params.id)
            let id = req.params.id;
            try {
                const inventarios = await INVENTARIOS.findByPk(id);
                if (!inventarios) {
                    return res.status(400).send('No se encontro el registro');
                }
                await inventarios.destroy();
                return res.status(200).send('El registro ha sido eliminado');
            } catch (e) {
                console.error('Error al eliminar', e);  
                return res.status(500).json({ error: 'Error al eliminar' });
            }
        },
};