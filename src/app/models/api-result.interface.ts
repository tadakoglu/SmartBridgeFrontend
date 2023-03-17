import { Data } from "./api-data.interface";
import { ApiStatus } from "./api-status.enum";

export interface ApiResult {
    data: Data;
    status: ApiStatus;
    error: string;
}

