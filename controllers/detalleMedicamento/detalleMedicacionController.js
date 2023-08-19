'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const DETALLE_MEDICACION = db.detallesMedicaciones;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    findDetalleMedicacion(req, res) {
        return DETALLE_MEDICACION.findAndCountAll({
                attributes: ['id','idPresentacion','idMedicamento','DescripcionMedicamento','Estado']
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
            idPresentacion: datos.idPresentacion,
            idMedicamento: datos.idMedicamento,
            DescripcionMedicamento: datos.DescripcionMedicamento,
            Estado: datos.Estado,
        };

        DETALLE_MEDICACION.create(datos_ingreso)
        .then(detalleMedicacion => {
            res.send(detalleMedicacion);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        })
    },

    //update
    update (req, res) {
        let datos = req.body

        DETALLE_MEDICACION.update(
            {
                idPresentacion: datos.idPresentacion,
                idMedicamento: datos.idMedicamento,
                DescripcionMedicamento: datos.DescripcionMedicamento,
                Estado: datos.Estado,
            },
            {
                where: {
                    id: datos.id
                }
            }
        )
        .then(detalleMedicacion => res.status(200).send('El registro se actualizo correctamente'))
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al actualizar' });
        });
    },

    //delete
    async delete (req, res) {
        console.log(req.body)
        let id = req.body.id
        try {
      const detalleMedicacion = await DETALLE_MEDICACION.findByPk(id);
            if(!detalleMedicacion) {
                return res.status(400).send('No se encontro el registro')   
            }
            await detalleMedicacion.destroy();
            return res.status(200).send('El registro se elimino correctamente')
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: 'Error al eliminar' });
        }
    }
};
