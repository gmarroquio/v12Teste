import mongoose, { Document, Schema } from 'mongoose';

type Driver = Document & {};

const DriverSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: { type: String, trim: true, required: true },
    cpf: { type: String, trim: true, required: true, unique: true },
    birthday: { type: Date, trim: true, required: true },
    active: {
      type: Boolean,
      default: true,
    },
    vehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }],
  },
  { timestamps: true }
);

export default mongoose.model<Driver>('Driver', DriverSchema);
