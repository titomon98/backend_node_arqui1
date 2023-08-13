const { Router } = require('express');
const router = Router();
// facturas
const productosController = require('../controllers/productosController');
// const librosController = require('../controllers/cuenta/librosController');
// const autoresController = require('../controllers/cuenta/autoresController');
//RUTAS
module.exports = (app) => {
    //facturas
    router.get('/productos/find', productosController.find);
    // router.get('/factura/find/id', facturasController.findById);
    // router.get('/factura/find/discount', facturasController.findByDiscount);
    // router.get('/libro/find', librosController.find);
    // router.post('/autores/create', autoresController.create);
    // router.put('/autores/update', autoresController.update);
    // router.put('/autores/updateName', autoresController.updateName);
    // router.get('/autores/find', autoresController.find);
    // router.delete('/autores/delete/:id', autoresController.delete);
    app.use('/', router);
};