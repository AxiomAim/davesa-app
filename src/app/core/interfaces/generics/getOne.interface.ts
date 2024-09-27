export interface GetOne<T> {
    data: T;
    message: string;
    error?: string;
}