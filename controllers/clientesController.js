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
            nombres: datos.nombre,
            apellidos: datos.apellidos,
            nit: datos.nit,
            num_celular: datos.celular,
            correo: datos.correo,
            id_tipo_cliente: datos.tipo_cliente,
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

    /*update (req, res) {
        //Actualizar
        let datos = req.body
        Editorial.update(
            { //En crudo
                nombre_editorial: datos.nombre,
                direccion: datos.direccion,
                numero_telefonico: datos.telefono,
                estado: datos.estado,
            },
            { 
            where: { 
                id: datos.id 
            }
            }
        )
        .then(editorial => res.status(200).send('El registro ha sido actualizado'))
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al actualizar' });
        });
    },

    async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
        const editorial = await Editorial.findByPk(id);
          //evaluamos si el objeto trajo algo
        if (!editorial) {
            return res.status(404).json({ error: 'Editorial no encontrada' });
        }
          //Si pasa este punto
        await editorial.destroy(); 
        return res.json({ message: 'Editorial eliminada correctamente' });
        } catch (error) {
        console.error('Error al eliminar editorial:', error);
        return res.status(500).json({ error: 'Error al eliminar editorial' });
        }
    },*/
};

