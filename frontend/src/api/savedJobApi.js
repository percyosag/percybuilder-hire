import { createApi } from "@reduxjs/toolkit/query/react";
import { authorizedBaseQuery } from "./baseQuery";

export const savedJobApi = createApi({
  reducerPath: "savedJobApi",
  baseQuery: authorizedBaseQuery,
  tagTypes: ["SavedJobs"],
  endpoints: (builder) => ({
    getMySavedJobs: builder.query({
      query: () => "/api/v1/users/saved-jobs",
      providesTags: ["SavedJobs"],
    }),

    saveJob: builder.mutation({
      query: (jobId) => ({
        url: `/api/v1/users/saved-jobs/${jobId}`,
        method: "POST",
      }),
      invalidatesTags: ["SavedJobs"],
    }),

    removeSavedJob: builder.mutation({
      query: (jobId) => ({
        url: `/api/v1/users/saved-jobs/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedJobs"],
    }),
  }),
});

export const {
  useGetMySavedJobsQuery,
  useSaveJobMutation,
  useRemoveSavedJobMutation,
} = savedJobApi;
