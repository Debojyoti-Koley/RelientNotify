import mongoose from "mongoose";
import { channel } from "node:diagnostics_channel";

const notificationSchema = new mongoose.Schema({
    channel: {
        type: String,
        required: true,
        enum: ["email", "sms", "push"],
    },
    to: {
        type: String,
        required: true,
    },
    payload: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "sent", "failed"],
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
    },
    attempts: {
        type: Number,
    },
    idempotencyKey: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;