class APIError extends Error {
    public statusCode: number; // `statusCode` özelliğini açıkça tanımlıyoruz.

    constructor(message: string, statusCode: number) {
        super(message); // `Error` sınıfının constructor'ını çağırıyoruz.
        this.statusCode = statusCode; // Yeni özelliği atıyoruz.

        // Hata stack'ini doğru almak için:
        Object.setPrototypeOf(this, APIError.prototype);
    }
}

export default APIError;
