'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const MEDICAMENTOS = db.medicamentos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    findMedicamentos(req, res) {
        return MEDICAMENTOS.findAndCountAll({
                attributes: ['id','NombreMedicamento','PrecioMedicamento','Cantidad','Estado']  
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
            NombreMedicamento: datos.NombreMedicamento,
            PrecioMedicamento: datos.PrecioMedicamento,
            Cantidad: datos.Cantidad,
            Estado: datos.Estado,
        };

        MEDICAMENTOS.create(datos_ingreso)
        .then(medicamentos => {
            res.send(medicamentos);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        })
    },

    //update
    update (req, res) {
        let datos = req.body
 if (datos.Cantidad > 0) {
        MEDICAMENTOS.update(
            {
                NombreMedicamento: datos.NombreMedicamento,
                PrecioMedicamento: datos.PrecioMedicamento,
                Cantidad: datos.Cantidad,
                Estado: datos.Estado,
            },
            {
                where: {
                    id: datos.id
                }
            }
        )
        .then(medicamentos => res.status(200).send('El registro se actualizo correctamente'))
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al actualizar' });
        });
    } else {
        return res.status(400).send('No se puede actualizar el registro YA QUE NO hay existencia suficiente')
    }
    },  


    //delete
    async delete (req, res) {
        console.log(req.body)
        let id = req.body.id
        try {
            const medicamentos = await MEDICAMENTOS.findByPk(id);   
            if(!medicamentos) { 
                return res.status(400).send('No se encontro el registro')
            }   
            await medicamentos.destroy();
            return res.status(200).send('El registro se elimino correctamente')
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: 'Error al eliminar' });
        }
    }
};