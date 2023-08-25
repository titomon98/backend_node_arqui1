'use strict'
const db = require('../../models')
const base = require("../serverResponses");
const PurchaseHeader = db.purchaseHeaders
const PurchaseDetail = db.purchaseDetails
const Supplier = db.suppliers
const Product = db.products

module.exports = {
    create (req, res) {
        let requestData = req.body

        let iva_val = (requestData.total / 1.12) * 0.12
        const new_purchase_header = {
            authorization: requestData.authorization,
            series: requestData.series,
            dte_number: requestData.dte_number,
            day: requestData.day,
            total: requestData.total,
            iva: iva_val,
            id_supplier: requestData.id_supplier
        }

        PurchaseHeader.create(new_purchase_header)
            .then(purchase => {
                base.messageStatusOk(res, purchase, "Creación de compra realizada con éxito.")
            })
            .catch(error => {
                base.returnBadRequest(res, "Ha ocurrido un error.", error)
            })
    },
    async addProduct (req, res) {
        let requestData = req.body
        try {
            const purchaseHeader = await PurchaseHeader.findByPk(requestData.id_purchase_header)
            const product = await Product.findByPk(requestData.id_product)

            if (!product) {
                base.falseStatusOk(res, "Producto no encontrado.")
            }
            if (!purchaseHeader) {
                base.falseStatusOk(res, "Compra no encontrada.")
            }

            const total_amount = requestData.amount * product.purchase_price
            const iva_val = (total_amount / 1.12) * 0.12

            const new_purchase_detail = {
                amount: requestData.amount,
                total: total_amount,
                iva: iva_val,
                id_product: requestData.id_product,
                id_purchase_header: requestData.id_purchase_header
            }

            const purchaseDetail = await PurchaseDetail.create(new_purchase_detail)
            if (!purchaseDetail) {
                base.falseStatusOk(res, "Ha ocurrido un error al intentar agregar el producto a la compra.")
            }

            Product.update(
                {
                    amount: product.amount + requestData.amount
                },
                {
                    where: {
                        id: product.id
                    }
                }
            )
                .then(_ => {
                    base.statusOk(res, "Producto agregado exitosamente a la compra.")
                })
                .catch(error => {
                    base.falseStatusOk(res, "Ha ocurrido un error al intentar actualizar el producto de la compra.")
                });
        } catch (error) {
            return base.returnInternalServerError(
                res,
                "Ha ocurrido un error al intentar agregar el producto a la compra.",
                error
            )
        }
    }
}
