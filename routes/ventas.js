const { Router } = require("express");
const router = Router();
const ventasController = require('../controllers/ventasController');

router.post("/", ventasController.generarFactura);
router.get("/", ventasController.find);
// router.get("/:id", clienteController.findById);
// router.put("/", clienteController.update);
// router.delete("/:id", clienteController.delete);

module.exports = router;