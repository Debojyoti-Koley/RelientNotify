import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateRequest = (schema: z.ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (error) {
        //checking if validation failed
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.issues.map((e: any) => e.message),
            });
        }

        //other errors
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};