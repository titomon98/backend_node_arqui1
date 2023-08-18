'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const CLIENTES = db.clientes;
const TIPOCLIENTES = db.tipoClientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    findClientes(req, res) {
        return CLIENTES.findAndCountAll({
                attributes: ['id','nombreCliente', 'apellidoCliente', 'telefono', 'direccion', 'idtipoCliente'],
                include: [{
                    model: TIPOCLIENTES,
                    attributes: ['id', 'tipoCliente', 'PorcentajeDescuento']
                }]
            }) //Le hacemos una consulta al modelo
            .then(clientes => res.status(200).send(clientes)) //Devolvemos los datos
            .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    },


    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombreCliente: datos.nombreCliente,
            apellidoCliente: datos.apellidoCliente,
            telefono: datos.telefono,
            direccion: datos.direccion,
            idtipoCliente: datos.idtipoCliente
        };
        
        CLIENTES.create(datos_ingreso)
        .then(clientes => {
            res.send(clientes);
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
          CLIENTES.update(
            { //En crudo
                nombreCliente: datos.nombreCliente,
                apellidoCliente: datos.apellidoCliente,
                telefono: datos.telefono,
                direccion: datos.direccion,
                idtipoCliente: datos.idtipoCliente
            }, {
                where: { id: datos.id }
            })
            .then(clientes => res.status(200).send('El registro se ha actualizado'))
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
            const clientes = await CLIENTES.findByPk(id);
            if (!clientes) {
                res.status(400).json({ message: 'No existe el cliente' })
            }
            await clientes.destroy();
            res.status(200).json({ message: 'El cliente se ha eliminado' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error al eliminar' })
        }
    }

};

