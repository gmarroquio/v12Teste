import mongoose, { Document, Schema } from 'mongoose';

type Vehicle = Document & {
  owner: string;
  licensePlate: string;
  renavam: string;
};

const VehicleSchema = new Schema(
  {
    owner: {
      type: String,
      required: true,
      trim: true,
    },
    licensePlate: { type: String, trim: true, required: true, unique: true },
    renavam: { type: String, trim: true, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<Vehicle>('Vehicle', VehicleSchema);
