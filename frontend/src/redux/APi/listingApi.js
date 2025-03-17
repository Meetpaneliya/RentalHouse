import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../lib/config";

export const listingAPI = createApi({
  reducerPath: "listingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["Listing", "KYC"],
  endpoints: (builder) => ({
    search: builder.query({
      query: ({ city, startDate, endDate }) => {
        const queryParams = new URLSearchParams();
        if (city) queryParams.append("city", city);
        if (startDate) queryParams.append("startDate", startDate);
        if (endDate) queryParams.append("endDate", endDate);
        return {
          method: "GET",
          url: `/search?${queryParams.toString()}`,
          credentials: "include",
        };
      },
      providesTags: ["Listing"],
    }),
    getUserlisting: builder.query({
      query: () => ({
        method: "GET",
        url: `/listings/get`,
        credentials: "include",
      }),
      providesTags: ["Listing"],
    }),
    getAllListings: builder.query({
      query: () => ({
        method: "GET",
        url: `/listings/all`,
        credentials: "include",
      }),
      providesTags: ["Listing"],
    }),
    createListing: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `/listings/create`,
        credentials: "include",
        body,
      }),
      invalidatesTags: ["Listing"],
    }),
    updateListing: builder.mutation({
      query: (body, id) => ({
        method: "PUT",
        url: `/listings/update/${id}`,
        credentials: "include",
        body,
      }),
      invalidatesTags: ["Listing"],
    }),
    deleteListing: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/listings/delete/${id}`,
        credentials: "include",
      }),
      invalidatesTags: ["Listing"],
    }),

    //kyc section
    createkyc: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `/kyc/application`,
        credentials: "include",
        body,
      }),
      providesTags: ["KYC"],
    }),
    getkycstatus: builder.query({
      query: () => ({
        method: "GET",
        url: `/kyc/status`,
        credentials: "include",
      }),
      providesTags: ["KYC"],
    }),
  }),
});

export const {
  useSearchQuery,
  useGetUserlistingQuery,
  useCreateListingMutation,
  useDeleteListingMutation,
  useGetAllListingsQuery,
  useUpdateListingMutation,
  useCreatekycMutation,
  useGetkycstatusQuery,
} = listingAPI;
