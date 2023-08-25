//Controlador de venta
'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const venta = require('../../models/Proyecto/venta/venta');
const Venta = db.venta;
const inventario = require('../../models/Proyecto/inventario/inventario');
const Inventario = db.inventario;
const cliente = require('../../models/Proyecto/cliente/cliente');
const Cliente = db.cliente;
const tipocliente = require('../../models/Proyecto/cliente/tipocliente');
const Tipocliente = db.tipocliente;
const detalle = require('../../models/Proyecto/detalle/detalle');
const Detalle = db.detalle;

module.exports = {
    //buscar todos los registros
    find (req, res) {
        return Venta.findAll()
        .then(venta => res.status(200).send(venta))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return Venta.findByPk(id)
        .then(venta => res.status(200).send(venta))
        .catch(error => res.status(400).send(error))
    }, //Consulta por medio de una llave primaria

    //create de una venta
    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            id_cliente: datos.id_cliente,
            fechaVenta: new Date(),
            TotalVenta: 0,
            IVA: 0,
            descuento: 0,
        }
        Venta.create(datos_ingreso)
        .then(venta => {
            res.send(venta);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },
    //add de un detalle
    async update (req, res) {
        let datos = req.body
        try{
            const inventario = await Inventario.findByPk(datos.id_inventario)
            const venta = await Venta.findByPk(datos.id_venta,{
                attributes: ['TotalVenta', 'IVA', 'descuento', 'id_cliente']
            })
            if(!inventario||!venta){
                return res.status(404).send('Transaccion invalida')
            }
            //validar si hay suficiente producto
            if(inventario.cantidad < datos.cantidad){
                return res.status(404).send('No hay suficiente producto')
            }
            const cliente = await Cliente.findByPk(venta.id_cliente)
            const tipocliente = await Tipocliente.findByPk(cliente.id_tipocliente)
            const detalle = {   
                cantidad: datos.cantidad,
                subtotal: datos.cantidad * inventario.precio,
                id_inventario: datos.id_inventario,
                id_venta: datos.id_venta,
            }
            Detalle.create(detalle)
            .then(detalle => {
                Inventario.update(
                    {
                        cantidad: inventario.cantidad - datos.cantidad
                    },
                    {
                        where: {
                            id: datos.id_inventario
                        }
                    }
                )
                .then(inventario => {
                    let nuevoTotal = venta.TotalVenta + detalle.subtotal
                    let descuento = (nuevoTotal * (tipocliente.descuento / 100))
                    //console.log(cliente)
                    //console.log(cliente.tipocliente)
                    //console.log(descuento)
                    Venta.update(
                        {
                            TotalVenta: nuevoTotal,
                            IVA: (nuevoTotal / 1.12) * 0.12,
                            descuento: descuento,
                        },
                        {
                            where: {
                                id: datos.id_venta
                            }
                        }
                    )
                    .then(venta => {
                        return res.status(200).send('El registro ha sido actualizado')
                    })
                    .catch(error => {
                        console.log(error)
                        return res.status(500).json({ error: 'Error al actualizar' });
                    });
                })
                .catch(error => {
                    console.log(error)
                    return res.status(500).json({ error: 'Error al actualizar' });
                });
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al insertar' });
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Error al agregar producto' });
        }
    },
};
