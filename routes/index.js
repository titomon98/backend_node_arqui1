const { Router } = require('express');
const router = Router();
// productos
const productosController = require('../controllers/cuenta/productosController');
// const librosController = require('../controllers/cuenta/librosController');
// const autoresController = require('../controllers/cuenta/autoresController');
//RUTAS
module.exports = (app) => {
    //Productos
    router.get('/productos/find', productosController.find);
    router.post('/productos/create', productosController.create);
    // router.put('/autores/update', autoresController.update);
    // router.put('/autores/updateName', autoresController.updateName);
    // router.get('/autores/find', autoresController.find);
    // router.delete('/autores/delete/:id', autoresController.delete);
    app.use('/', router);
};