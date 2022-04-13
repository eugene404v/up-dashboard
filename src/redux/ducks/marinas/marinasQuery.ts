import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { marinaType, marinaTypeForDisplay } from 'types/entitiesTypes/marinasTypes'
import { baseURL, getCommonHeaders } from 'utils/axios/axiosCore'

export const marinasApi = createApi({
    reducerPath: 'marinasApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    tagTypes: ["Marinas"],
    endpoints: (builder) => ({
        getMarinas: builder.query<marinaTypeForDisplay[], void>({
            query: () => `/marinas`,
            providesTags: ["Marinas"]
        }),
        createMarina: builder.mutation<any, marinaType>({
            query: (data) => ({
                url: `/marinas/`,
                method: "POST",
                body: data,
                headers: getCommonHeaders()
            }),
            invalidatesTags: ["Marinas"]
        }),
        deleteMarina: builder.mutation<any, number>({
            query: (id) => ({
                url: `/marinas/${id}/`,
                method: "DELETE",
                headers: getCommonHeaders()
            }),
            invalidatesTags: ["Marinas"]
        }),
    }),
  })
  
export const { useCreateMarinaMutation, useDeleteMarinaMutation, useGetMarinasQuery } = marinasApi