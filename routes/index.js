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
const InventarioController = require('../controllers/Inventario/InventarioController');
const clientesController = require('../controllers/cliente/clientesController');


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
    
    //crear inventario
    router.get('/inventario/find', InventarioController.find);
    router.post('/inventario/create', InventarioController.create);
    //update inventario
    router.put('/inventario/update', InventarioController.update);
    //delete inventario
    router.delete('/inventario/delete/:id', InventarioController.delete)

    //crear cliente
    router.get('/cliente/find', clientesController.find);
    router.post('/cliente/create', clientesController.create);
    //update cliente
    router.put('/cliente/update', clientesController.update);
    //delete cliente
    router.delete('/cliente/delete/:id', clientesController.delete)
    app.use('/', router);

};