import { getProfileResponse, signInResponseType } from "types/apiTypes/apiTypes";
import { signInType } from "types/reduxTypes/authTypes";
import axios from "utils/axios/axiosCore";

const apiKey = "testWeb"

export const authApi = {
    signIn: ({email, password}: signInType) => axios.post<signInResponseType>(`/auth/login/`, { email, password }),
    signOut: () => axios.post(`/auth/logout/`, {  }),
    getProfile: () => axios.get<getProfileResponse>(`/auth/user/`, { headers: { "Authorization": `Token ${window.localStorage.token}` } })
}