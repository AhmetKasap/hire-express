import { Response as ExpressResponse } from 'express';

export default class APIResponse {
    private message: string | null;
    private data: any | null;

    constructor(message: string | null, data: any | null) {
        this.message = message;
        this.data = data;
    }

    public send(res: ExpressResponse, statusCode: number) {
        return res.status(statusCode).json({
            success: statusCode < 400,
            message: this.message,
            data: this.data,
        });
    }

    public ok(res: ExpressResponse) {
        return this.send(res, 200);
    }

    public created(res: ExpressResponse) {
        return this.send(res, 201);
    }

    public badRequest(res: ExpressResponse) {
        return this.send(res, 400);
    }

    public unauthorized(res: ExpressResponse) {
        return this.send(res, 401);
    }

    public forbidden(res: ExpressResponse) {
        return this.send(res, 403);
    }

    public notFound(res: ExpressResponse) {
        return this.send(res, 404);
    }

    public tooManyRequests(res: ExpressResponse) {
        return this.send(res, 429);
    }

    public conflict(res: ExpressResponse) {
        return this.send(res, 409);
    }

    public internalServerError(res: ExpressResponse) {
        return this.send(res, 500);
    }

    public notImplemented(res: ExpressResponse) {
        return this.send(res, 501);
    }

    public serviceUnavailable(res: ExpressResponse) {
        return this.send(res, 503);
    }
}
