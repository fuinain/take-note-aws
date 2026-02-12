import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../dto/api-response.dto';

/**
 * Global Exception Filter
 * Tự động format tất cả errors thành ApiResponse format
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Log chi tiết lỗi
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error('====================================');
      console.error(`Status: ${status} Error: ${JSON.stringify(message)}`);
      console.error(`Request: ${request.method} ${request.url}`);
      console.error(`Body: ${JSON.stringify(request.body)}`);
      if (exception instanceof Error) {
        console.error(`Stack: ${exception.stack}`);
      }
      console.error('====================================');
    } else {
      console.warn(
        `[${request.method}] ${request.url} - Status: ${status} - Message: ${JSON.stringify(
          message,
        )}`,
      );
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        typeof message === 'string'
          ? message
          : (message as any).message || message,
    });
  }
}
