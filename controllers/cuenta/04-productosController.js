'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Productos = db.productos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Productos.findAll({
            
        })
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },
    findID(req, res){
        const ID = req.params.id;
        Productos.findByPk(ID)
        .then(productos =>{
            if(!productos){
                return res.status(404).res({error: 'Producto no encontrado'});
            }
            res.status(200).send({productos})
        })
        .catch((error) => {
            console.log(error);
            return res.status(404).res({error: 'Error al buscar producto'})
        })
    },

    // findById (req, res) {
    //     let id = req.body.id
    //     return Factura.findByPk(id)
    //     .then(cuenta => res.status(200).send(cuenta))
    //     .catch(error => res.status(400).send(error))
    // }, //Consulta por medio de una llave primaria

    // findByDiscount (req, res) {
    //     return Factura.findAll({
    //         where: {
    //           descuento: {
    //             [Op.gt]: 0 //Estas condiciones pueden encontrarlas en la documentacion
    //           }
    //         }
    //       })
    //     .then(cuenta => res.status(200).send(cuenta))
    //     .catch(error => res.status(400).send(error))
    // }, //Consulta para los que tengan un descuento mayor a 0

    create (req, res) {
      //Crear
      //extraer datos de req.body
      let datos = req.body //Serializar los datos
      const datos_ingreso = { //Objeto
          nombre: datos.nombre,
          descripcion: datos.descripcion,
          precio: datos.precio,
          cantidad: datos.cantidad,
      };

      Productos.create(datos_ingreso)
      .then(productos => {
          res.send(productos);
      })
      .catch(error => {
          console.log(error)
          return res.status(500).json({ error: 'Error al insertar' });
      });
    },

    update (req, res) {
      //Actualizar
      let datos = req.body
        Productos.update(
          { //En crudo
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            precio: datos.precio,
            cantidad: datos.cantidad
          },
          { 
            where: { 
              id: datos.id 
            }
          }
        )
        .then(productos =>{         
            res.status(200).send('El producto ha sido actualizado')
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al actualizar producto' });
        });
    },

    async delete (req, res) {
      //Eliminar
      console.log(req.params.id)
      let id = req.params.id; //Serializamos el id
      try {
        //Busqueda de un objeto especifico por id
        const productos = await Productos.findByPk(id);
        //evaluamos si el objeto trajo algo
        if (!productos) {
          return res.status(404).json({ error: 'Producto no encontrada' });
        }
        //Si pasa este punto
        await productos.destroy();
        return res.json({ message: 'Producto eliminada correctamente' });
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        return res.status(500).json({ error: 'Error al eliminar producto' });
      }
    }
};

