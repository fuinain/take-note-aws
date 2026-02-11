/**
 * Standard API Response Wrapper
 * Dùng chung cho tất cả API responses trong application
 */
export class ApiResponse<T = any> {
  /**
   * HTTP status code
   */
  code: number;

  /**
   * Message mô tả kết quả
   */
  message: string;

  /**
   * Data trả về (generic type)
   */
  data?: T;

  /**
   * Timestamp của response
   */
  timestamp: string;

  constructor(code: number, message: string, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Helper method: Success response
   */
  static success<T>(data?: T, message: string = 'Success'): ApiResponse<T> {
    return new ApiResponse(200, message, data);
  }

  /**
   * Helper method: Created response
   */
  static created<T>(
    data?: T,
    message: string = 'Created successfully',
  ): ApiResponse<T> {
    return new ApiResponse(201, message, data);
  }

  /**
   * Helper method: Error response
   */
  static error(
    code: number = 500,
    message: string = 'Internal server error',
  ): ApiResponse<null> {
    return new ApiResponse(code, message, null);
  }
}
