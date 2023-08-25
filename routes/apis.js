const { Router } = require("express");
const router = Router();
const apisController = require('../controllers/apisController');

router.post("/", apisController.create);
router.get("/", apisController.find);
router.put("/", apisController.update);
// router.get("/:id", clienteController.findById);
// router.put("/", clienteController.update);

module.exports = router;