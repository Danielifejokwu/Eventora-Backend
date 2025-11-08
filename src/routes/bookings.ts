import express, { Response } from "express";
import Booking from "../models/Booking";
import Event from "../models/Event";
import auth, { AuthRequest } from "../middlewares/auth";

const router = express.Router();

router.post("/", auth, async (req: AuthRequest, res: Response) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const booking = new Booking({ eventId, userId: req.user!.id });
    await booking.save();

    res.status(201).json({ message: "Booked", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", auth, async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.user!.id }).populate("eventId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
