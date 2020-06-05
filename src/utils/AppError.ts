import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

export class AppError extends Error {
    public readonly httpCode: number;
    public readonly isOperational: boolean;
    public readonly errorArrays: any[];

    constructor(httpCode: number, description: string, errorsArray?: any, isOperational = true) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.errorArrays = errorsArray;
        Error.captureStackTrace(this);
    }
}

export const handleError = (error: AppError, _: Request, res: Response, next: NextFunction) => {
    const { isOperational, httpCode, message, errorArrays } = error;
    if (isOperational) {
        res.status(httpCode).json({
            error: {
                message,
                data: errorArrays,
            },
        });
    }

    next(error);
};

export const logError = (error: Error, _req: Request, _res: Response, next: NextFunction) => {
    console.error(error.stack);
    next(error);
};

export const internalError = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    res.status(INTERNAL_SERVER_ERROR).json({
        message: error.message,
    });
};
