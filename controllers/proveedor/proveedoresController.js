'use strict'
const Sequelize = require('sequelize'); 
const db = require("../../models");
const PROVEEDOR = db.proveedores;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return PROVEEDOR.findAndCountAll({
            attributes: ['id', 'Nombre_Proveedor', 'Telefono_Proveedor']
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
            Nombre_Proveedor: datos.Nombre_Proveedor,
            Telefono_Proveedor: datos.Telefono_Proveedor,
        };

        PROVEEDOR.create(datos_ingreso)
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
            PROVEEDOR.update(
                { //En crudo
                    Nombre_Proveedor: datos.Nombre_Proveedor,
                    Telefono_Proveedor: datos.Telefono_Proveedor,
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
         let id = req.params.id
         try {
             const proveedor = await PROVEEDOR.findbyPk(id);
                if (!proveedor) {
                    return res.status(400).json({ error: 'No existe el registro' });    
                }
                await proveedor.destroy();
                return res.status(200).json({ message: 'El registro ha sido eliminado' });
            } catch (error) {
                console.error('Error al    eliminar el registro', error);
                return res.status(500).json({ error: 'Error al eliminar el registro' });
            }
        },
        
};
