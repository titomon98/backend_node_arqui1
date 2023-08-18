const { Router } = require("express");
const router = Router();
const comprasController = require('../controllers/comprasController');

router.post("/", comprasController.generarCompra);
router.get("/", comprasController.find);
// router.get("/:id", clienteController.findById);
// router.put("/", clienteController.update);
// router.delete("/:id", clienteController.delete);

module.exports = router;