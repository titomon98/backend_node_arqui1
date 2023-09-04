'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const Clientes = db.clientes;
const Tipo_clientes = db.tipo_clientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return Clientes.findAll({
            attributes: ['nombres', 'apellidos', 'nit'],
            include: {
                model: Tipo_clientes,
                attributes: ['nombre', 'descuento']
            }
        })
            .then(cuenta => res.status(200).send(cuenta))
            .catch(error => res.status(400).send(error))
    },
    findId(req, res) {
        const ID = req.params.id; // Obtén el ID del clientes a buscar
        Clientes.findByPk(ID)
            .then(clientes => {
                if (!clientes) {
                    return res.status(404).send({ error: 'Cliente no encontrado' });
                }
                const IDTipoCliente = clientes.id_tipo_clientes;
                Tipo_clientes.findByPk(IDTipoCliente)
                    .then(tipo_clientes => {
                        if (!tipo_clientes) {
                            return res.status(404).send({ error: 'Cliente no encontrado' });
                        }
                        const response = {
                            clientes: clientes,
                            tipo_clientes: tipo_clientes
                        };
                        res.status(200).send({ response });
                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(500).send({ error: 'Error al buscar el cliente' });
                    });
            })
            .catch(error => {
                console.log(error);
                return res.status(500).send({ error: 'Error al buscar el cliente' });
            });
    },
    create(req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombres: datos.nombres,
            apellidos: datos.apellidos,
            nit: datos.nit,
            id_tipo_clientes: datos.id_tipo_clientes
        };
        Clientes.create(datos_ingreso)
            .then(clientes => {
                res.send(clientes);
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al insertar' });
            });
    },
    update(req, res) {
        //Actualizar
        let datos = req.body
        Clientes.update(
            { //En crudo
                nombres: datos.nombres,
                apellidos: datos.apellidos,
                nit: datos.nit,
                id_tipos_clientes: datos.id_tipos_clientes
            },
            {
                where: {
                    id: datos.id
                }
            }
        )
            .then(clientes => res.status(200).send('El registro ha sido actualizado'))
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al actualizar' });
            });
    },
    async delete(req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
            //Busqueda de un objeto especifico por id
            const clientes = await Clientes.findByPk(id);
            //evaluamos si el objeto trajo algo
            if (!clientes) {
                return res.status(404).json({ error: 'clientes no encontrada' });
            }
            //Si pasa este punto
            await clientes.destroy();
            return res.json({ message: 'clientes eliminada correctamente' });
        } catch (error) {
            console.error('Error al eliminar clientes:', error);
            return res.status(500).json({ error: 'Error al eliminar clientes' });
        }
    }
};