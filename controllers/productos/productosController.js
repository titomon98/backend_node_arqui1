'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const Producto = db.productos;
const moment = require('moment');

module.exports = {
    findById (req, res) {
        let id = req.params.id
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
            precio: datos.precio,
            stock: datos.stock,
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
            precio: datos.precio,
            stock: datos.stock,
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

    async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
        const producto = await Producto.findByPk(id);
          //evaluamos si el objeto trajo algo
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrada' });
        }
          //Si pasa este punto
        await producto.destroy(); 
        return res.json({ message: 'Producto eliminada correctamente' });
        } catch (error) {
        console.error('Error al eliminar producto:', error);
        return res.status(500).json({ error: 'Error al eliminar producto' });
        }
    },
};
