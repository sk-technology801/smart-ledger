import mongoose from "mongoose";

const RevenueSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Revenue || mongoose.model("Revenue", RevenueSchema);
