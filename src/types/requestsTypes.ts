import { extraExpenseType, yachtFullCardForDisplay } from "./vehicleTypes/cardTypes";
import { vehiclesCategoriesEnum, yachtPreviewType } from "./vehicleTypes/vehiclesTypes";

export enum requestsEnum {
    pending = "На рассмотрении",
    accepted = "Одобрено",
    archived = "Архив"
}

export enum requestsTypesEnum {
    pending = "PD",
    accepted = "AP",
    archived = "AR"
}

export const requestsTypesForDisplay = {
    [requestsTypesEnum.pending]: "На рассмотрении",
    [requestsTypesEnum.archived]: "Архив",
    [requestsTypesEnum.accepted]: "Одобрено"
}

export interface basicRequestPreviewType {
    requestType: requestsEnum;
    customerName: string;
    id: number;
    name: string;
    photo: string;
    countryName: string; //TODO
    price?: number;
    discount?: number;
    additionalFeatures?: Array<string>;
    dateCreate?: string;
    manager?: string;
    is_draft?: boolean;

    status: requestsTypesEnum;
    first_name: string;
    last_name: string;
    email: string;
    comment: string;
    phone: string;
}

export interface requestPreviewProps {
    onEdit: (id: number) => void;
    onReplaceToArchive?: (id: number) => void;
    onDelete: (id: number) => void;
    onApprove?: (id: number) => void;
    onDisApprove?: (id: number) => void;
    className?: string;
}

export interface requestYachtPreviewType extends basicRequestPreviewType {
    collection_date: string;
    return_date: string;
    yacht: yachtFullCardForDisplay;
    paid_services: extraExpenseType[]
}
