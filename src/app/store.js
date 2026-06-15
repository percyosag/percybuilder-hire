import { configureStore } from "@reduxjs/toolkit";
import { jobsApi } from "../api/jobsApi";
import { companiesApi } from "../api/companiesApi";
import { contactsApi } from "../api/contactsApi";

export const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jobsApi.middleware)
      .concat(companiesApi.middleware)
      .concat(contactsApi.middleware),
});
