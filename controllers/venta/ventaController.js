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
const tipocliente = require('../../models/Proyecto/tipocliente/tipocliente');
const Tipocliente = db.tipocliente;

//pausa
