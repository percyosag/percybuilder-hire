import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./baseQuery";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: publicBaseQuery,

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
