import express from 'express'

import { auth } from "./middleware/authMiddleware";

import {
  getServices,
  createServices,
  getService,
  updateServices,
  deleteServices,
} from "./controllers/serviceController";



const router = express.Router();

// get all services
router.get("/", getServices);

// create services
router.post("/", auth, createServices);

// get single Services
router.get("/:id", getService);

//update Services
router.put("/:id", auth, updateServices);

// delete Services
router.delete("/:id", auth, deleteServices);

export default router;