import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { searchResponseType, searchYachtParamsType } from 'types/apiTypes/apiTypes'
import { jetFullCardForDisplay, yachtFullCardForDisplay } from 'types/vehicleTypes/cardTypes'
import { baseURL, getCommonHeaders } from 'utils/axios/axiosCore'
import { queryBuilder } from 'utils/helpers/queryBuilder'


export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        searchYachts: builder.query<searchResponseType<yachtFullCardForDisplay>, searchYachtParamsType>({
            query: (params) => ({
                url: `/yachts?${queryBuilder(params)}`,
                headers: getCommonHeaders()
            }),
        }),
        searchJets: builder.query<searchResponseType<jetFullCardForDisplay>, searchYachtParamsType>({
            query: (params) => ({
                url: `/jets?${queryBuilder(params)}`,
                headers: getCommonHeaders()
            }),
        })
    }),
  })
  
export const { useSearchYachtsQuery, useSearchJetsQuery } = searchApi