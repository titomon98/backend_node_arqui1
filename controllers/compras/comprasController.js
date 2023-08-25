'use stric'
const Sequelize = require('sequelize');
const db = require("../../models");
const COMPRAS = db.compras;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return COMPRAS.findAndCountAll({
            attributes: ['id', 'Fecha_Compra', 'IVA_Compra']
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
            Fecha_Compra: datos.Fecha_Compra,
            IVA_Compra: datos.IVA_Compra,
        };

        COMPRAS.create(datos_ingreso)
        .then(compra => {
            res.send(compra);
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
        COMPRAS.update(
            { //En crudo
                Fecha_Compra: datos.Fecha_Compra,
                IVA_Compra: datos.IVA_Compra,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(compra => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
        });
    },

    //delete
    async delete(req, res) {
        console.log(req.params.id)
        let id = req.params.id
        try {
            const compra = await COMPRAS.findbyPk(id);
            if (!compra) {
                return res.status(400).send('No se ha encontrado el registro')
            }
            await compra.destroy();
            return res.status(200).send('El registro ha sido eliminado')
        } catch (error) {
            console.log('Error al eliminar el registro')    
            return res.status(500).send('Error al eliminar el registro')    
        }
    },
};