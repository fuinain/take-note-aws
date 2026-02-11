import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../dto/api-response.dto';

/**
 * Transform Interceptor (Optional)
 * Tự động wrap responses chưa được wrap trong ApiResponse
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // Nếu đã là ApiResponse, return luôn
        if (data instanceof ApiResponse) {
          return data;
        }

        // Nếu chưa, wrap vào ApiResponse
        return ApiResponse.success(data);
      }),
    );
  }
}
