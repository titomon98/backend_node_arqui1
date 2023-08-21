'use strict'
const Sequelize     = require('sequelize');
const db = require("../models");
const Venta = db.ventas;
const Producto = db.productos;
const DetalleVenta = db.detalleventas;
const TipoClientes = db.tipo_clientes;
const Cliente = db.clientes;
const moment = require('moment');

module.exports = {
  find (req, res) { //Busca todas las ventas
    return Venta.findAll()
    .then(cuenta => res.status(200).send(cuenta))
    .catch(error => res.status(400).send(error))
  },

  findById (req, res) { //Busca las ventas por id
    let id = req.body.id
    return Venta.findByPk(id)
    .then(cuenta => res.status(200).send(cuenta))
    .catch(error => res.status(400).send(error))
  },

  findDetalle (req, res) { //Busca todos los detalles de venta
    return DetalleVenta.findAll()
    .then(cuenta => res.status(200).send(cuenta))
    .catch(error => res.status(400).send(error))
  },

  findByIdDetalle (req, res) { //Busca todos los detalles de venta por id
    let id = req.body.id
    return DetalleVenta.findByPk(id)
    .then(cuenta => res.status(200).send(cuenta))
    .catch(error => res.status(400).send(error))
  },

  findVenta(req, res) {
    let id = req.body.id
    return DetalleVenta.findByPk(id,{
      attributes: ['id_venta', 'createdAt', 'id_cliente','iva', 'total'],
      include: [{
        model: Cliente,
        attributes: ['nombres', 'apellidos'],
      },
      {
        model: Venta,
        attributes: ['cantidad', 'subtotal'],
        include: [{
          model: Producto,
          attributes: ['nombre', 'precio_venta'],
        },]
      },],
    })
    .then(cuenta => res.status(200).send(cuenta))
    .catch(error => res.status(400).send(error))
  },

  createVenta (req, res) {
    //Crear
    //extraer datos de req.body
    let datos = req.body //Serializar los datos
    Producto.findByPk(datos.id_producto)
    .then(producto => {
      if(!producto){
        return res.status(404).json({error: 'Producto no encontrado. Ingrese un producto valido'}); //Si el id del producto no existe
      }

      //Calcular el subtotal
      const precio = producto.precio_venta;
      const subtotal = precio * datos.cantidad;

      const datos_ingreso = { //Objeto
        id_producto: datos.id_producto,
        cantidad: datos.cantidad,
        subtotal: subtotal,
        estado: 1,
      };
        
      Venta.create(datos_ingreso)
      .then(venta => {
        Producto.findByPk(datos.id_producto)
        .then(producto => {
          if(!producto){
            return res.status(404).json({ error: 'Producto no encontrado' });
          }

          const nuevaCantidad = parseInt(producto.cantidad) - parseInt(datos.cantidad);

          if(parseInt(datos.cantidad) < parseInt(producto.cantidad))
          {
            Producto.update({cantidad: nuevaCantidad},
              {
                where: {id: producto.id}
              })
              .then(producto => res.status(200).send('El registro ha sido actualizado'))
              .catch(error => {console.log(error) 
                return res.status(500).json({ error: 'Error al actualizar' });
              });
          }
          else
          {
            return res.status(500).json({ error: 'Producto insuficiente'});
          }
      })
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ error: 'Error al insertar' });
    });
    })
  },

  createDetalleVenta (req, res) {
    //Crear
    //extraer datos de req.body
    let datos = req.body //Serializar los datos
    Cliente.findByPk(datos.id_cliente)
    .then(cliente => {
      if(!cliente){
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
        
      const tipoCliente = cliente.id_tipo_cliente;

      TipoClientes.findByPk(tipoCliente)
      .then(tipo => {
        if(!tipo){
          return res.status(404).json({ error: 'Tipo de Cliente no encontrado' });
        }

        Venta.findByPk(datos.id_venta)
        .then(venta => {
          if(!venta){
            return res.status(404).json({ error: 'Venta no encontrada' });
          }
        //Calcular el iva
        const iva = venta.subtotal * 0.12;
        const descuento = tipo.descuento;
        const totalConDescuento = venta.subtotal - (venta.subtotal * descuento);
          
        const datos_venta = { //Objeto
          total: totalConDescuento,
          id_cliente: datos.id_cliente,
          id_venta: datos.id_venta,
          iva: iva,
          estado: 1,
        };

        DetalleVenta.create(datos_venta)
        .then(detalleventa => {
          res.send(detalleventa);
        })
        .catch(error => {
          console.log(error)
          return res.status(500).json({ error: 'Error al insertar' });
        });
      })
    })
    })
  },

    /*updateDetalle (req, res) {
        //Actualizar
        let datos = req.body
          Editorial.update(
            { //En crudo
                total: datos.total,
                iva: datos.iva,
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
      },*/

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

