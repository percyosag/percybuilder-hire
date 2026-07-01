import { createApi } from "@reduxjs/toolkit/query/react";
import { authorizedBaseQuery } from "./baseQuery";
import { companiesApi } from "./companiesApi";

export const adminCompanyApi = createApi({
  reducerPath: "adminCompanyApi",
  baseQuery: authorizedBaseQuery,
  tagTypes: ["AdminCompanies"],
  endpoints: (builder) => ({
    getAdminCompanies: builder.query({
      query: () => "/api/v1/companies/admin",
      providesTags: ["AdminCompanies"],
    }),

    createCompany: builder.mutation({
      query: (companyData) => ({
        url: "/api/v1/companies/admin",
        method: "POST",
        body: companyData,
      }),
      invalidatesTags: ["AdminCompanies"],
      async onQueryStarted(_companyData, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(companiesApi.util.invalidateTags(["Companies"]));
        } catch {
          // Component handles the error.
        }
      },
    }),

    updateCompany: builder.mutation({
      query: ({ companyId, companyData }) => ({
        url: `/api/v1/companies/admin/${companyId}`,
        method: "PUT",
        body: companyData,
      }),
      invalidatesTags: ["AdminCompanies"],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(companiesApi.util.invalidateTags(["Companies"]));
        } catch {
          // Component handles the error.
        }
      },
    }),

    deleteCompany: builder.mutation({
      query: (companyId) => ({
        url: `/api/v1/companies/admin/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminCompanies"],
      async onQueryStarted(_companyId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(companiesApi.util.invalidateTags(["Companies"]));
        } catch {
          // Component handles the error.
        }
      },
    }),
  }),
});

export const {
  useGetAdminCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = adminCompanyApi;
