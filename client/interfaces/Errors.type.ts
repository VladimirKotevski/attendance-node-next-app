export interface ErrorDTO {
    message: string;
    error: string;
    statusCode: number;
    originalMessage?: string;
  }