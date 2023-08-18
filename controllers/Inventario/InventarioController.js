'use strict';
const Sequelize = require('sequelize');
const db = require("../../models");
const INVENTARIO = db.inventarios;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return INVENTARIO.findAll()
            .then(cuenta => res.status(200).send(cuenta)) 
            .catch(error => res.status(400).send(error))        
    },

    //create
    create(req, res) {  
        let datos = req.body
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            cantidad: datos.cantidad,
            precio: datos.precio,
            descripcion: datos.descripcion,
            estado: datos.estado,
        };
        INVENTARIO.create(datos_ingreso)
            .then(inventarios => {
                res.send(inventarios);
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al insertar' });
            });
    },

    //update
update (req, res) {
    let datos = req.body
        INVENTARIO.update(
            { //En crudo
                nombre: datos.nombre,
                cantidad: datos.cantidad,
                precio: datos.precio,
                descripcion: datos.descripcion,
                estado: datos.estado,
            },
            {
                where: {
                    id: datos.id
                }
            }
        )
        .then(inventarios => res.status(200).send("El registro ha sido actualizado"))
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
        const inventarios = await INVENTARIO.findByPk(id);
        if(!inventarios){
            return res.status(400).send({ error: 'No se encontro el registro' });
        }
        await inventarios.destroy();
        return res.status(200).send({ message: 'El registro ha sido eliminado' });  
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error al eliminar' });
    }
}

}; 