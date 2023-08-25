const { Router } = require("express");
const router = Router();
const comprasController = require('../controllers/comprasController');

router.post("/", comprasController.generarCompra);
router.get("/", comprasController.find);
router.delete("/:id", comprasController.delete);
// router.get("/:id", clienteController.findById);
// router.put("/", clienteController.update);

module.exports = router;