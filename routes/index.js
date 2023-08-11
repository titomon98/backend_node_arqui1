const { Router } = require('express');
const router = Router();

// facturas
const facturasController = require('../controllers/cuenta/facturaControler');
//personas
const personasController = require('../controllers/personas/personaController')
//admin
const adminController = require('../controllers/adminController');
const controladorproductos = require('../controllers/productos/controladorproductos');
const tiendacontroller = require('../controllers/tienda/tiendacontroller');
//RUTAS

module.exports = (app) => {
    //facturas
    router.get('/factura/find', facturasController.find);
    router.get('/factura/find/id', facturasController.findById);
    router.get('/factura/find/discount', facturasController.findByDiscount);
    
    //personas
    router.get('/persona/find', personasController.find);

    //productos
    router.get('/productos/find', controladorproductos.find);
    router.get('/productos/find/id', controladorproductos.findById);

    //tienda
    router.get('/tienda/find', tiendacontroller.findTienda);
    
    app.use('/', router);

    //create productos
    router.post('/productos/create', controladorproductos.create);
    //update productos
    router.put('/productos/update', controladorproductos.update);
    //delete productos
    router.delete('/productos/delete/:id', controladorproductos.delete);

};
