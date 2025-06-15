import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../appStore/store";
import {
  SkylynxNet_AuthLoginReq,
  SkylynxNet_AuthLoginResponse,
  SkylynxNet_AuthSignUpReq,
  SkylynxNet_AuthSignUpResponse,
  AuthTokenState,
} from "./types";
import * as authApi from "./authAPI";

// Initial empty profile
const emptyProfile = {
  userId: "",
  username: "",
  email: "",
  emailConfirmed: false,
  phoneNumberConfirmed: false,
  twoFactorEnabled: false,
  accessFailedCount: 0,
  portalId: "",
  portalName: "",
  portalCreatedDate: "",
  providerId: "",
  createdAt: "",
  updatedAt: "",
};

const userLoggedIN = {
  id: "",
  token: "",
  roles: [],
  profile: emptyProfile,
};

// Initial state
const initialState: AuthTokenState = {
  token: "",
  isLoggedIn: false,
  remainingTime: 0,
  isAuthLoading: false,
  provider: "SkylynxNet",
  user: userLoggedIN,
  error: "",
};

// Async login action
export const login = createAsyncThunk<
  SkylynxNet_AuthLoginResponse,
  SkylynxNet_AuthLoginReq,
  { state: RootState }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await authApi.signInWithPassword(credentials);
    console.log("✅ Login API response:", response);
    return response;
  } catch (error) {
    console.error("❌ Login error:", error);
    return thunkAPI.rejectWithValue("Login failed");
  }
});

// Async signup action
export const signup = createAsyncThunk<
  SkylynxNet_AuthSignUpResponse,
  SkylynxNet_AuthSignUpReq,
  { state: RootState }
>("auth/signup", async (credentials, thunkAPI) => {
  try {
    const response = await authApi.signUp(credentials);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue("Signup failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
      state.user = userLoggedIN;
      state.isAuthLoading = false;
      state.error = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, roles } = action.payload;
        state.isAuthLoading = false;
        if (token) {
          state.token = token;
          state.isLoggedIn = true;
          state.error = "";
          // Keep existing user or set an empty default until profile fetched
        } else {
          state.error = "Login did not return a token";
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.isLoggedIn = false;
        state.error = (action.payload as string) || "Login failed";
      })
      .addCase(signup.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isAuthLoading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.isLoggedIn = false;
        state.error = (action.payload as string) || "Signup failed";
      });
  },
});

export const authActions = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
