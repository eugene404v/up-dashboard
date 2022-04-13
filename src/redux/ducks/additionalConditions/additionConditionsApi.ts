import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectDataType } from 'types/utilTypes'
import { baseURL, getCommonHeaders } from 'utils/axios/axiosCore'

export const additionalConditionsApi = createApi({
    reducerPath: 'additionalConditionsApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
      getYachtAdditionalConditions: builder.query<selectDataType[], void>({ 
        query: () => `/yacht_additional_conditions`,
      }),
      getJetAdditionalConditions: builder.query<selectDataType[], void>({ 
        query: () => `/jet_additional_conditions`,
      }),
    }),
  })
  
export const { useGetYachtAdditionalConditionsQuery, useGetJetAdditionalConditionsQuery } = additionalConditionsApi