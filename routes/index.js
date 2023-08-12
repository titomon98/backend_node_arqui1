const { Router } = require('express');
const router = Router();

const testController = require('../controllers/testController');


module.exports = (app) => {
    //facturas
    router.get('/hello', testController.sayHello)
    
    app.use('/', router);

};