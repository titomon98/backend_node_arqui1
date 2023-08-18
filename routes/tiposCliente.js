const { Router } = require('express');
const router = Router();
const tiposClienteController = require('../controllers/tiposClienteController');

router.get("/", tiposClienteController.find);
router.get("/:id", tiposClienteController.findById);
router.post("/", tiposClienteController.create);
router.put("/", tiposClienteController.update);
router.delete("/:id", tiposClienteController.delete);

module.exports = router;