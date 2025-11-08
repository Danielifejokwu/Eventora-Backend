import express, { Response } from "express";
import Reminder from "../models/Reminder";
import auth, { AuthRequest } from "../middlewares/auth";

const router = express.Router();

router.post("/", auth, async (req: AuthRequest, res: Response) => {
  try {
    const { eventId, message, remindAt } = req.body;
    const reminder = new Reminder({ userId: req.user!.id, eventId, message, remindAt });
    await reminder.save();
    res.status(201).json({ message: "Reminder created", reminder });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", auth, async (req: AuthRequest, res: Response) => {
  try {
    const reminders = await Reminder.find({ userId: req.user!.id }).populate("eventId");
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
