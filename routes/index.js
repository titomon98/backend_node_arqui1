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
    router.post('/tipo_clientes/create', tipo_clientesController.create);
    router.put('/tipo_clientes/update', tipo_clientesController.update);
    //clientes
    router.post('/clientes/create', clientesController.create);
    router.get('/clientes/find', clientesController.find);
    //ventas
    router.get('/ventas/find', ventasController.find);
    router.post('/ventas/createVenta', ventasController.createVenta);
    //Productos
    router.get('/productos/find', productosController.find);
    router.post('/productos/create', productosController.create);
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
    // router.put('/autores/updateName', autoresController.updateName);
    // router.get('/autores/find', autoresController.find);
    // router.delete('/autores/delete/:id', autoresController.delete);
    app.use('/', router);
};