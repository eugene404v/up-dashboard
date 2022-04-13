import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'redux/axiosQuery'
import { jetFullCard, jetFullCardForDisplay, jetInfoForUpdate, yachtFullCard, yachtFullCardForDisplay, yachtInfoForUpdate } from 'types/vehicleTypes/cardTypes'
import { baseURL, getCommonHeaders } from 'utils/axios/axiosCore'
import { uploadPhotosFormDataBuilder } from 'utils/helpers/uploadPhotosFormDataBuilder'

export type photosAndMainIndexAndCardId = {
    photoFiles: File[],
    indexOfMainPhoto?: number,
    id: number
}

export const createCardApi = createApi({
    reducerPath: 'createCardApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    tagTypes: ["Yacht", "Jet"],
    endpoints: (builder) => ({
        createYachtCard: builder.mutation<any, yachtFullCard>({
            query: (yachtInfo) => ({
                url: "/yachts/",
                method: "POST",
                body: yachtInfo,
                headers: getCommonHeaders()
            })
        }),
        releaseYachtCard: builder.mutation<any, number>({
            query: (id) => ({
                url: `/yachts/${id}/release/`,
                method: "POST",
                body: {},
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Yacht', id: arg }],
        }),
        getYachtCard: builder.query<yachtFullCardForDisplay, number>({
            query: (id) => ({
               url: `/yachts/${id}/`,
               headers: getCommonHeaders()
            }),
            providesTags: (result, err, arg) => result ? [{type: "Yacht", id: arg}] : ["Yacht"]
        }),
        draftYachtCard: builder.mutation<any, number>({
            query: (id) => ({
                url: `/yachts/${id}/setDraft/`,
                method: "POST",
                body: {},
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Yacht', id: arg }],
        }),
        deleteYachtCard: builder.mutation<any, number>({
            query: (id) => ({
                url: `/yachts/${id}/`,
                method: "DELETE",
                headers: getCommonHeaders()
            })
        }),
        editYachtCard: builder.mutation<any, yachtInfoForUpdate>({
            query: (data) => ({
                url: `/yachts/${data.id}/`,
                method: "PATCH",
                body: data.yachtInfo,
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Yacht', id: arg.id }],
        }),
        //////////////////////////////////////////////////////////////////////////////
        createJetCard: builder.mutation<any, jetFullCard>({
            query: (jetInfo) => ({
                url: "/jets/",
                method: "POST",
                body: jetInfo,
                headers: getCommonHeaders()
            })
        }),
        releaseJetCard: builder.mutation<any, number>({
            query: (id) => ({
                url: `/jets/${id}/release/`,
                method: "POST",
                body: {},
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Jet', id: arg }],
        }),
        getJetCard: builder.query<jetFullCardForDisplay, number>({
            query: (id) => ({
               url: `/jets/${id}/`,
               headers: getCommonHeaders()
            }),
            providesTags: (result, err, arg) => result ? [{type: "Jet", id: arg}] : ["Jet"]
        }),
        draftJetCard: builder.mutation<any, number>({
            query: (id) => ({
                url: `/jets/${id}/setDraft/`,
                method: "POST",
                body: {},
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Jet', id: arg }],
        }),
        deleteJetCard: builder.mutation<any, number>({
            query: (id) => ({
                url: `/jets/${id}/`,
                method: "DELETE",
                headers: getCommonHeaders()
            })
        }),
        editJetCard: builder.mutation<any, jetInfoForUpdate>({
            query: (data) => ({
                url: `/jets/${data.id}/`,
                method: "PATCH",
                body: data.jetInfo,
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Jet', id: arg.id }],
        }),
        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        uploadYachtPhotosFirst: builder.mutation<any, photosAndMainIndexAndCardId>({
            query: (photoData) => ({
                url: `/yachts/${photoData.id}/upload_photos/`,
                method: "POST",
                body: uploadPhotosFormDataBuilder(photoData.photoFiles, photoData.indexOfMainPhoto),
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, err, arg) => result ? [{type: "Yacht", id: arg.id}] : ["Yacht"] //
        }),
        uploadJetPhotosFirst: builder.mutation<any, photosAndMainIndexAndCardId>({
            query: (photoData) => ({
                url: `/jets/${photoData.id}/upload_photos/`,
                method: "POST",
                body: uploadPhotosFormDataBuilder(photoData.photoFiles, photoData.indexOfMainPhoto),
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, err, arg) => result ? [{type: "Jet", id: arg.id}] : ["Jet"]
        }),
        deleteYachtPhoto: builder.mutation<any, number>({
            query: (id) => ({
                url: `/yacht_photos/${id}/`,
                method: "DELETE",
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, err, arg) => result ? [{type: "Yacht", id: arg}] : ["Yacht"] //
        }),
        makeMainYachtPhoto: builder.mutation<any, {photoId: number, vehicleId: number}>({
            query: (data) => ({
                url: `/yachts/${data.vehicleId}/`,
                method: "PATCH",
                body: {main_photo: data.photoId},
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, err, arg) => result ? [{type: "Yacht", id: arg.vehicleId}] : ["Yacht"] //
        }),
        deleteJetPhoto: builder.mutation<any, number>({
            query: (id) => ({
                url: `/jet_photos/${id}/`,
                method: "DELETE",
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, err, arg) => result ? [{type: "Jet", id: arg}] : ["Jet"] //
        }),
        makeMainJetPhoto: builder.mutation<any, {photoId: number, vehicleId: number}>({
            query: (data) => ({
                url: `/jets/${data.vehicleId}/`,
                method: "PATCH",
                body: {main_photo: data.photoId},
                headers: getCommonHeaders()
            }),
            invalidatesTags: (result, err, arg) => result ? [{type: "Jet", id: arg.vehicleId}] : ["Jet"] //
        }),
    }),
  })
  
export const { 
    useCreateYachtCardMutation, 
    useReleaseYachtCardMutation, 
    useGetYachtCardQuery,
    useDraftYachtCardMutation, 
    useDeleteYachtCardMutation, 
    useEditYachtCardMutation,
    useCreateJetCardMutation,
    useReleaseJetCardMutation,
    useGetJetCardQuery,
    useDraftJetCardMutation,
    useDeleteJetCardMutation,
    useEditJetCardMutation,
    useUploadJetPhotosFirstMutation,
    useUploadYachtPhotosFirstMutation,
    useDeleteJetPhotoMutation,
    useDeleteYachtPhotoMutation,
    useMakeMainJetPhotoMutation,
    useMakeMainYachtPhotoMutation
} = createCardApi