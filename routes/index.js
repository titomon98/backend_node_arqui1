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
const tipoClienteController = require('../controllers/cliente/tipoClienteController');
const clienteController = require('../controllers/cliente/clienteController');
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

    //TipoCliente
    router.get('/cliente/tipo/find',tipoClienteController.find);
    router.post('/cliente/tipo/create', tipoClienteController.create);
    router.put('/cliente/tipo/update2', tipoClienteController.updateOtro);
    router.put('/cliente/tipo/update', tipoClienteController.update);
    router.delete('/cliente/tipo/delete/:id', tipoClienteController.delete);

    //Cliente
    router.post('/cliente/create', clienteController.create);
    router.get('/cliente/find', clienteController.find);
    
    
    app.use('/', router);

};