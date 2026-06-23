import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./baseQuery";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: publicBaseQuery,
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => "/api/v1/companies",
    }),

    getCompanyById: builder.query({
      query: (id) => `/api/v1/companies/${id}`,
    }),
  }),
});

export const { useGetCompaniesQuery, useGetCompanyByIdQuery } = companiesApi;
