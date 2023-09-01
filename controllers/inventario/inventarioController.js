'use strict'
const Sequelize = require('sequelize'); 
const db = require("../../models");
const INVENTARIO = db.inventarios;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    findInventario(req, res) {
        return INVENTARIO.findAndCountAll({
                attributes: ['id', 'nombre', 'precio', 'cantidad', 'descripcion', 'estado']
            }) //Le hacemos una consulta al modelo
            .then(cuenta => res.status(200).send(cuenta)) //Devolvemos los datos
            .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    },

    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
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
        //Actualizar
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
          .then(inventarios => res.status(200).send('El registro se actualizo correctamente'))
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
            if (!inventarios) {
                return res.status(400).send('No se encontro el registro');
            }
            await inventarios.destroy();
            return res.status(200).send('El registro se elimino correctamente');
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: 'Error al eliminar' });
        }
    }
};