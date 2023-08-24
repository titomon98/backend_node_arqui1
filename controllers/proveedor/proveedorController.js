//Controlador de proveedor
'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const proveedor = require('../../models/Proyecto/compra/proveedor');
const Proveedor = db.proveedor;

module.exports = {
    find (req, res) {
        return Proveedor.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return Proveedor.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    }, //Consulta por medio de una llave primaria

    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            estado: datos.estado,
        };

        Proveedor.create(datos_ingreso)
        .then(proveedor => {
            res.send(proveedor);
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
            Proveedor.update(
            { //En crudo
                nombre: datos.nombre,
                estado: datos.estado,
            },
            {
                where: {
                    id: datos.id
                }
            }
            )
            .then(proveedor => res.status(200).send('El registro ha sido actualizado'))
            .catch(error => { 
                console.log(error)
                return res.status(500).json({ error: 'Error al actualizar' });
            });
    },

    //delete
    async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
          const proveedor = await Proveedor.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!proveedor) {
            return res.status(404).json({ error: 'Producto no encontrado' });
          }
          //Si pasa este punto
          await proveedor.destroy();
          return res.json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar producto:', error);
          return res.status(500).json({ error: 'Error al eliminar producto' });
        }
      }
};