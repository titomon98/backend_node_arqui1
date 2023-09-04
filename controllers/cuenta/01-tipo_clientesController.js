'use strict'
const db = require("../../models");
const Tipo_Clientes = db.tipo_clientes;

module.exports = {
    find(req, res) {
        return Tipo_Clientes.findAll({

        })
            .then(cuenta => res.status(200).send(cuenta))
            .catch(error => res.status(400).send(error))
    },
    findId(req, res) {
        const ID = req.params.id; // Obtén el ID del registro a buscar
        Tipo_Clientes.findByPk(ID)
            .then(tipo_clientes => {
                if (!tipo_clientes) {
                    return res.status(200).send({ error: 'Tipo de cliente no encontrado' });
                }
                else {
                    return res.status(200).send(tipo_clientes);
                }
            })
            .catch(error => res.status(400).send({ error: 'Error al realizar la consulta' }));
    }
    ,
    findById(req, res) {
        let id = req.params.id
        return Tipo_Clientes.findByPk(id)
            .then(tipo_clientes => res.status(200).send(tipo_clientes))
            .catch(tipo_clientes => res.status(400).send(error))
    },
    create(req, res) {
        let datos = req.body
        const datos_ingreso = {
            nombre: datos.nombre,
            descuento: datos.descuento
        };
        Tipo_Clientes.create(datos_ingreso)
            .then(tipo_clientes => {
                res.send(tipo_clientes);
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al insertar' });
            });
    },
    update(req, res) {
        let datos = req.body
        Tipo_Clientes.update(
            {
                nombre: datos.nombre,
                descuento: datos.descuento
            },{ where: { id: datos.id }}
        )
            .then(tipo_clientes => {
                if (tipo_clientes[0] === 0) {
                    return res.status(200).send({error: 'No se encontró ningún registro para actualizar'});
                }
                return res.status(200).send('El registro ha sido actualizado');
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al actualizar' });
            });
    },   
    async delete(req, res) {
        let id = req.params.id;
        try {
            const tipo_clientes = await Tipo_Clientes.findByPk(id);
            if (!tipo_clientes) {
                return res.status(200).send({ error: 'Tipo de cliente no encontrada' });
            }
            await tipo_clientes.destroy();
            return res.status(200).send({ message: 'Tipo de clientes eliminada correctamente' });
        } catch (error) {
            console.error('Error al eliminar el tipo de cliente:', error);
            return res.status(500).send({ error: 'Error al eliminar el tipo de clientes' });
        }
    }
};