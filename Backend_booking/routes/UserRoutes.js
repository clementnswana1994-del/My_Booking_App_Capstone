import express from 'express'

import { auth } from "../middleware/authMiddleware";

import {
  getUsers,
  createUser,
  loginUser,
  logoutUser,
} from "./controllers/UserController";


const router = express.Router();

// get all users
router.get("/", auth, getUsers);

// create user
router.post("/", createUser);

// login user
router.post("/login", loginUser);

// logout user
router.get("/logout", logoutUser);

export default router;