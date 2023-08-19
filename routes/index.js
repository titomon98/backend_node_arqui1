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
const VentasController = require('../controllers/ventas/ventasController');
const InventarioController = require('../controllers/inventario/inventarioController');
const clientesController = require('../controllers/clientes/clientesController');
const tipoClientesController = require('../controllers/clientes/tipoClientes');
const detalleVentasController = require('../controllers/ventas/detalleVentasController');
const presentacionController = require('../controllers/presentacion/presentacionController');
const medicamentosController = require('../controllers/medicamentos/medicamentosControler');
const detalleMedicacionController = require('../controllers/detalleMedicamento/detalleMedicacionController');
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

    // Rutas para ventas
    router.get('/ventas/find', VentasController.findVentas);
    router.post('/ventas/create', VentasController.create);
    router.put('/ventas/update', VentasController.update);
    router.delete('/ventas/delete/:id', VentasController.delete);

    // rutas para inventario
    router.get('/inventario/find', InventarioController.findInventario);
    router.post('/inventario/create', InventarioController.create);
    router.put('/inventario/update', InventarioController.update);
    router.delete('/inventario/delete/:id', InventarioController.delete);
    
    //rutas para clientes
    router.get('/clientes/find', clientesController.findClientes);
    router.post('/clientes/create', clientesController.create);
    router.put('/clientes/update', clientesController.update);
    router.delete('/clientes/delete/:id', clientesController.delete);   

    //rutas para tipoClientes
    router.get('/tipoCliente/find', tipoClientesController.findTipoClientes);
    router.post('/tipoCliente/create', tipoClientesController.create);
    router.put('/tipoCliente/update', tipoClientesController.update);
    router.delete('/tipoCliente/delete/:id', tipoClientesController.delete);
    
    //rutas para ventas
    router.get('/ventas/find', VentasController.findVentas);
    router.post('/ventas/create', VentasController.create);
    router.put('/ventas/update', VentasController.update);
    router.delete('/ventas/delete/:id', VentasController.delete);

    //rutas para detalleVentas
    router.get('/detalleVentas/find', detalleVentasController.findDetalleVentas);
    router.post('/detalleVentas/create', detalleVentasController.create);
    router.put('/detalleVentas/update', detalleVentasController.update);
    router.delete('/detalleVentas/delete/:id', detalleVentasController.delete);
    

    //rutaas presentacion
    router.get('/presentacion/find', presentacionController.findPresentacion);
    router.post('/presentacion/create', presentacionController.create);
    router.put('/presentacion/update', presentacionController.update);
    router.delete('/presentacion/delete/:id', presentacionController.delete);


    //rutas medicamentos
    router.get('/medicamentos/find', medicamentosController.findMedicamentos);
    router.post('/medicamentos/create', medicamentosController.create);
    router.put('/medicamentos/update', medicamentosController.update);
    router.delete('/medicamentos/delete/:id', medicamentosController.delete);

    //rutas detalleMedicacion
    router.get('/detalleMedicacion/find', detalleMedicacionController.findDetalleMedicacion);
    router.post('/detalleMedicacion/create', detalleMedicacionController.create);
    router.put('/detalleMedicacion/update', detalleMedicacionController.update);
    router.delete('/detalleMedicacion/delete/:id', detalleMedicacionController.delete);


    app.use('/', router);

};