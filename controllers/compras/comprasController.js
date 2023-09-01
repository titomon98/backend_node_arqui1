'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const Compra = db.compras;
const moment = require('moment');

module.exports = {
    async findById(req, res) {
        try {
            let id = req.params.id;
            const compra = await Compra.findByPk(id, {
                include: ["detalles"] 
            });
  
            if (!compra) {
                return res.status(404).json({ error: 'Compra no encontrada' });
            }
  
            return res.status(200).send(compra);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener venta' });
        }
    },

  async create (req, res) {
    //Crear
    //extraer datos de req.body
    let compra = req.body //Serializar los datos


    // calculos extras
    var total = 0;
    compra.detalles.forEach(det => {
      det.subtotal = det.cantidad * det.precioUnidad;        
      total += det.subtotal;
    });
       
    // calculos adicionales
    compra.total = total;
    compra.iva = compra.total * 0.12;
    compra.fecha = new Date();
      
    Compra.create(compra, 
      {
        include: ["detalles"]
      })
    .then(ventas => {
        // todo: aumentar stock

        res.send(ventas);
    })
    .catch(error => {
        console.log(error)
        return res.status(500).json({ error: 'Error al insertar' });
    });
  },


  update (req, res) {
    //Actualizar
    let datos = req.body
      Compra.update(
        { //En crudo
            proveedor: datos.proveedor,
            total: datos.total,
            iva: datos.iva,
            fecha: datos.fecha
        },
        { 
          where: { 
            id: datos.id 
          }
        }
      )
      .then(cliente => res.status(200).send('El registro ha sido actualizado'))
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
      const Compra = await Compra.findByPk(id);
      //evaluamos si el objeto trajo algo
      if (!compras) {
        return res.status(404).json({ error: 'Compras no encontrada' });
      }
      //Si pasa este punto
      await compras.destroy();
      return res.json({ message: 'Compras eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      return res.status(500).json({ error: 'Error al eliminar compras' });
    }
  }
};

