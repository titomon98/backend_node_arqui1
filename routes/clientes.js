const { Router } = require("express");
const router = Router();
const clienteController = require('../controllers/clientesController');

router.get("/", clienteController.find);
router.get("/:id", clienteController.findById);
router.post("/", clienteController.create);
router.put("/", clienteController.update);
router.delete("/:id", clienteController.delete);

module.exports = router;