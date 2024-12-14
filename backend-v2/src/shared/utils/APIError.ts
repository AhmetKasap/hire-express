class APIError extends Error {
    public statusCode: number; 

    constructor(message: string, statusCode: number) {
        super(message); 
        this.statusCode = statusCode; 

        Object.setPrototypeOf(this, APIError.prototype);
    }
}

export default APIError;