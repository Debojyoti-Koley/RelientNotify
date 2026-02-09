import { z } from 'zod';

export const notificationValidatorSchema = z.object({
    channel: z.enum(["sms", "email", "push"], {
        message: "channel is required",
    }),

    to: z.string().min(1, "recipient (to) is required"),

    message: z.string().min(1, "message cannot be empty"),

    priority: z.enum(["high", "normal", "bulk"]).default("normal"),

    idempotencyKey: z.string().min(1, "idempotencyKey is required"),
});
