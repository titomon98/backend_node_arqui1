//Controlador de cliente
'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const cliente = require('../../models/Proyecto/cliente/cliente');
const { up } = require('../../migrations/5.3 - clienteMG');
const Cliente = db.cliente;


module.exports = {
    find (req, res) {
        return Cliente.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return Cliente.findByPk(id)
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
            NIT: datos.NIT,
            id_tipocliente: datos.id_tipocliente,
        };

        Cliente.create(datos_ingreso)
        .then(cliente => {
            res.send(cliente);
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
            Cliente.update(
            { //En crudo
                nombre: datos.nombre,
                NIT: datos.NIT,
                id_tipocliente: datos.id_tipocliente,
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

    //delete
    async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
          const cliente = await Cliente.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!cliente) {
            return res.status(404).json({ error: 'Producto no encontrado' });
          }
          //Si pasa este punto
          await cliente.destroy();
          return res.json({ message: 'Cliente eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar CLiente:', error);
          return res.status(500).json({ error: 'Error al eliminar Cliente' });
        }
      }  
};