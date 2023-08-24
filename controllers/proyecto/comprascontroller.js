'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Compras = db.compras;
const Proveedores = db.proveedores;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Compras.findAll(
          {
            include: {
              model: Proveedores,
              attibutes: ['nombre', 'apellido', 'telefono', 'direccion', 'email']
            }
          }
        )
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        let montoIVA = datos.total * 0.12;
        const datos_ingreso = { //Objeto

            //falta agregar la relacion entre tablas
            proveedor_id: datos.proveedor_id,
            nombre: datos.nombre,
            fecha_compra: datos.fechacompra,
            total: datos.total,
            monto_IVA: montoIVA,
        };

        Compras.create(datos_ingreso)
        .then(compras => {
            res.send(compras);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },


    update (req, res) {
        //Actualizar
        let datos = req.body
          Compras.update(
            { //En crudo
              //falta agregar la relacion entre tablas
              proveedor_id: datos.proveedor_id,
                fecha_compra: datos.fechacompra,
                total_compra: 150,
                monto_IVA: 15,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(compras => res.status(200).send('El registro ha sido actualizado'))
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
          const compras = await Compras.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!compras) {
            return res.status(404).json({ error: 'Compras no encontrado' });
          }
          //Si pasa este punto
          await compras.destroy();
          return res.json({ message: 'Compras eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar equipo:', error);
          return res.status(500).json({ error: 'Error al eliminar equipo' });
        }
    },
};