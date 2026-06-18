import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const publicBaseQuery = fetchBaseQuery({
  baseUrl,
});

export const authorizedBaseQuery = fetchBaseQuery({
  baseUrl,

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
