import { Schema, model } from "mongoose";
import { Item } from "../interfaces/Interfaces";

const cakeSchema = new Schema<Item>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Item>("cake", cakeSchema);
