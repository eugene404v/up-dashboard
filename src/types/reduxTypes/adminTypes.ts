import { profileRolesEnum } from "./profileTypes";
import { vehiclesCategoriesEnum } from "../vehicleTypes/vehiclesTypes";

export type usersAdminDataType = {
    id: number;
    name: string;
    role: profileRolesEnum;
    lastActivity: string;
}

export type activityAdminDataType = {
    id: number;
    name: string;
    lastActivity: string;
    actionType: activitytypesEnum; 
    vehicleType: vehiclesCategoriesEnum;
    idVehicle: number;
    vehicleName: string;
}

export enum activitytypesEnum {//TODO enum
    delete = 10,
    edit = 11,
    publish = 12,
    addToDrafts = 13
}

export type createUserType = {
    login: string;
    role: profileRolesEnum | "";
    password: string;
}