import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../lib/config";

export const listingAPI = createApi({
  reducerPath: "listingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/listings`,
    credentials: "include",
  }),
  tagTypes: ["Listing"],
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
  }),
});

export const { useSearchQuery } = listingAPI;
