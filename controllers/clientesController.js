'use strict'
const Sequelize = require('sequelize');
const db = require("../models");
const TipoClientes = db.tipo_clientes;
const Clientes = db.clientes;
const moment = require('moment');

module.exports = {
    findTipo (req, res) {
        return TipoClientes.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    findByIdTipo (req, res) {
        let id = req.body.id
        return TipoClientes.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    find (req, res) {
        return Clientes.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return Clientes.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    createTipo (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            descuento: datos.descuento,
            estado: 1
        };

        TipoClientes.create(datos_ingreso)
        .then(tipoCliente => {
            res.send(tipoCliente);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },

    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombres: datos.nombres,
            apellidos: datos.apellidos,
            nit: datos.nit,
            num_celular: datos.num_celular,
            correo: datos.correo,
            id_tipo_cliente: datos.id_tipo_cliente,
            estado: 1,
        };

        Clientes.create(datos_ingreso)
        .then(cliente => {
            res.send(cliente);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },

    update (req, res) {
        //Actualizar
        let datos = req.body
        Clientes.update(
            { //En crudo
                nombres: datos.nombres,
                apellidos: datos.apellidos,
                nit: datos.nit,
                num_celular: datos.celular,
                correo: datos.correo,
                id_tipo_cliente: datos.tipo_cliente,
                estado: datos.estado,
            },
            { 
            where: { 
                id: datos.id 
            }
            }
        )
        .then(cliente => res.status(200).send('El registro ha sido actualizado'))
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al actualizar' });
        });
    },

    updateTipo (req, res) {
        //Actualizar
        let datos = req.body
        TipoClientes.update(
            { //En crudo
                nombre: datos.nombre,
                descuento: datos.descuento,
                estado: datos.estado,
            },
            { 
            where: { 
                id: datos.id 
            }
            }
        )
        .then(tipo => res.status(200).send('El registro ha sido actualizado'))
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al actualizar' });
        });
    },

    async deleteTipo (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
        const tipoCliente = await TipoClientes.findByPk(id);
          //evaluamos si el objeto trajo algo
        if (!tipoCliente) {
            return res.status(404).json({ error: 'Tipo de cliente no encontrado' });
        }
          //Si pasa este punto
        await tipoCliente.destroy(); 
        return res.json({ message: 'Tipo de cliente eliminado correctamente' });
        } catch (error) {
        console.error('Error al eliminar tipo de cliente:', error);
        return res.status(500).json({ error: 'Error al eliminar tipo de cliente' });
        }
    },
};

