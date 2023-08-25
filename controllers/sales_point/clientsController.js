'use strict'
const base = require("../serverResponses")
const db = require("../../models")
const ClientType = db.clientTypes
const Client = db.clients

module.exports = {
    findAll (req, res) {
        return Client.findAll({
            include: {
                model: ClientType,
                attributes: ['name', 'description', 'discount_percentage']
            }
        })
            .then(clients =>
                base.dataStatusOk(res, clients)
            )
            .catch(error =>
                base.returnBadRequest(res, "Ha ocurrido un error", error)
            )
    },
    findById (req, res) {
        let id = req.body.id
        return Client.findByPk(id, {
            include: {
                model: ClientType,
                attributes: ['name', 'description', 'discount_percentage']
            }
        })
            .then(client => {
                if (client != null) {
                    base.dataStatusOk(res, client)
                } else {
                    base.falseStatusOk(res, "El cliente solicitado no ha sido encontrado.")
                }
            })
            .catch(error =>
                base.returnBadRequest(res, "Ha ocurrido un error.", error)
            )
    },
    create (req, res) {
        let requestData = req.body

        let data_status = true
        if (requestData.status != null) {
            data_status = requestData.status
        }

        const new_client = {
            business_name: requestData.business_name,
            tax_identification: requestData.tax_identification,
            address: requestData.address,
            id_client_type: requestData.id_client_type,
            status: data_status
        }

        Client.create(new_client)
            .then(client => {
                base.messageStatusOk(res, client, "Creación del cliente realizada con éxito.")
            })
            .catch(error => {
                base.returnBadRequest(res, "Ha ocurrido un error.", error)
            })
    },
    update (req, res) {
        let requestData = req.body
        Client.update(
            requestData,
            {
                where: {
                    id: requestData.id
                }
            }
        )
            .then(_ => {
                base.statusOk(res, "Cliente actualizado exitosamente.")
            })
            .catch(error => {
                base.returnBadRequest(
                    res,
                    "Ha ocurrido un error al tratar de actualizar el tipo de cliente.",
                    error
                )
            })
    },
    async delete (req, res) {
        let id = req.params.id
        try {
            const client = await Client.findByPk(id)
            if (!client) {
                return base.returnNotFound(res, "El cliente que se desea eliminar no ha sido encontrado.")
            }
            await client.destroy()
            return base.statusOk(res, "Cliente eliminado exitosamente.")
        } catch (error) {
            return base.returnInternalServerError(
                res,
                "Ha ocurrido un error al intentar eliminar el Cliente.",
                error
            )
        }
    }
}