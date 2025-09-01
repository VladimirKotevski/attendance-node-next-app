import { ApplicationError } from '../utils/Errors';
import type { ErrorDTO } from '../interfaces/Errors.type';

export class ErrorHelper {
  public static parseError(error: ApplicationError): ErrorDTO;
  public static parseError(error: Error): ErrorDTO;
  public static parseError(error: Error): ErrorDTO {
    let fallback: ErrorDTO = {
      message: error?.message || 'Unknown error occurred',
      error: error?.name || 'UnknownError',
      statusCode: 0,
    };

    if (error instanceof ApplicationError) {
      fallback = error.data;
    }

    if (error instanceof Error) {
        if ('statusCode' in error && typeof (error as any).statusCode === 'number') {
          fallback.message = 'Fetch request failed';
          fallback.statusCode = (error as any).statusCode || 500;
        } else {
          fallback.message = `<li class="errMsg">${error.message}</li>`;
          fallback.error = error.name || 'GeneralError';
          fallback.statusCode = 500;
        }
    }

    if (typeof fallback.message === 'string') {
      fallback.message = `<li class="errMsg">${fallback.message}</li>`;
    }

    if (Array.isArray(fallback.message)) {
      fallback.message = fallback.message
        .map((msg) => `<li class="errMsg">${msg}</li>`)
        .join(' ')
        .trim();
    }

    return fallback;
  }
}