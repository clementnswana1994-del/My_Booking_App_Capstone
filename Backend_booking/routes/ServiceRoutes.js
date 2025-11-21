import express from 'express'

//import { auth } from "../middleware/authMiddleware";

import controller from "../controllers/serviceController.js"



const router = express.Router();

// get all services
router.get("/", controller.getServices);

// create services
router.post("/",  controller.createService);

// get single Services
router.get("/:id", controller.getService);

//update Services
router.put("/:id",  controller.updateServices);

// delete Services
router.delete("/:id",  controller.deleteServices);

export default router;