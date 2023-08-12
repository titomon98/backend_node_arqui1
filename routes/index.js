const { Router } = require('express');
const router = Router();

const librosController = require('../controllers/librosController');
const editorialController = require('../controllers/editorialController');

//RUTAS

module.exports = (app) => {

    //Libros
    router.get('/libros/find', librosController.find);
    router.get('/libros/find/id', librosController.findById);
    router.post('/libros/create', librosController.create);
    router.put('/libros/update', librosController.update);
    router.delete('/libros/delete/:id', librosController.delete);

    //editoriales
    router.get('/editoriales/find', editorialController.find);
    router.get('/editoriales/find/id', editorialController.findById);
    router.post('/editoriales/create', editorialController.create);
    router.put('/editoriales/update', editorialController.update);
    router.delete('/editoriales/delete/:id', editorialController.delete);
    app.use('/', router);
};