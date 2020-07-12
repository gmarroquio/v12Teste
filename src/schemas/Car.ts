import mongoose, { Document, Schema } from 'mongoose';

type Vehicle = Document & {};

const VehicleSchema = new Schema(
  {
    owner: {
      type: String,
      trim: true,
      required: true,
    },
    license: { type: String, trim: true, required: true, unique: true },
    renavam: { type: String, trim: true, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<Vehicle>('Vehicle', VehicleSchema);
