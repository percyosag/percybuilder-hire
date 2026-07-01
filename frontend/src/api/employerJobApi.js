import { createApi } from "@reduxjs/toolkit/query/react";
import { authorizedBaseQuery } from "./baseQuery";
import { jobsApi } from "./jobsApi";

export const employerJobApi = createApi({
  reducerPath: "employerJobApi",
  baseQuery: authorizedBaseQuery,
  tagTypes: ["EmployerJobs"],
  endpoints: (builder) => ({
    getMyCompanyJobs: builder.query({
      query: () => "/api/v1/jobs/employer",
      providesTags: ["EmployerJobs"],
    }),

    createEmployerJob: builder.mutation({
      query: (jobData) => ({
        url: "/api/v1/jobs/employer",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["EmployerJobs"],
      async onQueryStarted(_jobData, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(jobsApi.util.invalidateTags(["Jobs"]));
        } catch {
          // Do nothing. The UI error handling is done by the component.
        }
      },
    }),

    updateEmployerJobStatus: builder.mutation({
      query: ({ jobId, status }) => ({
        url: `/api/v1/jobs/employer/${jobId}/status?status=${status}`,
        method: "PATCH",
      }),
      invalidatesTags: ["EmployerJobs"],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(jobsApi.util.invalidateTags(["Jobs"]));
        } catch {
          // Do nothing. The UI error handling is done by the component.
        }
      },
    }),
  }),
});

export const {
  useGetMyCompanyJobsQuery,
  useCreateEmployerJobMutation,
  useUpdateEmployerJobStatusMutation,
} = employerJobApi;
