const { Router } = require('express');
const router = Router();

const inventarioController = require('../controllers/Inventarios/inventarioController');
const proveedoresController = require('../controllers/proveedores/proveedoresController');
const tipoclienteController = require('../controllers/TipoCliente/tipoclienteController');
const clientesController = require('../controllers/Clientes/clientesController');
//RUTAS

module.exports = (app) => {

    //INVENTARIOS
    router.get('/inventarios/find', inventarioController.find);
    //Create
    router.post('/inventarios/create', inventarioController.create);
    //Update
    router.put('/inventarios/update', inventarioController.update);
    //Delete
    router.delete('/inventarios/delete/:id', inventarioController.delete);

    //PROVEEDORES
    router.get('/proveedores/find', proveedoresController.find);
    //Create
    router.post('/proveedores/create', proveedoresController.create);
    //Update
    router.put('/proveedores/update', proveedoresController.update);
    //Delete
    router.delete('/proveedores/delete/:id', proveedoresController.delete);

    //TIPOCLIENTES
    router.get('/tipoclientes/find', tipoclienteController.find);
    //Create
    router.post('/tipoclientes/create', tipoclienteController.create);
    //Update
    router.put('/tipoclientes/update', tipoclienteController.update);
    //Delete
    router.delete('/tipoclientes/delete/:id', tipoclienteController.delete);

    //CLIENTES
    router.get('/clientes/find', clientesController.find);
    //Create
    router.post('/clientes/create', clientesController.create);
    //Update
    router.put('/clientes/update', clientesController.update);
    //Delete
    router.delete('/clientes/delete/:id', clientesController.delete);

    app.use('/', router);

};