'use strict'
const Sequelize = require('sequelize');
const db = require("../models");
const Producto = db.productos;
const moment = require('moment');

module.exports = {
    find (req, res) {
        return Producto.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return Producto.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            existencia: 0,
            costo: datos.costo,
            precio_venta: datos.precio_venta,
            estado: 1,
        };

        Producto.create(datos_ingreso)
        .then(producto => {
            res.send(producto);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },
    
    update (req, res) {
        //Actualizar
        let datos = req.body
        Producto.update(
          { //En crudo
            nombre: datos.nombre,
            existencia: datos.existencia,
            costo: datos.costo,
            precio_venta: datos.venta,
            estado: datos.estado,
        },
        { 
        where: { id: datos.id }
        })
        .then(producto => res.status(200).send('El registro ha sido actualizado'))
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al actualizar' });
        });
    },

    /*async delete (req, res) {
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

