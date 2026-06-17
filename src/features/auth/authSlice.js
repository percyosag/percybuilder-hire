import { createSlice } from "@reduxjs/toolkit";

const savedAuth = localStorage.getItem("percybuilderHireAuth");

const initialState = savedAuth
  ? JSON.parse(savedAuth)
  : {
      user: null,
      token: null,
      isAuthenticated: false,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem(
        "percybuilderHireAuth",
        JSON.stringify({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      );
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("percybuilderHireAuth");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
