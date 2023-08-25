'use strict'
const db = require('../../models')
const base = require("../serverResponses");
const {error} = require("sequelize-cli/lib/helpers/view-helper");
const InvoiceHeader = db.invoiceHeaders
const InvoiceDetail = db.invoiceDetails
const ClientType = db.clientTypes
const Client = db.clients
const Product = db.products

module.exports = {
    create (req, res) {
        let requestData = req.body

        const new_invoice_header = {
            authorization: requestData.authorization,
            series: requestData.series,
            dte_number: requestData.dte_number,
            emission_date: new Date(),
            certification_date: new Date(),
            total: 0,
            discount: 0,
            iva: 0,
            id_client: requestData.id_client,
            id_seller: requestData.id_seller
        }

        InvoiceHeader.create(new_invoice_header)
            .then(purchase => {
                base.messageStatusOk(res, purchase, "Creación de venta realizada con éxito.")
            })
            .catch(error => {
                base.returnBadRequest(res, "Ha ocurrido un error.", error)
            })
    },
    async addProduct (req, res) {
        let requestData = req.body
        try {
            let invoiceHeader = await InvoiceHeader.findByPk(
                requestData.id_invoice_header,
                {
                    attributes: ['id', 'total', 'discount', 'iva', 'id_client']
                }
            )
            const product = await Product.findByPk(
                requestData.id_product,
                {
                    attributes: ['id', 'amount', 'sale_price']
                }
            )

            if (!product) {
                base.falseStatusOk(res, "Producto no encontrado.")
            }
            if (!invoiceHeader) {
                base.falseStatusOk(res, "Venta no encontrada.")
            }

            if (product.amount < requestData.amount) {
                base.falseStatusOk(res, "No se cuenta con suficiente producto para realizar la venta.")
            }

            const client = await Client.findByPk(
                invoiceHeader.id_client,
                {
                    include: {
                        model: ClientType,
                        attributes: ['discount_percentage']
                    }
                }
            )

            const total_amount =  requestData.amount * product.sale_price
            const discount_amount = (total_amount * client.clientType.discount_percentage) / 100
            const iva_val = ((total_amount - discount_amount) / 1.12) * 0.12

            const new_invoice_detail = {
                amount: requestData.amount,
                unit_price: product.sale_price,
                discount: discount_amount,
                total: total_amount,
                iva: iva_val,
                id_product: requestData.id_product,
                id_invoice_header: requestData.id_invoice_header
            }

            const invoiceDetail = await InvoiceDetail.create(new_invoice_detail)
            if (!invoiceDetail) {
                base.falseStatusOk(res, "Ha ocurrido un error al intentar agregar el producto a la venta.")
            }

            invoiceHeader = await InvoiceHeader.update(
                {
                    total: invoiceHeader.total + total_amount,
                    discount: invoiceHeader.discount + discount_amount,
                    iva: invoiceHeader.iva + iva_val
                },
                {
                    where: {
                        id: invoiceHeader.id
                    }
                }
            )
            if (!invoiceHeader) {
                base.falseStatusOk(res, "Ha ocurrido un error al intentar actualizar la venta.")
            }

            Product.update(
                {
                    amount: product.amount - requestData.amount
                },
                {
                    where: {
                        id: product.id
                    }
                }
            )
                .then(_ => {
                    base.messageStatusOk(res, invoiceHeader, "Producto agregado exitosamente a la venta.")
                })
                .catch(error => {
                    console.log(error)
                    base.falseStatusOk(res, "Ha ocurrido un error al intentar actualizar el producto de la venta.")
                });
        } catch (error) {
            return base.returnInternalServerError(
                res,
                "Ha ocurrido un error al intentar agregar el producto a la venta.",
                error
            )
        }
    }
}