const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  ticketId: { type: String, unique: true }, // ADD THIS
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  category: { type: String, enum: ["technical", "billing", "general"], default: "general" },
  status: { type: String, enum: ["open", "in-progress", "resolved", "closed"], default: "open" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

// Auto-generate ticketId before saving
TicketSchema.pre("save", function (next) {
  if (!this.ticketId) {
    this.ticketId = "TCKT-" + Math.floor(1000 + Math.random() * 9000);
  }
  next();
});

module.exports = mongoose.model("Ticket", TicketSchema);
