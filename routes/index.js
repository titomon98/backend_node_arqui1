const { Router } = require('express');
const router = Router();

// facturas
const facturasController = require('../controllers/cuenta/facturaControler');
//personas
const personasController = require('../controllers/personas/personaController')
const puestoController = require('../controllers/personas/puestoController')
//admin
const adminController = require('../controllers/adminController');
const ligaControler = require('../controllers/ligas/ligaControler');
const equiposController = require('../controllers/equipos/equiposController');
//RUTAS

module.exports = (app) => {
    //facturas
    router.get('/factura/find', facturasController.find);
    router.get('/factura/find/id', facturasController.findById);
    router.get('/factura/find/discount', facturasController.findByDiscount);
    
    //personas
    router.get('/persona/find', personasController.find);

    //puestos
    router.get('/puesto/find', puestoController.findPuestos)

    router.get('/liga/find', ligaControler.find)
    router.get('/liga/find/id', ligaControler.findById);
    router.post('/liga/create', ligaControler.create);
    router.put('/liga/update', ligaControler.update);
    router.delete('/liga/delete/:id', ligaControler.delete);

    router.get('/equipo/find', equiposController.find)
    router.get('/equipo/find/id', equiposController.findById);
    router.post('/equipo/create', equiposController.create);
    router.put('/equipo/update', equiposController.update);
    router.delete('/equipo/delete/:id', equiposController.delete);


    app.use('/', router);

    

};