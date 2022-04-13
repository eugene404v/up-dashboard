import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectDataType } from 'types/utilTypes'
import { baseURL, getCommonHeaders } from 'utils/axios/axiosCore'

export const manufacturersApi = createApi({
    reducerPath: 'manufacturersApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    tagTypes: ["manufacturersYacht", "manufacturersJet"],
    endpoints: (builder) => ({
      getYachtManufacturers: builder.query<selectDataType[], void>({ 
        query: () => `/yacht_manufacturers`,
        providesTags: ["manufacturersYacht"]
      }),
      createYachtManufacturer: builder.mutation<any, string>({
          query: (name) => ({
              url: "/yacht_manufacturers/",
              method: "POST",
              body: {name},
              headers: getCommonHeaders()
          }),
          invalidatesTags: ["manufacturersYacht"],
      }),
      deleteYachtManufacturer: builder.mutation<any, number>({
          query: (id) => ({
              url: `/yacht_manufacturers/${id}`,
              method: "DELETE",
              headers: getCommonHeaders()
          }),
          invalidatesTags: ["manufacturersYacht"],
      }),

      getJetManufacturers: builder.query<selectDataType[], void>({ 
        query: () => `/jet_manufacturers`,
        providesTags: ["manufacturersJet"]
      }),
      createJetManufacturer: builder.mutation<any, string>({
          query: (name) => ({
              url: "/jet_manufacturers/",
              method: "POST",
              body: {name},
              headers: getCommonHeaders()
          }),
          invalidatesTags: ["manufacturersJet"],
      }),
      deleteJetManufacturer: builder.mutation<any, number>({
          query: (id) => ({
              url: `/jet_manufacturers/${id}/`,
              method: "DELETE",
              headers: getCommonHeaders()
          }),
          invalidatesTags: ["manufacturersJet"],
      }),
    }),
  })
  
export const { 
    useGetYachtManufacturersQuery, 
    useCreateYachtManufacturerMutation, 
    useCreateJetManufacturerMutation, 
    useDeleteJetManufacturerMutation, 
    useDeleteYachtManufacturerMutation, 
    useGetJetManufacturersQuery 
} = manufacturersApi