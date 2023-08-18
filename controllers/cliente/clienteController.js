'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Cliente = db.clientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");
const cliente = require('../../models/cliente/cliente');

module.exports = {
    //buscar todos los registros
    find (req, res) {
        return Cliente.findAll()
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
            apellido: datos.apellido,
            telefono: datos.telefono,
            direccion: datos.direccion,
            tipo_cliente: datos.tipo_cliente,
        };

        Cliente.create(datos_ingreso)
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
        Cliente.update(
            { //En crudo
                nombre: datos.nombre,
                apellido: datos.apellido,
                telefono: datos.telefono,
                direccion: datos.direccion,
                tipo_cliente: datos.tipo_cliente,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
        .then(clientes => res.status(200).send("Datos actualizados"))
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
            const cliente = await Cliente.findByPk(id);

            if(!cliente){
                return res.status(400).json({ error: 'No se encontro el registro' });
            }
            await cliente.destroy();
            return res.json({ message: 'Registro eliminado' });
        }catch(error){
            console.error('Error al eliminar el registro', error);
            return res.status(500).json({ error: 'Error al eliminar' });
        }
    },
};