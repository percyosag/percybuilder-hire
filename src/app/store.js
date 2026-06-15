import { configureStore } from "@reduxjs/toolkit";
import { jobsApi } from "../api/jobsApi";
import { companiesApi } from "../api/companiesApi";

export const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jobsApi.middleware)
      .concat(companiesApi.middleware),
});
