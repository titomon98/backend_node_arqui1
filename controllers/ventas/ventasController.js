'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const VENTAS = db.ventas;
const DETALLEVENTAS = db.detalle_ventas;
const CLIENTES = db.clientes;
const INVENTARIO = db.inventarios;
const TIPOCLIENTE = db.tipo_clientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return VENTAS.findAndCountAll({
            attributes: ['id', 'Fecha', 'Total_Venta', 'Descuento_Aplicado', 'IVA_Venta']
        }) //Le hacemos una consulta al modelo
            .then(cuenta => res.status(200).send(cuenta)) //Devolvemos los datos
            .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    },

   async create (req, res) {
      const idCliente = req.body.Id_Cliente;
      const productos = req.body.productos;

      let totalVentas = 0;
      let totalDescuento = 0;
      let descuentoCliente = 0;

      const clientes = await CLIENTES.findByPk(idCliente);
      if (!clientes) {
        return res.status(404).send({message: 'El cliente no se ha encontrado'});   
      }
      for(const productoV of productos){
        const producto = await INVENTARIO.findByPk(productoV.id);
        if (!producto) {
            return res.status(404).send({message: 'El producto no se ha encontrado'});
        }
        if(productoV.Cantidad > producto.Cantidad_Producto){
            return res.status(404).send({message: 'no hay existencia'});

        }
        productoV.Precio = producto.Precio_Producto;
        productoV.total = producto.Precio_Producto * productoV.Cantidad;
        totalVentas = totalVentas + productoV.total;
        await INVENTARIO.update(
            {
                Cantidad_Producto: producto.Cantidad_Producto - productoV.Cantidad
            },
            {
                where: {
                    id: producto.id
                }
            }
        )
      }
      console.log(clientes.Id_TipoCliente);
      const tipoCliente = await TIPOCLIENTE.findByPk(clientes.Id_TipoCliente);
        if (!tipoCliente) {
            return res.status(404).send({message: 'El tipo de cliente no se ha encontrado'});           
        }
        if(tipoCliente.Tipo_Descuento > 0){
           descuentoCliente = tipoCliente.Tipo_Descuento;
           totalDescuento = totalVentas * descuentoCliente/100;
        }
        totalVentas = totalVentas - totalDescuento;
        
        const venta = await VENTAS.create({           
            Id_Cliente: idCliente,
            Fecha: new Date(),
            Total_Venta: totalVentas,
            Descuento_Aplicado: totalDescuento,
            IVA_Venta: totalVentas * 0.12
        });
       

        for(const productoV of productos){
            await DETALLEVENTAS.create({
                Id_Venta: venta.id,
                Id_Producto: productoV.id,
                Cantidad: productoV.Cantidad,
                Precio_Venta: productoV.Precio,
                Subtotal_Venta: productoV.total
            })
        }
    }
};

