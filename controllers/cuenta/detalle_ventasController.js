'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Ventas = db.ventas;
const Detalle_ventas = db.detalle_ventas;
const Productos = db.productos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Ventas.findAll({
            attributes: ['fecha_venta', 'total', 'nit'],
            include:{
                model: Clientes,
                attributes: ['nombre', 'apellidos', 'nit']    
            }
        })
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },
    create (req, res) {
      //Crear
      //extraer datos de req.body
      const datos = req.body //Serializar los datos
      Productos.findByPk(datos.id_productos)
      .then(productos => {
        if(!productos){
            return res.status(404).json({ error: 'Producto no encontrado'});
        }
        //calcular el precio y subtotal
        const precio = productos.precio;
        const subtotal = (precio *datos.cantidad)-(precio * datos.cantidad * 0.12) 
        const datos_ingreso = { //Objeto
            id_ventas: datos.id_ventas,
            id_productos: datos.id_productos,
            cantidad: datos.cantidad,
            precio: precio,
            subtotal: subtotal
    
          };
          Detalle_ventas.create(datos_ingreso)
          .then(detalle_ventas => {
              res.send(detalle_ventas);
          })
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al insertar' });
          });
    })
    .catch(error => {
        console.log(error);
        return res.status(500).json({ error: 'Error al consultar el producto' });
      });
    },   
};