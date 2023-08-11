const { Router } = require('express');
const router = Router();

// facturas
const facturasController = require('../controllers/cuenta/facturaControler');
//personas
const personasController = require('../controllers/personas/personaController')
const puestoController = require('../controllers/personas/puestoController')
//admin
const adminController = require('../controllers/adminController')
//RUTAS

module.exports = (app) => {
    //facturas
    router.get('/factura/find', facturasController.find);
    router.get('/factura/find/id', facturasController.findById);
    router.get('/factura/find/discount', facturasController.findByDiscount);
    router.post('/factura/create', facturasController.create);
    router.put('/factura/update', facturasController.update);
    router.delete('/factura/delete/:id', facturasController.delete);
    
    //personas
    router.get('/persona/find', personasController.find);

    //puestos
    router.get('/puesto/find', puestoController.findPuestos)
    
    app.use('/', router);

    //hola

};