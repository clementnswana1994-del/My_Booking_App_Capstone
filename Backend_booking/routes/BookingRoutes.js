import express from 'express'

//import { auth } from "../middleware/authMiddleware";

import controller from "../controllers/bookingController.js"

const router = express.Router();

router.get("/",  controller.getBookings);

router.get("/:id", controller.getBooking);

router.post("/", controller.createBooking);

router.put("/:id",  controller.updateBooking);

router.delete("/:id",  controller.deleteBooking);

export default router;