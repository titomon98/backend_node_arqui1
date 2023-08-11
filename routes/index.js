const { Router } = require('express');
const router = Router();

// facturas
const facturasController = require('../controllers/cuenta/facturaControler');
//personas
const personasController = require('../controllers/personas/personaController');

//admin
const adminController = require('../controllers/adminController');
//carro
const carroController = require('../controllers/carro/carroController');
//RUTAS

module.exports = (app) => {
    //facturas
    router.get('/factura/find', facturasController.find);
    router.get('/factura/find/id', facturasController.findById);
    router.get('/factura/find/discount', facturasController.findByDiscount);
    
    //personas
    router.get('/persona/find', personasController.find);

    //carros
    router.get('/carro/find', carroController.find);
    router.post('/carro/create', carroController.create);
    router.put('/carro/update', carroController.update);
    router.delete('/carro/delete/:id', carroController.delete);
    //router.get('/carro/find/id', carroController.findById);
    
    app.use('/', router);

};