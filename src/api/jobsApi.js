import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./baseQuery";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: publicBaseQuery,
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/api/v1/jobs",
    }),

    getJobById: builder.query({
      query: (id) => `/api/v1/jobs/${id}`,
    }),
  }),
});

export const { useGetJobsQuery, useGetJobByIdQuery } = jobsApi;
