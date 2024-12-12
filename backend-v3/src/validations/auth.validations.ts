import { NextFunction, Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import APIError from "../shared/utils/APIError";

const registerValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            firstName: Joi.string().min(3).max(30).required().trim(),
            lastName: Joi.string().min(3).max(30).required().trim(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required()
                .trim()
                .min(3)
                .messages({
                    "string.email": '"email" must be a valid email. Example: test@gmail.com',
                }),
            password: Joi.string().min(3).max(30).required().trim(),
        });

        await schema.validateAsync(req.body)
        next()

    } catch (error) {

        if (error instanceof ValidationError) {
            throw new APIError(error.details[0].message, 400)
        } else {
            console.error("Unexpected error:", error);
            next(error);
        }
    }
};


const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required()
                .trim()
                .min(3)
                .messages({
                    "string.email": '"email" must be a valid email. Example: test@gmail.com',
                }),
            password: Joi.string().min(3).max(30).required().trim(),
        });

        await schema.validateAsync(req.body)
        next()

    } catch (error) {

        if (error instanceof ValidationError) {
            throw new APIError(error.details[0].message, 400)
        } else {
            console.error("Unexpected error:", error);
            next(error);
        }
    }
};



export { registerValidation, loginValidation };
