import {
  InvocationContext,
  Next,
  Provider,
  inject,
  ValueOrPromise,
  Interceptor,
} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {ApiResponse} from '../interfaces/api-response.interface';

export class ResponseInterceptor implements Provider<Interceptor> {
  constructor() { }

  value() {
    return this.intercept.bind(this);
  }

  // The interceptor method is invoked for every request.
  async intercept(
    invocationCtx: InvocationContext,
    next: Next,
  ): Promise<ValueOrPromise<ApiResponse<any>>> {
    try {
      const result = await next();

      // If the request was successful, structure the response
      return {
        success: true,
        statusCode: 200,
        message: 'Request processed successfully',
        data: result,
      };
    } catch (err) {
      // Handle the error, structure the error response
      let statusCode = 520;
      let message = 'Internal Server Error';

      if (err instanceof HttpErrors.HttpError) {
        statusCode = err.statusCode;
        message = err.message;
      }

      return {
        success: false,
        statusCode: statusCode,
        error: {
          message: message,
          data: err.details || {},
        },
      };
    }
  }
}
