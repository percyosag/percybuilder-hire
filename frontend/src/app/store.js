import { configureStore } from "@reduxjs/toolkit";
import { jobsApi } from "../api/jobsApi";
import { companiesApi } from "../api/companiesApi";
import { contactsApi } from "../api/contactsApi";
import { authApi } from "../api/authApi";
import authReducer from "../features/auth/authSlice";
import { profileApi } from "../api/profileApi";
import { candidateProfileApi } from "../api/candidateProfileApi";
import { jobApplicationApi } from "../api/jobApplicationApi";
import { savedJobApi } from "../api/savedJobApi";
import { employerJobApi } from "../api/employerJobApi";
import { adminContactApi } from "../api/adminContactApi";
import { adminCompanyApi } from "../api/adminCompanyApi";
import { adminUserApi } from "../api/adminUserApi";
import { employerApplicationApi } from "../api/employerApplicationApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [candidateProfileApi.reducerPath]: candidateProfileApi.reducer,
    [jobApplicationApi.reducerPath]: jobApplicationApi.reducer,
    [savedJobApi.reducerPath]: savedJobApi.reducer,
    [employerJobApi.reducerPath]: employerJobApi.reducer,
    [adminContactApi.reducerPath]: adminContactApi.reducer,
    [adminCompanyApi.reducerPath]: adminCompanyApi.reducer,
    [adminUserApi.reducerPath]: adminUserApi.reducer,
    [employerApplicationApi.reducerPath]: employerApplicationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jobsApi.middleware)
      .concat(companiesApi.middleware)
      .concat(contactsApi.middleware)
      .concat(profileApi.middleware)
      .concat(authApi.middleware)
      .concat(candidateProfileApi.middleware)
      .concat(jobApplicationApi.middleware)
      .concat(savedJobApi.middleware)
      .concat(employerJobApi.middleware)
      .concat(adminContactApi.middleware)
      .concat(adminCompanyApi.middleware)
      .concat(adminUserApi.middleware)
      .concat(employerApplicationApi.middleware),
});
