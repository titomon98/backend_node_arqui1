const { Router } = require('express');
const router = Router();

const clientesController = require('../controllers/clientesController');
const productosController = require('../controllers/productosController');
const ventasController = require('../controllers/ventasController');

//RUTAS

module.exports = (app) => {

    //Tipos de Clientes y Clientes
    router.get('/tipoClientes/find', clientesController.findTipo);
    router.get('/tipoClientes/find/id', clientesController.findByIdTipo);
    router.get('/clientes/find', clientesController.find);
    router.get('/clientes/find/id', clientesController.findById);
    router.post('/tipoClientes/create', clientesController.createTipo);
    router.post('/clientes/create', clientesController.create);

    //Productos
    router.get('/productos/find', productosController.find);
    router.get('/productos/find/id', productosController.findById);
    router.post('/productos/create', productosController.create);

    //Ventas y detalles ventas
    router.get('/ventas/find', ventasController.find);
    router.get('/ventas/find/id', ventasController.findById);
    router.get('/ventasDetalles/find', ventasController.findDetalle);
    router.get('/ventasDetalles/find/id', ventasController.findByIdDetalle);
    router.post('/ventas/create', ventasController.createVenta);
    router.post('/ventas/createDetalle', ventasController.createDetalleVenta);


    app.use('/', router);
};