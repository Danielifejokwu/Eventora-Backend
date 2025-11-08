import express, { Request, Response } from "express";
import Event from "../models/Event";
import auth from "../middlewares/auth";
import upload from "../middlewares/upload";

const router = express.Router();

// ✅ Create Event (with image)
router.post("/", auth, upload.single("picture"), async (req: Request, res: Response) => {
  try {
    const { title, description, location, startDate, endDate, price } = req.body;

    const newEvent = new Event({
      title,
      description,
      location,
      startDate,
      endDate,
      price,
      picture: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all events
router.get("/", async (_req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get single event
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update event (replace image if new one uploaded)
router.put("/:id", auth, upload.single("picture"), async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    if (req.file) updates.picture = `/uploads/${req.file.filename}`;

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });

    res.json({ message: "Event updated successfully", updatedEvent });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete event
router.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: "Event not found" });

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
