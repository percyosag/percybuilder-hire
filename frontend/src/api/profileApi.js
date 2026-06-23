import { createApi } from "@reduxjs/toolkit/query/react";
import { authorizedBaseQuery } from "./baseQuery";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: authorizedBaseQuery,
  endpoints: (builder) => ({
    getCurrentProfile: builder.query({
      query: () => "/api/v1/profile/me",
    }),
  }),
});

export const { useGetCurrentProfileQuery } = profileApi;
