
export interface ApiResult<T>{
    data: T | any;
    isSuccess: boolean;
    message?: string;

}