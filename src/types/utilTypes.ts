export type routerParamsType = {
    id?: string
}

export type selectDataType = {
    id: string | number;
    name: string;
}

export type apiArrayType = {
    id: string | number;
    name: string;
}

export type pendingStateType = "Never" | "Success" | "Pending" | "Rejected"

export type anyObjectType = {
    [key: string]: any
}