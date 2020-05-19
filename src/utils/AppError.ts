import { NextFunction, Request, Response } from 'express';

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
