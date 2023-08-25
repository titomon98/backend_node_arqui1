const { Router } = require('express');
const router = Router();
//tipo de clientes
const tipo_clientesController = require('../controllers/cuenta/01-tipo_clientesController');
//clientes
const clientesController = require('../controllers/cuenta/02-clientesController');
//ventas
const ventasController = require('../controllers/cuenta/03-ventasController');
// productos
const productosController = require('../controllers/cuenta/04-productosController');
//detalle de ventas
const detalle_ventasController = require('../controllers/cuenta/05-detalle_ventasController');
//proveedores
const proveedoresController = require('../controllers/cuenta/06-proveedoresController')
//compras
const comprasController = require('../controllers/cuenta/07-comprasController');
//detalle de compras
const detalle_comprasController = require('../controllers/cuenta/08-detalles_comprasController');
//RUTAS
module.exports = (app) => {
    //tipo de clientes
    router.get('/tipo_clientes/find', tipo_clientesController.find);
    router.get('/tipo_clientes/findId/:id',tipo_clientesController.findId)
    router.post('/tipo_clientes/create', tipo_clientesController.create);
    router.put('/tipo_clientes/update', tipo_clientesController.update);
    //clientes
    router.post('/clientes/create', clientesController.create);
    router.get('/clientes/find', clientesController.find);
    router.get('/clientes/findId/:id',clientesController.findId)
    router.delete('/clientes/delete/:id', clientesController.delete);
    router.put('/clientes/update',clientesController.update);
    //ventas
    router.get('/ventas/find', ventasController.find);
    router.get('/ventas/findId/:id',ventasController.findId);
    router.post('/ventas/createVenta', ventasController.createVenta);
    //Productos
    router.get('/productos/find', productosController.find);
    router.get('/productos/findID/:id',productosController.findID);
    router.post('/productos/create', productosController.create);
    router.put('/productos/update',productosController.update);
    router.delete('/productos/delete/:id',productosController.delete);
    //detalle de ventas
    router.post('/detalle_ventas/create', detalle_ventasController.create);
    router.get('/detalle_ventas/find', detalle_ventasController.find);
    //proveedores
    router.get('/proveedores/find',proveedoresController.find);
    router.post('/proveedores/create',proveedoresController.create);
    router.put('/proveedores/update',proveedoresController.update);
    router.delete('/proveedores/delete/:id', proveedoresController.delete);
    //compras
    router.get('/compras/find', comprasController.find);
    router.post('/compras/createCompra',comprasController.createCompra);
    //detalle compras
    router.get('/detalle_compras/find',detalle_comprasController.find);
    router.post('/detalle_compras/create',detalle_comprasController.create);
    app.use('/', router);
};