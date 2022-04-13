import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { searchResponseType } from 'types/apiTypes/apiTypes'
import { basicRequestPreviewType, requestsTypesEnum, requestYachtPreviewType } from 'types/requestsTypes'
import { baseURL, getCommonHeaders } from 'utils/axios/axiosCore'
import { queryBuilder } from 'utils/helpers/queryBuilder'
import { editingRequestFormResultType } from 'utils/mappers/fromEditYachtRequestToPatch'

export const requestsApi = createApi({
    reducerPath: 'requestsApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    tagTypes: ["Requests"],
    endpoints: (builder) => ({
        getRequestsYacht: builder.query<searchResponseType<requestYachtPreviewType>, any>({
            query: (params) => ({
                url: `/yacht_booking_requests/?${queryBuilder(params)}`,
                method: "GET",
                headers: getCommonHeaders()
            }),
            providesTags: ["Requests"]
        }),
        deleteRequestYacht: builder.mutation<any, number>({
            query: (id) => ({
                url: `/yacht_booking_requests/${id}/`,
                method: "DELETE",
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Requests', id: arg }]
        }),
        getOneYachtRequest: builder.query<requestYachtPreviewType, number>({
            query: (id) => ({
                url:  `/yacht_booking_requests/${id}/`,
                method: "GET",
                headers: getCommonHeaders()
            }),
            providesTags: (result, err, arg) => result ? [{type: "Requests", id: arg}] : ["Requests"]
        }),
        editYachtRequestStatus: builder.mutation<any, {status: requestsTypesEnum, id: number}>({
            query: (query) => ({
                url:  `/yacht_booking_requests/${query.id}`,
                body: {
                    status: query.status
                },
                method: "PATCH",
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Requests', id: arg.id }],
        }),
        editYachtRequest: builder.mutation<any, {data: editingRequestFormResultType, id: number}>({
            query: (query) => ({
                url: `/yacht_booking_requests/${query.id}`,
                body: query.data,
                method: "PATCH",
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Requests', id: arg.id }],
        })
    }),
  })
  
export const { useGetOneYachtRequestQuery, useDeleteRequestYachtMutation, useGetRequestsYachtQuery, useEditYachtRequestStatusMutation, useEditYachtRequestMutation } = requestsApi