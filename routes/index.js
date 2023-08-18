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
    //create
    router.post('/inventario/create', inventarioController.create);
    //update
    router.put('/inventario/update', inventarioController.update);
    //delete
    router.delete('/inventario/delete/:id', inventarioController.delete);
    
    app.use('/', router);

};