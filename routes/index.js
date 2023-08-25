const { Router } = require('express')
const router = Router()

// Client Type
const clientTypeController = require('../controllers/sales_point/clientTypesController')

// Clients
const clientsController = require('../controllers/sales_point/clientsController')

// Sellers
const sellersController = require('../controllers/sales_point/sellersController')

// Suppliers
const suppliersController = require('../controllers/sales_point/suppliersController')

// Products
const productsController = require('../controllers/sales_point/productsController')

// Purchasing
const purchasingController = require('../controllers/sales_point/purchasingController')

// Sales
const salesController = require('../controllers/sales_point/salesController')

// RUTAS
module.exports = (app) => {
    // Client Types
    router.get('/client_types/find', clientTypeController.findAll)
    router.get('/client_types/find/id', clientTypeController.findById)
    router.post('/client_types/create', clientTypeController.create)
    router.put('/client_types/update', clientTypeController.update)
    router.delete('/client_types/delete/:id', clientTypeController.delete)

    // Clients
    router.get('/clients/find', clientsController.findAll)
    router.get('/clients/find/id', clientsController.findById)
    router.post('/clients/create', clientsController.create)
    router.put('/clients/update', clientsController.update)
    router.delete('/clients/delete/:id', clientsController.delete)

    // Sellers
    router.get('/sellers/find', sellersController.findAll)
    router.get('/sellers/find/id', sellersController.findById)
    router.post('/sellers/create', sellersController.create)
    router.put('/sellers/update', sellersController.update)
    router.delete('/sellers/delete/:id', sellersController.delete)

    // Suppliers
    router.get('/suppliers/find', suppliersController.findAll)
    router.get('/suppliers/find/id', suppliersController.findById)
    router.post('/suppliers/create', suppliersController.create)
    router.put('/suppliers/update', suppliersController.update)
    router.delete('/suppliers/delete/:id', suppliersController.delete)

    // Products
    router.get('/products/find', productsController.findAll)
    router.get('/products/find/id', productsController.findById)
    router.post('/products/create', productsController.create)
    router.put('/products/update', productsController.update)
    router.delete('/products/delete/:id', productsController.delete)

    // Purchases
    router.post('/purchase/create', purchasingController.create)
    router.post('/purchase/add_product', purchasingController.addProduct)

    // Sales
    router.post('/sales/create', salesController.create)
    router.post('/sales/add_product', salesController.addProduct)
    
    app.use('/', router);
};
