import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import APIError from "../shared/utils/APIError";

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    //console.error(err); // all error logs

    if (err instanceof APIError) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message,
        });
    } else {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

    next();
};

export default errorHandler;
