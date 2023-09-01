const { Router } = require('express');
const router = Router();

//Cliente
const clientesController = require('../controllers/clientes/clientesController');
//Venta
const ventasController = require('../controllers/ventas/ventasController');
//Compras
const comprasController = require('../controllers/compras/comprasController');
//Producto
const productosController = require('../controllers/productos/productosController');


//RUTAS
module.exports = (app) => {

    //Clientes
    router.post('/cliente/create', clientesController.create);
    router.put('/cliente/update', clientesController.update);
    router.delete('/cliente/delete/:id', clientesController.delete);
    router.get('/cliente/find/:id', clientesController.findById);
    
    //Ventas
    router.post('/venta/create', ventasController.create);
    router.put('/venta/update', ventasController.update);
    router.delete('/venta/delete/:id', ventasController.delete);
    router.get('/venta/find/:id', ventasController.findById);

    //Compras
    
    router.post('/compras/create', comprasController.create);
    router.put('/venta/update', ventasController.update);
    router.delete('/venta/delete/:id', ventasController.delete);
    router.get('/compras/find/:id', comprasController.findById);

    //Productos
    router.post('/producto/create', productosController.create);
    router.put('/producto/update', productosController.update);
    router.delete('/producto/delete/:id', productosController.delete);
    router.get('/producto/find/:id', productosController.findById);

    app.use('/', router);
};