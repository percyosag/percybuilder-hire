import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  }),
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
