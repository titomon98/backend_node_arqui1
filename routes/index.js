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

//PROYECTO
const clientecontroller = require('../controllers/proyecto/Clientecontroller');
const detallecontroller = require('../controllers/proyecto/detallecontroller');
const inventariocontroller = require('../controllers/proyecto/inventariocontroller');
const tipocontroller = require('../controllers/proyecto/tipocontroller');
const ventacontroller = require('../controllers/proyecto/ventaController');
const detallecompracontroller = require('../controllers/proyecto/detalle_compracontroller');
const comprascontroller = require('../controllers/proyecto/comprascontroller');
const proveedorescontroller = require('../controllers/proyecto/proveedorescontroller');


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


    //parte del proyecto

    //cliente
    router.get('/cliente/find', clientecontroller.find);
    router.post('/cliente/create', clientecontroller.create);
    router.put('/cliente/update', clientecontroller.update);
    router.delete('/cliente/delete/:id', clientecontroller.delete);

    //detalle
    router.get('/detalle/find', detallecontroller.find);
    router.post('/detalle/create', detallecontroller.create);
    router.put('/detalle/update', detallecontroller.update);
    router.delete('/detalle/delete/:id', detallecontroller.delete);

    //inventario
    router.get('/inventario/find', inventariocontroller.find);
    router.post('/inventario/create', inventariocontroller.create);
    router.put('/inventario/update', inventariocontroller.update);
    router.delete('/inventario/delete/:id', inventariocontroller.delete);

    //tipo
    router.get('/tipo/find', tipocontroller.find);
    router.post('/tipo/create', tipocontroller.create);
    router.put('/tipo/update', tipocontroller.update);
    router.delete('/tipo/delete/:id', tipocontroller.delete);

    //venta
    router.get('/venta/find', ventacontroller.find);
    router.post('/venta/create', ventacontroller.create);
    router.put('/venta/update', ventacontroller.update);
    router.delete('/venta/delete/:id', ventacontroller.delete);

    //detalle compra
    router.get('/detalle_compra/find', detallecompracontroller.find);
    router.post('/detalle_compra/create', detallecompracontroller.create);
    router.put('/detalle_compra/update', detallecompracontroller.update);
    router.delete('/detalle_compra/delete/:id', detallecompracontroller.delete);

    //compras
    router.get('/compras/find', comprascontroller.find);
    router.post('/compras/create', comprascontroller.create);
    router.put('/compras/update', comprascontroller.update);
    router.delete('/compras/delete/:id', comprascontroller.delete);

    //proveedores
    router.get('/proveedores/find', proveedorescontroller.find);
    router.post('/proveedores/create', proveedorescontroller.create);
    router.put('/proveedores/update', proveedorescontroller.update);
    router.delete('/proveedores/delete/:id', proveedorescontroller.delete);


    app.use('/', router);

    

};