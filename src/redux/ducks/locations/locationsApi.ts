import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectDataType } from 'types/utilTypes'
import { baseURL, getCommonHeaders } from 'utils/axios/axiosCore'

export const locationsApi = createApi({
    reducerPath: 'locationsApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        getCountries: builder.query<selectDataType[], void>({
            query: () => `/countries`
        }),
        getCities: builder.query<selectDataType[], number|null>({
            query: (country) => `/cities?country=${country??""}`
        }),
    }),
  })
  
export const { useGetCitiesQuery, useGetCountriesQuery } = locationsApi