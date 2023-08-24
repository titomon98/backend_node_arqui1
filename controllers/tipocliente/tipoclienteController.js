//Controlador de Tipo de Cliente
'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const tipocliente = require('../../models/Proyecto/cliente/tipocliente');
const TipoCliente = db.tipocliente;

module.exports = {
    find (req, res) {
        return TipoCliente.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return TipoCliente.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    }, //Consulta por medio de una llave primaria

    //create    
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            tipofrecuencia: datos.tipofrecuencia,
        };

        TipoCliente.create(datos_ingreso)
        .then(tipocliente => {
            res.send(tipocliente);
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
          TipoCliente.update(
            { //En crudo
                tipofrecuencia: datos.tipofrecuencia,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(tipocliente => res.status(200).send('El registro ha sido actualizado'))
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
          const tipocliente = await TipoCliente.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!tipocliente) {
            return res.status(404).json({ error: 'Tipo de Cliente no encontrado' });
          }
          //Si pasa este punto
          await tipocliente.destroy();
          return res.json({ message: 'Tipo de Cliente eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar Tipo de Cliente:', error);
          return res.status(500).json({ error: 'Error al eliminar Tipo de Cliente' });
        }
      }
};
