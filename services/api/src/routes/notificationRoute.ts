import express from "express";
const router = express.Router();
import Notification from '../models/Notifications';
import { notificationValidatorSchema } from '../validator/notificationValidator';
import { validateRequest } from '../middlewares/validateRequest';
import { notificationQueue } from "../queues/notification.queue";


router.post('/', validateRequest(notificationValidatorSchema), async (req, res) => {
    try {
        const { channel, to, message, priority, idempotencyKey } = req.body;
        const notification = new Notification({
            channel,
            to,
            payload: message,
            status: "pending",
            priority,
            attempts: 0,
            idempotencyKey
        });
        const existingNotification = await Notification.findOne({ idempotencyKey });
        if (existingNotification) {
            return res.status(409).json({
                success: false,
                status: "failed",
                message: "Notification with this idempotencyKey already exists",
            });
        }
        await notification.save();
        await notificationQueue.add('sendNotification', {
            notificationId: notification._id,
        });
        res.status(202).json({
            success: true,
            notificationId: notification._id,
            status: notification.status,
            message: "Notification accepted and queued",
        });
    } catch (error) {
        console.error("Error saving notification:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save notification",
        });
    }
});

export default router;