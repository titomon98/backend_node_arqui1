const { Router } = require("express");
const router = Router();
const ventasController = require('../controllers/ventasController');

router.post("/", ventasController.generarFactura);
router.get("/", ventasController.find);
router.delete("/:id", ventasController.delete);
// router.get("/:id", clienteController.findById);
// router.put("/", clienteController.update);

module.exports = router;