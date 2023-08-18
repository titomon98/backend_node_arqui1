const { Router } = require('express');
const router = Router();

const clientesController = require('../controllers/clientesController');
const productosController = require('../controllers/productosController');
const ventasController = require('../controllers/ventasController');
const comprasController = require('../controllers/comprasController');

//RUTAS

module.exports = (app) => {

    //Tipos de Clientes y Clientes
    router.get('/tipoClientes/find', clientesController.findTipo);
    router.get('/tipoClientes/find/id', clientesController.findByIdTipo);
    router.get('/clientes/find', clientesController.find);
    router.get('/clientes/find/id', clientesController.findById);
    router.post('/tipoClientes/create', clientesController.createTipo);
    router.post('/clientes/create', clientesController.create);
    router.put('/clientes/update', clientesController.update);
    router.put('/clientes/updateTipo', clientesController.updateTipo);

    //Productos
    router.get('/productos/find', productosController.find);
    router.get('/productos/find/id', productosController.findById);
    router.post('/productos/create', productosController.create);
    router.put('/productos/update', productosController.updateProducto);

    //Ventas y detalles ventas
    router.get('/ventas/find', ventasController.find);
    router.get('/ventas/find/id', ventasController.findById);
    router.get('/ventasDetalles/find', ventasController.findDetalle);
    router.get('/ventasDetalles/find/id', ventasController.findByIdDetalle);
    router.get('/ventaFinal/find/id', ventasController.findVenta);
    router.post('/ventas/create', ventasController.createVenta);
    router.post('/ventas/createDetalle', ventasController.createDetalleVenta);

    //Compras y detalles compras
    router.get('/compras/find', comprasController.find);
    router.get('/compras/find/id', comprasController.findById);
    router.get('/comprasDetalles/find', comprasController.findDetalle);
    router.get('/compraFinal/find/id', comprasController.findCompra);
    router.post('/compras/create', comprasController.createCompra);
    router.post('/compras/createDetalle', comprasController.createDetalleCompra);

    app.use('/', router);
};