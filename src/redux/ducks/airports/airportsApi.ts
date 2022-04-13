import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { airportCreateData } from 'types/entitiesTypes/airportTypes'
import { marinaTypeForDisplay } from 'types/entitiesTypes/marinasTypes'
import { baseURL, getCommonHeaders } from 'utils/axios/axiosCore'

export const airportsApi = createApi({
    reducerPath: 'airportsApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    tagTypes: ["Airports"],
    endpoints: (builder) => ({
        getAirports: builder.query<marinaTypeForDisplay[], void>({
            query: () => `/airports`,
            providesTags: ["Airports"]
        }),
        createAirport: builder.mutation<any, airportCreateData>({
            query: (data) => ({
                url: `/airports/`,
                method: "POST",
                body: data,
                headers: getCommonHeaders()
            }),
            invalidatesTags: ["Airports"]
        }),
        deleteAirport: builder.mutation<any, number>({
            query: (id) => ({
                url: `/airports/${id}/`,
                method: "DELETE",
                headers: getCommonHeaders()
            }),
            invalidatesTags: ["Airports"]
        }),
    }),
  })
  
export const { useGetAirportsQuery, useCreateAirportMutation, useDeleteAirportMutation } = airportsApi