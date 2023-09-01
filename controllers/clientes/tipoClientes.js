'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const TIPOCLIENTES = db.tipoClientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    findTipoClientes(req, res) {
        return TIPOCLIENTES.findAndCountAll({
                attributes: ['id','tipoCliente', 'PorcentajeDescuento'],
            }) //Le hacemos una consulta al modelo
            .then(tipoClientes => res.status(200).send(tipoClientes)) //Devolvemos los datos
            .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    },

    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            tipoCliente: datos.tipoCliente,
            PorcentajeDescuento: datos.PorcentajeDescuento
        };
        
        TIPOCLIENTES.create(datos_ingreso)
        .then(tipoClientes => {
            res.send(tipoClientes);
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
        TIPOCLIENTES.update(
            { //En crudo
                tipoCliente: datos.tipoCliente,
                PorcentajeDescuento: datos.PorcentajeDescuento
            }, {
                where: { id: datos.id }
            })
            .then(tipoClientes => res.status(200).send('El registro ah sido actualizado'))
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
            const tipoClientes = await TIPOCLIENTES.findByPk(id);
            if (!tipoClientes) {           
                res.status(400).json({ message: 'No existe el tipo de cliente' })   
            }
            await tipoClientes.destroy();
            res.status(200).json({ message: 'El tipo de cliente ha sido eliminado' })   
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Error al eliminar' });
        }
            }
        };
    
            

