export interface List<T> {
    data: T[];
    unfilter_count?: number;
    message?: string;
    error?: string;
}
