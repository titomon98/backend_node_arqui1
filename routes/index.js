const { Router } = require('express');
const router = Router();

//Medicamento
const medicamentoController = require('../controllers/medicamento/medicamentoController');




module.exports = (app) => {
    //medicamento
    //find
    router.get('/medicamento/find', medicamentoController.find);
    //create
    router.post('/medicamento/create', medicamentoController.create);
    //update
    router.put('/medicamento/update', medicamentoController.update);
    
    
    app.use('/', router);

};