import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../lib/config";

export const api = createApi({
  reducerPath: "rentalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    myprofile: builder.query({
      query: () => ({
        method: "GET",
        url: `user/me`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    logoutuser: builder.mutation({
      query: () => ({
        method: "POST",
        url: `user/logout`,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    // Create your endpoints here
    updateuser: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: `user/update`,
        credentials: "include",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    userdelete: builder.mutation({
      query: () => ({
        method: "DELETE",
        url: `user/delete`,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    forgetpassword: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `user/forgot-password`,
        credentials: "include",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    resetpassword: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `user/reset-password/${body.token}`,
        credentials: "include",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useForgetpasswordMutation,
  useUpdateuserMutation,
  useUserdeleteMutation,
  useResetpasswordMutation,
  useMyprofileQuery,
  useLogoutuserMutation,
} = api;
