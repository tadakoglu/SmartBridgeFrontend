import { ApiStatus } from "./api-status.enum";

export interface ApiResult2 {
    data: string;
    status: ApiStatus;
    error: string;
}

