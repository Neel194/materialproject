const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Could be user ID or 'Anonymous'
  message: { type: String, required: true },
  materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
