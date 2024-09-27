export interface Update<T> {
  data: T;
  message: string;
  error?: string;
}
