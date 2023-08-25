const { Router } = require('express');
const router = Router();

// facturas
const facturasController = require('../controllers/cuenta/facturaControler');
//personas
const personasController = require('../controllers/personas/personaController')
//admin
const adminController = require('../controllers/adminController');
const comidaController = require('../controllers/comida/comidaController');
const ingreController = require('../controllers/ingredientes/ingreController');
const tipo_clientesController = require('../controllers/tipoClientes/tipoClientesController');
const proveedoresController = require('../controllers/proveedor/proveedoresController');
const comprasController = require('../controllers/compras/comprasController');
const inventariosController = require('../controllers/inventario/inventariosController');
const ventasController = require('../controllers/ventas/ventasController');
//'../controllers/comida/comidaController' - en este caso comida es el nombre de la carpeta de los controladores o el cotrolador a usar

//RUTAS

module.exports = (app) => {
    //facturas
    router.get('/factura/find', facturasController.find);
    router.get('/factura/find/id', facturasController.findById);
    router.get('/factura/find/discount', facturasController.findByDiscount);
    
    //personas
    router.get('/persona/find', personasController.find);
    
    router.get('/comida/find', comidaController.find);
    router.get('/comida/find/id', comidaController.findById);
 //'/comida/find/id' - comida es un nombre cualquiera en este caso no importa el nomnbre que se coloque

    router.get('/ingredientes/find', ingreController.findIngredi);

    //create productos
    router.post('/comida/create', comidaController.create);
    //update productos
    router.put('/comida/update', comidaController.update);
    //delete productos
    router.delete('/comida/delete/:id', comidaController.delete)
    
    //tipo clientes
    router.get('/tipo_clientes/find', tipo_clientesController.find);
    router.post('/tipo_clientes/create', tipo_clientesController.create);
    router.put('/tipo_clientes/update', tipo_clientesController.update);
    router.delete('/tipo_clientes/delete/:id', tipo_clientesController.delete);

    //proveedores
    router.get('/proveedores/find', proveedoresController.find);
    router.post('/proveedores/create', proveedoresController.create);
    router.put('/proveedores/update', proveedoresController.update);
    router.delete('/proveedores/delete/:id', proveedoresController.delete);

    //compras
    router.get('/compras/find', comprasController.find);
    router.post('/compras/create', comprasController.create);
    router.put('/compras/update', comprasController.update);
    router.delete('/compras/delete/:id', comprasController.delete);

    //inventario
    router.get('/inventario/find', inventariosController.find);
    router.post('/inventario/create', inventariosController.create);
    router.put('/inventario/update', inventariosController.update);
    router.delete('/inventario/delete/:id', inventariosController.delete);


    //ventas
    router.get('/ventas/find', ventasController.find);
    router.post('/ventas/create', ventasController.create);

    app.use('/', router);

};