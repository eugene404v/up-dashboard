import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL, getCommonHeaders } from 'utils/axios/axiosCore'

export const regionsApi = createApi({
    reducerPath: 'regionsApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        getCountries: builder.query<any, void>({
            query: () => ({
                url: `/countries_info`,
                headers: getCommonHeaders()
            }),
        })
    }),
  })
  
export const { useGetCountriesQuery } = regionsApi