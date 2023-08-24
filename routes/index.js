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

//inventario
const inventarioController = require('../controllers/inventario/inventarioController');
//tipo cliente
const tipoclienteController = require('../controllers/tipocliente/tipoclienteController');
//proveedor
const proveedorController = require('../controllers/proveedor/proveedorController');
//cliente
const clienteController = require('../controllers/cliente/clienteController');
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

    //inventario
    router.get('/inventario/find', inventarioController.find);

    //tipo cliente
    router.get('/tipocliente/find', tipoclienteController.find);

    //proveedor
    router.get('/proveedor/find', proveedorController.find);

    //cliente
    router.get('/cliente/find', clienteController.find);
    
    app.use('/', router);

    //create productos
    router.post('/productos/create', controladorproductos.create);
    //update productos
    router.put('/productos/update', controladorproductos.update);
    //delete productos
    router.delete('/productos/delete/:id', controladorproductos.delete);

    //create inventario
    router.post('/inventario/create', inventarioController.create);
    //update inventario
    router.put('/inventario/update', inventarioController.update);
    //delete inventario
    router.delete('/inventario/delete/:id', inventarioController.delete);

    //create tipo cliente
    router.post('/tipocliente/create', tipoclienteController.create);
    //update tipo cliente
    router.put('/tipocliente/update', tipoclienteController.update);
    //delete tipo cliente
    router.delete('/tipocliente/delete/:id', tipoclienteController.delete);

    //create proveedor
    router.post('/proveedor/create', proveedorController.create);
    //update proveedor
    router.put('/proveedor/update', proveedorController.update);
    //delete proveedor
    router.delete('/proveedor/delete/:id', proveedorController.delete);

    //create cliente
    router.post('/cliente/create', clienteController.create);
    //update cliente
    router.put('/cliente/update', clienteController.update);
    //delete cliente
    router.delete('/cliente/delete/:id', clienteController.delete);

};
