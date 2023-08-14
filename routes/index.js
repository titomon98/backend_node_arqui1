const { Router } = require('express');
const router = Router();
// productos
const productosController = require('../controllers/cuenta/productosController');
//tipo de clientes
const tipo_clientesController = require('../controllers/cuenta/tipo_clientesController')
//clientes
const clientesController = require('../controllers/cuenta/clientesController');
//ventas
const ventasController = require('../controllers/cuenta/ventasController');
//detalle de ventas
const detalle_ventasController = require('../controllers/cuenta/detalle_ventasController');
//RUTAS
module.exports = (app) => {
    //Productos
    router.get('/productos/find', productosController.find);
    router.post('/productos/create', productosController.create);
    //tipo de clientes
    router.get('/tipo_clientes/find', tipo_clientesController.find);
    router.post('/tipo_clientes/create', tipo_clientesController.create);
    router.put('/tipo_clientes/update', tipo_clientesController.update);
    //clientes
    router.post('/clientes/create', clientesController.create);
    router.get('/clientes/find', clientesController.find);
    //ventas
    router.post('/ventas/create', ventasController.create);
    router.get('/ventas/find', ventasController.find);

    //detalle de ventas
    router.post('/detalle_ventas/create', detalle_ventasController.create);
    // router.put('/autores/update', autoresController.update);
    // router.put('/autores/updateName', autoresController.updateName);
    // router.get('/autores/find', autoresController.find);
    // router.delete('/autores/delete/:id', autoresController.delete);
    app.use('/', router);
};