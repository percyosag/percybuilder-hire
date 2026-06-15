import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (contactData) => ({
        url: "/api/v1/contacts",
        method: "POST",
        body: contactData,
      }),
    }),
  }),
});

export const { useCreateContactMutation } = contactsApi;
