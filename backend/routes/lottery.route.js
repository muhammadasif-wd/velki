const express = require("express")
const lottery = require("../controllers/lottery.controller")
const router = express.Router()

router.get("/", lottery.getLotteryService);
router.post("/", lottery.createLotteryService);
router
    .route("/:id")
    .get(lottery.getLotteryServiceByID).delete(lottery.deleteLotteryById)
module.exports = router