import { configureStore } from "@reduxjs/toolkit";
import { jobsApi } from "../api/jobsApi";
import { companiesApi } from "../api/companiesApi";
import { contactsApi } from "../api/contactsApi";
import { authApi } from "../api/authApi";
import authReducer from "../features/auth/authSlice";
import { profileApi } from "../api/profileApi";
import { candidateProfileApi } from "../api/candidateProfileApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [candidateProfileApi.reducerPath]: candidateProfileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jobsApi.middleware)
      .concat(companiesApi.middleware)
      .concat(contactsApi.middleware)
      .concat(profileApi.middleware)
      .concat(authApi.middleware)
      .concat(candidateProfileApi.middleware),
});
