import { createApi } from "@reduxjs/toolkit/query/react";
import { authorizedBaseQuery } from "./baseQuery";

export const jobApplicationApi = createApi({
  reducerPath: "jobApplicationApi",
  baseQuery: authorizedBaseQuery,
  tagTypes: ["JobApplications", "Jobs"],
  endpoints: (builder) => ({
    getMyApplications: builder.query({
      query: () => "/api/v1/applications/me",
      providesTags: ["JobApplications"],
    }),

    applyToJob: builder.mutation({
      query: (applicationData) => ({
        url: "/api/v1/applications",
        method: "POST",
        body: applicationData,
      }),
      invalidatesTags: ["JobApplications", "Jobs"],
    }),

    withdrawApplication: builder.mutation({
      query: (jobId) => ({
        url: `/api/v1/applications/jobs/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["JobApplications", "Jobs"],
    }),
  }),
});

export const {
  useGetMyApplicationsQuery,
  useApplyToJobMutation,
  useWithdrawApplicationMutation,
} = jobApplicationApi;
