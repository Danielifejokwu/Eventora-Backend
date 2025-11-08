import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description?: string;
  location: string;
  startDate: Date;
  endDate: Date;
  price: number;
  picture?: string;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true },
    picture: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>("Event", EventSchema);
