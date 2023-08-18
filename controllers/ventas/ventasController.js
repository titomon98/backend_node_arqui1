'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const VENTAS = db.ventas;
const DETALLEVENTAS = db.detalleVentas;
const INVENTARIO = db.inventarios;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    findVentas(req, res) {
        return VENTAS.findAndCountAll({
                attributes: ['id','idCliente', 'fecha', 'total', 'Descuento', 'CantidadIVA'],
                include: [{
                    model: DETALLEVENTAS,
                    attributes: ['id', 'idVenta', 'idinventario', 'cantidad', 'Subtotal'],
                    include: [{
                        model: INVENTARIO,
                        attributes: ['id', 'nombre', 'precio', 'cantidad', 'descripcion', 'estado']
                    }]
                }]
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
            idCliente: datos.idCliente,
            fecha: datos.fecha,
            total: datos.total,
            Descuento: datos.Descuento,
            CantidadIVA: datos.CantidadIVA,
        };
        
        VENTAS.create(datos_ingreso)
        .then(ventas => {
            res.send(ventas);
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
          VENTAS.update(
            { //En crudo
                idCliente: datos.idCliente,
                fecha: datos.fecha,
                total: datos.total,
                Descuento: datos.Descuento,
                CantidadIVA: datos.CantidadIVA,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(ventas => res.status(200).send('El registro se actualizo correctamente'))
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
      const ventas = await VENTAS.findByPk(id);
        if (!ventas) {
            return res.status(400).send('No se encontro el registro');
        }
        await ventas.destroy();
        return res.status(200).send('El registro se elimino correctamente');
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Error al eliminar' });
        }   
    }
};