import mongoose, { Document, Model, Types } from "mongoose";

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  userId: Types.ObjectId;
  status: "reserved" | "paid" | "cancelled";
}

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["reserved", "paid", "cancelled"], default: "reserved" },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> = mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;
