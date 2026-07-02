import { createApi } from "@reduxjs/toolkit/query/react";
import { authorizedBaseQuery } from "./baseQuery";

export const employerApplicationApi = createApi({
  reducerPath: "employerApplicationApi",
  baseQuery: authorizedBaseQuery,
  tagTypes: ["EmployerApplications"],
  endpoints: (builder) => ({
    getEmployerApplications: builder.query({
      query: () => "/api/v1/applications/employer",
      providesTags: ["EmployerApplications"],
    }),

    getEmployerApplicationsByJob: builder.query({
      query: (jobId) => `/api/v1/applications/employer/jobs/${jobId}`,
      providesTags: ["EmployerApplications"],
    }),

    updateEmployerApplicationStatus: builder.mutation({
      query: ({ applicationId, status }) => ({
        url: `/api/v1/applications/employer/${applicationId}/status?status=${status}`,
        method: "PATCH",
      }),
      invalidatesTags: ["EmployerApplications"],
    }),
  }),
});

export const {
  useGetEmployerApplicationsQuery,
  useGetEmployerApplicationsByJobQuery,
  useUpdateEmployerApplicationStatusMutation,
} = employerApplicationApi;
