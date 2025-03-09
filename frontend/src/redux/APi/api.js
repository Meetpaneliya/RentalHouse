import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "rentalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
    credentials: "include",
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    // Create your endpoints here
    userRegister: builder.mutation({
      query: (formData) => ({
        method: "POST",
        url: `user/register`,
        credentials: "include",
        body: formData,
      }),
    }),
    userlogin: builder.mutation({
      method: "POST",

      query: () => ({
        url: `user/login`,
        credentials: "include",
      }),
    }),
    myProfile: builder.query({
      query: () => ({
        url: `user/me`,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserloginMutation,
  useMyProfileQuery,
} = api;
