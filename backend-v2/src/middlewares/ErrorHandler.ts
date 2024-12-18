import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import APIError from "../shared/utils/APIError";
import { MulterError } from "multer";

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err) // all error logs

    if (err instanceof APIError) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message,
        });
    } 

    else if (err instanceof MulterError) {
        res.status(500).json({
            success: false,
            message: "there was an error loading the file",
        });
    }
    
    
    else {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

    next();
};

export default errorHandler;