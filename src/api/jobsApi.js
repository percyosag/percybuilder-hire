import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/api/v1/jobs",
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
