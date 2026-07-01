import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./baseQuery";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: publicBaseQuery,
  tagTypes: ["Companies"],
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => "/api/v1/companies",
      providesTags: ["Companies"],
    }),

    getCompanyById: builder.query({
      query: (id) => `/api/v1/companies/${id}`,
      providesTags: ["Companies"],
    }),
  }),
});

export const { useGetCompaniesQuery, useGetCompanyByIdQuery } = companiesApi;
