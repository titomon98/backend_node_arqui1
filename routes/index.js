const { Router } = require('express');
const router = Router();

// facturas
const facturasController = require('../controllers/cuenta/facturaControler');
//personas
const personasController = require('../controllers/personas/personaController')
//admin
const adminController = require('../controllers/adminController');
const carroscontroller = require('../controllers/carros/carroscontroller');
const inventarioController = require('../controllers/inventario/inventarioController');
const clienteController = require('../controllers/cliente/clienteController');
//RUTAS

module.exports = (app) => {
    //facturas
    router.get('/factura/find', facturasController.find);
    router.get('/factura/find/id', facturasController.findById);
    router.get('/factura/find/discount', facturasController.findByDiscount);
    
    //personas
    router.get('/persona/find', personasController.find);
    router.get('/carros/find', carroscontroller.find);
    router.get('/carros/find/id', carroscontroller.findById);

    //create
    router.post('/carros/create', carroscontroller.create);
    //update
    router.put('/carros/update', carroscontroller.update);
    //delete
    router.delete('/carros/delete/:id', carroscontroller.delete);

    //inventario
    //find
    router.get('/inventario/find', inventarioController.find);
    //create
    router.post('/inventario/create', inventarioController.create);
    //update
    router.put('/inventario/update', inventarioController.update);
    //delete
    router.delete('/inventario/delete/:id', inventarioController.delete);

    //cliente
    //find
    router.get('/cliente/find', clienteController.find);
    //create
    router.post('/cliente/create', clienteController.create);
    //update
    router.put('/cliente/update', clienteController.update);
    //delete
    router.delete('/cliente/delete/:id', clienteController.delete);
    
    app.use('/', router);

};