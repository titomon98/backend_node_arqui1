'use strict'
const base = require("../serverResponses")
const db = require("../../models")
const ClientType = db.clientTypes

module.exports = {
    findAll (req, res) {
        return ClientType.findAll()
            .then(clientTypes =>
                base.dataStatusOk(res, clientTypes)
            )
            .catch(error =>
                base.returnBadRequest(res, "Ha ocurrido un error", error)
            )
    },
    findById (req, res) {
        let id = req.body.id
        return ClientType.findByPk(id)
            .then(clientType => {
                if (clientType != null) {
                    base.dataStatusOk(res, clientType)
                } else {
                    base.falseStatusOk(res, "El tipo de cliente solicitado no ha sido encontrado.")
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

        const new_client_type = {
            name: requestData.name,
            description: requestData.description,
            discount_percentage: requestData.discount_percentage,
            status: data_status
        }

        ClientType.create(new_client_type)
            .then(clientType => {
                base.messageStatusOk(res, clientType, "Creación de tipo de cliente realizada con éxito.")
            })
            .catch(error => {
                base.returnBadRequest(res, "Ha ocurrido un error.", error)
            })
    },
    update (req, res) {
        let requestData = req.body
        ClientType.update(
            requestData,
            {
                where: {
                    id: requestData.id
                }
            }
        )
            .then(_ => {
                base.statusOk(res, "Tipo de cliente actualizado exitosamente.")
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
            const client_type = await ClientType.findByPk(id)
            if (!client_type) {
                return base.returnNotFound(res, "El tipo de cliente que se desea eliminar no ha sido encontrado.")
            }
            await client_type.destroy()
            return base.statusOk(res, "Tipo de cliente eliminado exitosamente.")
        } catch (error) {
            return base.returnInternalServerError(
                res,
                "Ha ocurrido un error al intentar eliminar el tipo de cliente.",
                error
            )
        }
    }
}