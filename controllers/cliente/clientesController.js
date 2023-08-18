'use strict';
const Sequelize = require('sequelize');
const db = require("../../models");
const CLIENTE = db.clientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return CLIENTE.findAll()
            .then(cuenta => res.status(200).send(cuenta)) 
            .catch(error => res.status(400).send(error))        
    },

    //create
    create(req, res) {
        let datos = req.body
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            telefono: datos.telefono,
            direccion: datos.direccion,
            correo: datos.correo,
            tipoCliente: datos.tipoCliente,
        };
        CLIENTE.create(datos_ingreso)
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
    let datos = req.body
        CLIENTE.update(
            { //En crudo
                nombre: datos.nombre,
                telefono: datos.telefono,
                direccion: datos.direccion,
                correo: datos.correo,
                tipoCliente: datos.tipoCliente,
            },
            {
                where: {
                    id: datos.id
                }
            }
        )
        .then(clientes => res.status(200).send("El registro ha sido actualizado"))
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al actualizar' });
            });
    },

    //delete
    async delete(req, res) {
        console.log(req.params.id)  
        let id = req.params.id
        try{
            const cliente = await CLIENTE.findByPk(id);
            if (!cliente) {
                return res.status(400).send({error: 'No se encontro el registro'});           
        }
        await cliente.destroy();
        return res.status(200).send({mensaje: 'El registro ha sido eliminado'});
        }catch(error){
            console.log(error)
            return res.status(500).json({ error: 'Error al eliminar' });
        }
    }
        
}; 