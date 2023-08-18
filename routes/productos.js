const { Router } = require('express');
const router = Router();
const productosController = require('../controllers/productosController');

router.get("/", productosController.find);
router.get("/:id", productosController.findById);
router.post("/", productosController.create);
router.put("/", productosController.update);
router.delete("/:id", productosController.delete);

module.exports = router;