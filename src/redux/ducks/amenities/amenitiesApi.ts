import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { amenitiesJetType, amenitiesJetTypeEnum, amenitiesYachtType, amenitiesYachtTypeEnum } from 'types/entitiesTypes/amenitiesTypes'
import { baseURL, getCommonHeaders } from 'utils/axios/axiosCore'

enum tagTypes {
    yachtSC = "yachtAmenitiesSC",
    yachtEQ = "yachtAmenitiesEQ",
    yachtET = "yachtAmenitiesET",
    jet = "jet"
}

interface getYachtAmenityParams {
  name?: string;
  type: amenitiesYachtTypeEnum;
}

interface getJetAmenityParams {
  name?: string;
  type: amenitiesJetTypeEnum;
}

export const amenitiesApi = createApi({
    reducerPath: 'amenitiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    tagTypes: [tagTypes.yachtEQ, tagTypes.yachtSC, tagTypes.yachtET, tagTypes.jet],
    endpoints: (builder) => ({
      getYachtAmenities: builder.query<amenitiesYachtType[], getYachtAmenityParams>({ 
        query: (params) => `/yacht_amenities?type=${params.type}`,
        providesTags: [tagTypes.yachtEQ, tagTypes.yachtSC, tagTypes.yachtET]
      }),
      createYachtAmenity: builder.mutation<any, {name:string, type:string}>({
          query: ({name, type}) => ({
              url: "/yacht_amenities/",
              method: "POST",
              body: {name, type},
              headers: getCommonHeaders()
          }),
          invalidatesTags: [tagTypes.yachtEQ, tagTypes.yachtSC, tagTypes.yachtET],
          transformResponse: (resp:{name:string, type:string}) => resp.name
      }),

      getJetAmenities: builder.query<amenitiesJetType[], getJetAmenityParams>({ 
        query: (params) => `/jet_amenities?type=${params.type}`,
        providesTags: [tagTypes.jet]
      }),
      createJetAmenity: builder.mutation<any, {name:string, type:string}>({
          query: ({name, type}) => ({
              url: "/jet_amenities/",
              method: "POST",
              body: {name, type},
              headers: getCommonHeaders()
          }),
          invalidatesTags: [tagTypes.jet],
          transformResponse: (resp:{name:string, type:string}) => resp.name
      })
    }),
  })
  
export const { useGetYachtAmenitiesQuery, useCreateYachtAmenityMutation, useCreateJetAmenityMutation, useGetJetAmenitiesQuery } = amenitiesApi