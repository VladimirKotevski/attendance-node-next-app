export class ApplicationError extends Error {
    data: {
      message: string;
      error: string;
      statusCode: number;
    };
    constructor(message: string, errorType: string, statusCode: number) {
      super(message);
      this.name = 'ApplicationError';
      this.data = {
        message,
        statusCode,
        error: errorType,
      };
    }
  }