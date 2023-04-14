const express = require("express")
const userID = require("../controllers/userID.controller")
const router = express.Router()

router.get("/", userID.getUserIDService);
router.post("/", userID.createUserIDService);
router
    .route("/:id")
    .get(userID.getUserIDServiceByUsername).delete(userID.deleteUserIDById)
module.exports = router