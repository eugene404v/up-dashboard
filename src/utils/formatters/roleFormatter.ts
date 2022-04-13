import { profileRolesEnum } from "types/reduxTypes/profileTypes";

export const roleFormatter = (role:profileRolesEnum) => {
    if (role === profileRolesEnum.admin) return "Администратор"
    if (role === profileRolesEnum.moderator) return "Модератор"
    return "Observer" //TODO
}