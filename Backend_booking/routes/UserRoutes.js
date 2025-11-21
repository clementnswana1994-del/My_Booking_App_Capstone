import express from 'express'

//import { auth } from "../middleware/authMiddleware";

import controller from "../controllers/userController.js"


const router = express.Router();

// get all users
router.get("/",  controller.getUsers);

// create user
router.post("/", controller.createUser);

// login user
router.post("/login", controller.loginUser);

// logout user
router.get("/logout", controller.logoutUser);

export default router;