import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

type Driver = Document & {
  name: string;
  lastName: string;
  cpf: string;
  birthday: Date;
  active: boolean;
  vehicles?: string[];
};

const DriverSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: { type: String, trim: true, required: true },
    cpf: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlength: 11,
      maxlength: 11,
    },
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
