export interface IApiResponse<T> {
  success: boolean;
  message?: string;  // ✅ Make optional
  data?: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}
