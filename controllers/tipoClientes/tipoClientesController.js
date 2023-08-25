'use strict'
const Sequelize = require('sequelize'); 
const db = require("../../models");
const TIPOCLIENTE = db.tipo_clientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return TIPOCLIENTE.findAndCountAll({
            attributes: ['Tipo_Cliente', 'Tipo_Descuento']
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
            Tipo_Cliente: datos.Tipo_Cliente,
            Tipo_Descuento: datos.Tipo_Descuento,
        };

        TIPOCLIENTE.create(datos_ingreso)
        .then(tipo_clientes => {
            res.send(tipo_clientes);
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
        TIPOCLIENTE.update(
            { //En crudo
                Tipo_Cliente: datos.Tipo_Cliente,
                Tipo_Descuento: datos.Tipo_Descuento,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(tipo_clientes => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
        });
    },

    //delete
    //delete
    async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
          const cliente = await TIPOCLIENTE.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!cliente) {
            return res.status(404).json({ error: 'Producto no encontrado' });
          }
          //Si pasa este punto
          await cliente.destroy();
          return res.json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar producto:', error);
          return res.status(500).json({ error: 'Error al eliminar producto' });
        }
    },
};