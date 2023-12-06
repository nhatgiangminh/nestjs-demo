import { ArgumentsHost, Catch, HttpException, ExceptionFilter } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
      const context = host.switchToHttp()
      const response = context.getResponse()
      const request = context.getRequest()
      const status = exception.getStatus()

      response.status(status).json({
        statusCode: status,
        message: exception.message,
        error: exception.cause,
      })
  }
}

import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse()
    const request = context.getRequest()
    if (response.statusCode === 500) {
      return response.status(500).json({
        statusCode: 500,
        message: 'Some thing went wrong!',
        error: 'UNKNOW_ERROR'
      })
    }
    super.catch(exception, host);
  }
}