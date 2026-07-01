import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./baseQuery";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: publicBaseQuery,
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/api/v1/jobs",
      providesTags: ["Jobs"],
    }),

    getJobById: builder.query({
      query: (id) => `/api/v1/jobs/${id}`,
      providesTags: ["Jobs"],
    }),
  }),
});

export const { useGetJobsQuery, useGetJobByIdQuery } = jobsApi;
