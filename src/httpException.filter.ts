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
          error: 'UNKNOWN_ERROR',
        })
    }
  }