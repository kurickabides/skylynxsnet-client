import {
  SkylynxNet_AuthLoginReq,
  SkylynxNet_AuthLoginResponse,
  SkylynxNet_AuthSignUpReq,
  SkylynxNet_AuthSignUpResponse,
} from "./types";

import { SkylynxKey_APIKEY, AuthServer_URL } from "../../helpers/constants";

// 🔐 Login
export const signInWithPassword = async ({
  email,
  secret,
}: SkylynxNet_AuthLoginReq): Promise<SkylynxNet_AuthLoginResponse> => {
  const res = await fetch(`${AuthServer_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "skyx-api-key": SkylynxKey_APIKEY,
    },
    body: JSON.stringify({ email, password: secret }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
};

// 🧾 Signup
export const signUp = async ({
  email,
  secret,
  username,
  profileFields,
}: SkylynxNet_AuthSignUpReq): Promise<SkylynxNet_AuthSignUpResponse> => {
  const response = await fetch(`${AuthServer_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "skyx-api-key": SkylynxKey_APIKEY,
    },
    body: JSON.stringify({
      email,
      password: secret,
      username,
      profileFields,
    }),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  return response.json();
};
