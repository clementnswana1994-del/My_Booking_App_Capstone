import express from 'express'

import { auth } from "../middleware/authMiddleware";

import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
} from "../controllers/bookingController";

const router = express.Router();

router.get("/", auth, getBookings);

router.get("/:id", getBooking);

router.post("/", createBooking);

router.put("/:id", auth, updateBooking);

router.delete("/:id", auth, deleteBooking);

export default router;