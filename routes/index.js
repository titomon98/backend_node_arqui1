const { Router } = require('express');
const router = Router();

const inventarioController = require('../controllers/Inventarios/inventarioController');
//RUTAS

module.exports = (app) => {

    //INVENTARIOS
    router.get('/inventarios/find', inventarioController.find);
    //Create
    router.post('/inventarios/create', inventarioController.create);
    //Update
    router.put('/inventarios/update', inventarioController.update);
    //Delete
    router.delete('/inventarios/delete/:id', inventarioController.delete);

    app.use('/', router);

};