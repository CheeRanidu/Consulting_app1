import express from "express";
import {
  deleteBooking,
  getBookingById,
  getConsultantBooking,
  newBooking,
} from "../controllers/booking-controller.js";

const bookingsRouter = express.Router();

bookingsRouter.get("/:id", getBookingById);
bookingsRouter.post("/getBooking", getConsultantBooking);
bookingsRouter.post("/", newBooking);
bookingsRouter.delete("/:id", deleteBooking);

export default bookingsRouter;
