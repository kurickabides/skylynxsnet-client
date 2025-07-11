import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../appStore/store";
import {
  SkylynxNet_AuthLoginReq,
  SkylynxNet_AuthLoginResponse,
  SkylynxNet_AuthSignUpReq,
  SkylynxNet_AuthSignUpResponse,
  AuthTokenState,
  SkylynxNet_LoggedINUser,
  SkylynxNet_UserProfile,
} from "./types";
import * as authApi from "./authAPI";
import { saveAuthState, loadAuthState } from "../../helpers/persistAuth";

const emptyProfile: SkylynxNet_UserProfile = {
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
  phoneNumber: "",
  portalDescription: "",
  firstName: "",
  lastName: "",
  photo: "",
  mobilePhone: "",
  dateOfBirth: "",
  preferredLanguage: "",
  addressId: "",
  mailingAddress1: "",
  mailingAddress2: "",
  city: "",
  stateProvinceId: "",
  zip: "",
  billingAddressId: "",
  billingAddress1: "",
  billingAddress2: "",
  billingCity: "",
  billingZip: "",
  billingStateProvinceId: "",
};

const userLoggedIN: SkylynxNet_LoggedINUser = {
  id: "",
  roles: [],
  profile: emptyProfile,
};

// Fallback default
const fallbackState: AuthTokenState = {
  token: "",
  isLoggedIn: false,
  remainingTime: 0,
  isAuthLoading: false,
  provider: "SkylynxNet",
  user: userLoggedIN,
  error: "",
};

// Initial state from encrypted localStorage or fallback
const initialState: AuthTokenState = loadAuthState() || fallbackState;

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
      localStorage.removeItem("auth");
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

          console.log(
            "✅ login.fulfilled called — setting isLoggedIn ",
            state.isLoggedIn
          );

          state.user = {
            id: "",
            roles: roles || [],
            profile: emptyProfile,
          };

          // Simulated session duration: 1 hour
          state.remainingTime = 60 * 60 * 1000;

          // Save encrypted state
          saveAuthState(state);

          console.log(
            "✅ login.fulfilled isLoggedIn after user update is",
            state.isLoggedIn
          );
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
