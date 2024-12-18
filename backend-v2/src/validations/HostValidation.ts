import { NextFunction, Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import APIError from "../shared/utils/APIError";

const createHostValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            location: Joi.object({
                country: Joi.string().trim().required(),
                city: Joi.string().trim().required(),
                state: Joi.string().trim().required()
            }).required(),
            hostType: Joi.string().required(),
            numberOfGuests: Joi.number().integer().positive().required(),
            price: Joi.number().positive().required(),
            explanation: Joi.string().trim().required(),
        });

        await schema.validateAsync(req.body.data);
        next();

    } catch (error) {
        if (error instanceof ValidationError) {
            throw new APIError(error.details[0].message, 400)
        } else {
            console.error("Unexpected error:", error)
            next(error)
        }
    }
};

export { createHostValidation }
