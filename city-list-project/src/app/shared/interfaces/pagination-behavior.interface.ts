import { HttpStatusCode } from "@angular/common/http";

export interface IResponseData<T>{
 data:T;
 message: string;
 status: HttpStatusCode
}