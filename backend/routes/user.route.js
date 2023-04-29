const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers,);
router.post("/signup", userController.singUp);
router.post("/login", userController.logIn);
router.get("/me", userController.getMe);

router
    .route("/:id")
    .get(userController.getUserById)
    .delete(userController.deleteUser)
    .patch(userController.updateUser);

router.patch("/change-password/:id", userController.changePassword);

module.exports = router;