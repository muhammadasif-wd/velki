const express = require("express")
const identityController = require("../controllers/identity.controller")
// const verifyToken = require("../middlewares/verifyToken")
const router = express.Router()

router.get("/", identityController.getIdentity);
router.post("/", identityController.createIdentity);
router
    .route("/:username")
    .get(identityController.getIdentityByUsername).delete(identityController.deleteIdentity)
module.exports = router