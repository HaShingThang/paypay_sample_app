import { Schema, model } from "mongoose";

const orderItemSchema = new Schema(
  {
    merchantPaymentId: {
      type: Schema.Types.ObjectId,
    },
    cake: {
      type: Schema.Types.ObjectId,
      ref: "cake",
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: "JPY",
      },
    },
    status: {
      type: String,
      default: "CREATED",
    },
  },
  {
    timestamps: true,
  }
);

export default model("order_item", orderItemSchema);
