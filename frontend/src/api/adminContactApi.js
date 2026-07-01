import { createApi } from "@reduxjs/toolkit/query/react";
import { authorizedBaseQuery } from "./baseQuery";

export const adminContactApi = createApi({
  reducerPath: "adminContactApi",
  baseQuery: authorizedBaseQuery,
  tagTypes: ["AdminContacts"],
  endpoints: (builder) => ({
    getAdminContacts: builder.query({
      query: () => "/api/v1/contacts/admin",
      providesTags: ["AdminContacts"],
    }),

    updateContactStatus: builder.mutation({
      query: ({ contactId, status }) => ({
        url: `/api/v1/contacts/admin/${contactId}/status?status=${status}`,
        method: "PATCH",
      }),
      invalidatesTags: ["AdminContacts"],
    }),
  }),
});

export const { useGetAdminContactsQuery, useUpdateContactStatusMutation } =
  adminContactApi;
