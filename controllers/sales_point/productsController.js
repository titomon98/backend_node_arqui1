'use strict'
const base = require("../serverResponses")
const db = require("../../models")
const Product = db.products

module.exports = {
    findAll (req, res) {
        return Product.findAll()
            .then(products =>
                base.dataStatusOk(res, products)
            )
            .catch(error =>
                base.returnBadRequest(res, "Ha ocurrido un error.", error)
            )
    },
    findById (req, res) {
        let id = req.body.id
        return Product.findByPk(id)
            .then(product => {
                if (product != null) {
                    base.dataStatusOk(res, product)
                } else {
                    base.falseStatusOk(res, "El producto solicitado no ha sido encontrado.")
                }
            })
            .catch(error =>
                base.returnBadRequest(res, "Ha ocurrido un error.", error)
            )
    },
    create (req, res) {
        let requestData = req.body

        let data_amount = 0
        if (requestData.amount != null) {
            data_amount = requestData.amount
        }

        let data_status = true
        if (requestData.status != null) {
            data_status = req.status
        }
        const new_product = {
            code: requestData.code,
            name: requestData.name,
            purchase_price: requestData.purchase_price,
            sale_price: requestData.sale_price,
            amount: data_amount,
            status: data_status
        }

        Product.create(new_product)
            .then(product =>
                base.messageStatusOk(res, product, "Creación de producto realizada con éxito.")
            )
            .catch(error => {
                base.returnBadRequest(res, "Ha ocurrido un error.", error)
            })
    },
    update (req, res) {
        let requestData = req.body
        Product.update(
            requestData,
            {
                where: {
                    id: requestData.id
                }
            }
        )
            .then(_ => {
                base.statusOk(res, "Producto actualizado exitosamente.")
            })
            .catch(error => {
                base.returnBadRequest(
                    res,
                    "Ha ocurrido un error al tratar de actualizar el producto.",
                    error
                )
            })
    },
    async delete (req, res) {
        let id = req.params.id
        try {
            const product = await Product.findByPk(id)
            if (!product) {
                return base.returnNotFound(res, "El producto que se desea eliminar no ha sido econtrado.")
            }
            await product.destroy()
            return base.statusOk(res, "Producto eliminado exitosamente.")
        } catch (error) {
            return base.returnInternalServerError(
                res,
                "Ha ocurrido un error al intentar eliminar el producto.",
                error
            )
        }
    }
}