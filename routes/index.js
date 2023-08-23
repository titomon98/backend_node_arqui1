const { Router } = require('express');
const router = Router();

// Client Type
const clientTypeController = require('../controllers/sales_point/clientTypesController');

//RUTAS
module.exports = (app) => {
    // Client Types
    router.get('/client_types/find/id', clientTypeController.findById);
    router.post('/client_types/create', clientTypeController.create)
    router.put('/client_types/update', clientTypeController.update)
    router.delete('/client_types/delete/:id', clientTypeController.delete)
    
    app.use('/', router);

};