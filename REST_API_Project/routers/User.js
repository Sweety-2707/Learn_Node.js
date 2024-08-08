const express = require("express");
const router = express.Router();
const {handleGetAllUsers, handleGetAllUsers2, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateUser} = require("../controller/User")

router
.route("/api/users")
.get(handleGetAllUsers)
.post(handleCreateUser);

router.get("/users", handleGetAllUsers2);

router
  .route("/api/users/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);


module.exports = router;