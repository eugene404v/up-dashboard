export interface errorType {
    response?: {
        data?: {
            [key: string]: string | number | boolean
        }
    }
}

export interface searchQueryCommonType {
    name?: string;
    city?: number;
}

export const PAGINATION_STEP = 12