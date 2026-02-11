import { Worker, Job } from 'bullmq';
import mongoose from 'mongoose';


import { redisConnection } from '../config/redis';
import Notification from '../models/Notifications';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/notification_service');
console.log('Worker connected to MongoDB');


const worker = new Worker('notifications', async (job: Job) => {
    console.log(`Processing job ${job.id} of type ${job.name}, with data:`, job.data);
    const { notificationId } = job.data;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
        console.error(`Notification with ID ${notificationId} not found`);
        return;
    }

    console.log(`Sending notification to ${notification.to} via ${notification.channel}: ${notification.payload}`);
    notification.status = 'sent';
    await notification.save();
    console.log(`Notification ${notificationId} sent successfully`);
}, {
    connection: redisConnection,
}
);

console.log('Worker started and listening for jobs...');