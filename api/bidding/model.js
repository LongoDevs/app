const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  createdAt: { type: Date, default: Date.now }
});

const BidSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  bidderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model("Job", JobSchema);
const Bid = mongoose.model("Bid", BidSchema);

module.exports = { Job, Bid };
