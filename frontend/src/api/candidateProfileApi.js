import { createApi } from "@reduxjs/toolkit/query/react";
import { authorizedBaseQuery } from "./baseQuery";

export const candidateProfileApi = createApi({
  reducerPath: "candidateProfileApi",
  baseQuery: authorizedBaseQuery,
  tagTypes: ["CandidateProfile"],
  endpoints: (builder) => ({
    getCandidateProfile: builder.query({
      query: () => "/api/v1/profile/candidate",
      providesTags: ["CandidateProfile"],
    }),

    saveCandidateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/api/v1/profile/candidate",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["CandidateProfile"],
    }),

    uploadProfilePicture: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "/api/v1/profile/candidate/picture",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["CandidateProfile"],
    }),

    uploadResume: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "/api/v1/profile/candidate/resume",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["CandidateProfile"],
    }),
  }),
});

export const {
  useGetCandidateProfileQuery,
  useSaveCandidateProfileMutation,
  useUploadProfilePictureMutation,
  useUploadResumeMutation,
} = candidateProfileApi;
