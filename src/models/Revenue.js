import mongoose from "mongoose";

const RevenueSchema = new mongoose.Schema(
  {
    title: String,
    amount: Number,
    source: String,
    date: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Revenue || mongoose.model("Revenue", RevenueSchema);
