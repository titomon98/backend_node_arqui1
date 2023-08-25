'use strict'
const encrypt = require("../encryption")
const base = require("../serverResponses")
const db = require("../../models")
const Seller = db.sellers

module.exports = {
    findAll (req, res) {
        return Seller.findAll({
            attributes: ['id', 'code', 'name', 'status']
        })
            .then(sellers =>
                base.dataStatusOk(res, sellers)
            )
            .catch(error =>
                base.returnBadRequest(res, "Ha ocurrido un error", error)
            )
    },
    findById (req, res) {
        let id = req.body.id
        return Seller.findByPk(
            id,
            { attributes: ['id', 'code', 'name', 'status'] }
        )
            .then(seller => {
                if (seller != null) {
                    base.dataStatusOk(res, seller)
                } else {
                    base.falseStatusOk(res, "El vendedor solicitado no ha sido encontrado.")
                }
            })
            .catch(error =>
                base.returnBadRequest(res, "Ha ocurrido un error.", error)
            )
    },
    findByCodeAndPassword (req, res) {
        let requestData = req.body
        return Seller.findOne(
            {
                attributes: ['id', 'code', 'name', 'status']
            },
            {
                where: {
                    code: requestData.code,
                    password: encrypt.encrypt(requestData.password)
                }
            }
        )
            .then(seller => {
                if (seller != null) {
                    base.dataStatusOk(res, seller)
                } else {
                    base.falseStatusOk(res, "Los datos del vendedor son incorrectos.")
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

        const new_seller = {
            code: requestData.code,
            name: requestData.name,
            password: encrypt.encrypt(requestData.password),
            status: data_status
        }

        Seller.create(new_seller)
            .then(seller => {
                seller.password = ""
                base.messageStatusOk(res, seller, "Creación de vendedor realizada con éxito.")
            })
            .catch(error => {
                base.returnBadRequest(res, "Ha ocurrido un error.", error)
            })
    },
    update (req, res) {
        let requestData = req.body
        Seller.update(
            requestData,
            {
                where: {
                    id: requestData.id
                }
            }
        )
            .then(_ => {
                base.statusOk(res, "Vendedor actualizado exitosamente.")
            })
            .catch(error => {
                base.returnBadRequest(
                    res,
                    "Ha ocurrido un error al tratar de actualizar al vendedor.",
                    error
                )
            })
    },
    async delete (req, res) {
        let id = req.params.id
        try {
            const seller = await Seller.findByPk(id)
            if (!seller) {
                return base.returnNotFound(res, "El vendedor que se desea eliminar no ha sido encontrado.")
            }
            await seller.destroy()
            return base.statusOk(res, "Vendedor eliminado exitosamente.")
        } catch (error) {
            return base.returnInternalServerError(
                res,
                "Ha ocurrido un error al intentar eliminar al vendedor.",
                error
            )
        }
    }
}