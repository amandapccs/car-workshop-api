import mongoose, { Schema, Document } from "mongoose";

interface mongooseWorkshopType extends Document {
  name: string;
  address: string;
  location: {
    type: string;
    coordinates: number[];
  };
  createdAt: Date;
  updatedAt?: Date;
}

const workshopSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true },
    },
  },
  {
    timestamps: true,
  }
);

// índice para que o MongoDB realize consultas geoespaciais de forma mais eficiente
workshopSchema.index({ location: "2dsphere" });

export const mongooseWorkshop = mongoose.model<mongooseWorkshopType>(
  "Workshop",
  workshopSchema
);
