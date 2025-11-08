import mongoose, { Document, Model, Types } from "mongoose";

export interface IReminder extends Document {
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
  message: string;
  remindAt: Date;
}

const reminderSchema = new mongoose.Schema<IReminder>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    message: { type: String, required: true },
    remindAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const Reminder: Model<IReminder> = mongoose.model<IReminder>("Reminder", reminderSchema);
export default Reminder;
