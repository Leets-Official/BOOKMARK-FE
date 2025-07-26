// api response
export interface SuccessResponse<T> {
  data: T;
  error: false;
}

export interface ErrorResponse {
  data: null;
  error: true;
  message: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
