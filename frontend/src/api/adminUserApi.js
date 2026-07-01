import { createApi } from "@reduxjs/toolkit/query/react";
import { authorizedBaseQuery } from "./baseQuery";

export const adminUserApi = createApi({
  reducerPath: "adminUserApi",
  baseQuery: authorizedBaseQuery,
  tagTypes: ["AdminUser"],
  endpoints: (builder) => ({
    searchUserByEmail: builder.query({
      query: (email) =>
        `/api/v1/users/admin/search?email=${encodeURIComponent(email)}`,
      providesTags: ["AdminUser"],
    }),

    promoteUserToEmployer: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/users/admin/${userId}/role/employer`,
        method: "PATCH",
      }),
      invalidatesTags: ["AdminUser"],
    }),

    assignCompanyToUser: builder.mutation({
      query: ({ userId, companyId }) => ({
        url: `/api/v1/users/admin/${userId}/company/${companyId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["AdminUser"],
    }),
  }),
});

export const {
  useLazySearchUserByEmailQuery,
  usePromoteUserToEmployerMutation,
  useAssignCompanyToUserMutation,
} = adminUserApi;
