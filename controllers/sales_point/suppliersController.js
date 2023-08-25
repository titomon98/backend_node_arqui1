'use strict'
const base = require("../serverResponses")
const db = require("../../models")
const Supplier = db.suppliers

module.exports = {
    findAll (req, res) {
        return Supplier.findAll()
            .then(suppliers =>
                base.dataStatusOk(res, suppliers)
            )
            .catch(error =>
                base.returnBadRequest(res, "Ha ocurrido un error", error)
            )
    },
    findById (req, res) {
        let id = req.body.id
        return Supplier.findByPk(id)
            .then(supplier => {
                if (supplier != null) {
                    base.dataStatusOk(res, supplier)
                } else {
                    base.falseStatusOk(res, "El proveedor solicitado no ha sido encontrado.")
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

        const new_supplier = {
            code: requestData.code,
            name: requestData.name,
            contact_name: requestData.contact_name,
            contact_email: requestData.contact_email,
            contact_phone: requestData.contact_phone,
            status: data_status
        }

        Supplier.create(new_supplier)
            .then(supplier => {
                base.messageStatusOk(res, supplier, "Creación de proveedor realizada con éxito.")
            })
            .catch(error => {
                base.returnBadRequest(res, "Ha ocurrido un error.", error)
            })
    },
    update (req, res) {
        let requestData = req.body
        Supplier.update(
            requestData,
            {
                where: {
                    id: requestData.id
                }
            }
        )
            .then(_ => {
                base.statusOk(res, "Proveedor actualizado exitosamente.")
            })
            .catch(error => {
                base.returnBadRequest(
                    res,
                    "Ha ocurrido un error al tratar de actualizar el proveedor.",
                    error
                )
            })
    },
    async delete (req, res) {
        let id = req.params.id
        try {
            const supplier = await Supplier.findByPk(id)
            if (!supplier) {
                return base.returnNotFound(res, "El proveedor que se desea eliminar no ha sido encontrado.")
            }
            await supplier.destroy()
            return base.statusOk(res, "Proveedor eliminado exitosamente.")
        } catch (error) {
            return base.returnInternalServerError(
                res,
                "Ha ocurrido un error al intentar eliminar el proveedor.",
                error
            )
        }
    }
}