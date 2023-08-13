const { Router } = require('express');
const router = Router();
// productos
const productosController = require('../controllers/cuenta/productosController');
//tipo de clientes
const tipo_clientesController = require('../controllers/cuenta/tipo_clientesController')
//clientes
const clientesController = require('../controllers/cuenta/clientesController')
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


    // router.put('/autores/update', autoresController.update);
    // router.put('/autores/updateName', autoresController.updateName);
    // router.get('/autores/find', autoresController.find);
    // router.delete('/autores/delete/:id', autoresController.delete);
    app.use('/', router);
};