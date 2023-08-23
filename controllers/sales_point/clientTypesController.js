'use strict';
const db = require("../../models");
const ClientType = db.clientTypes;

module.exports = {
    findById (req, res) {
        let id = req.body.id
        return ClientType.findByPk(id)
            .then(clientType => res.status(200).send(clientType))
            .catch(error => res.status(400).send(error))
    },
    create (req, res) {
        let requestData = req.body
        const new_client_type = {
            name: requestData.name,
            description: requestData.description,
            discount_percentage: requestData.discount_percentage,
            status: 1
        };

        ClientType.create(new_client_type)
            .then(clientType => {
                res.send(clientType)
            })
            .catch(_ => {
                return res.status(500).json({
                    error: 'Error al insertar'
                });
            });
    },
    update (req, res) {
        let requestData = req.body
        const update_client_type = {
            name: requestData.name,
            description: requestData.description,
            discount_percentage: requestData.discount_percentage,
            status: requestData.status
        }

        ClientType.update(
            update_client_type,
            {
                where: {
                    id: requestData.id
                }
            }
        )
            .then(_ => {
                res.status(200).send('El registro ha sido actualizado')
            })
            .catch(_ => {
                return res.status(500).json({
                    error: 'Error al insertar'
                });
            });
    },
    async delete (req, res) {
        let id = req.params.id;
        try {
            const client_type = await ClientType.findByPk(id);
            if (!client_type) {
                return res.status(404).json({ error: 'Tipo de cliente no encontrado' });
            }
            await client_type.destroy();
            return res.json({ message: 'Tipo de cliente eliminado correctamente' });
        } catch (error) {
            return res.status(500).json({ error: 'Error al eliminar la cadena' });
        }
    }
};