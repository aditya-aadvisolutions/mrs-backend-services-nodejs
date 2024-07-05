
export interface ApiResult<T>{
    Data: T | any;
    IsSuccess: boolean;
    Message?: string;

}