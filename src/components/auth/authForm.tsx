// ================================================
// ✅ Component: AuthForm
// File: components/auth/AuthForm.tsx
// Description: Handles authentication UI for login/signup using Redux state.
// Includes form, dynamic mode switching, toast messaging, and redirect logic.
// ================================================

import React, { useRef, useEffect, FC, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { CardHeader, Button } from "@mui/material";
import Loading from "../ui/LoadingProgessBar";
import { login, signup } from "./authSlice";
import { AuthTokenState } from "./types";
import Toasted from "../ui/toast";

import { AuthCard, AuthCardContent, AuthLabel } from "./styled/authForm";
import { Input, Actions, ToggleButton } from "../../theme/appStyles";

interface AuthFormProps {}

const AuthForm: FC<AuthFormProps> = (): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn, isAuthLoading, error } = useAppSelector(
    (state): AuthTokenState => state.auth
  );

  const userEmailRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    status: "info" as "success" | "error" | "info",
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
      setToast({
        open: true,
        message: "Authentication successful",
        status: "success",
      });
    } else if (error) {
      setToast({ open: true, message: error, status: "error" });
    }
  }, [isLoggedIn, error, navigate]);

  const logInSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const email = userEmailRef.current?.value;
    const password = userPasswordRef.current?.value;

    if (email && password) {
      const payload = { email, secret: password };
      if (isLogin) {
        dispatch(login(payload));
      } else {
        dispatch(signup(payload));
      }
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev);
    setToast({ open: false, message: "", status: "info" });
  };

  return (
    <>
      {toast.open && <Toasted toastMessage={toast} />}
      <AuthCard>
        <CardHeader title={isLogin ? "Login" : "Signup"} />
        <form onSubmit={logInSubmitHandler}>
          <AuthCardContent>
            <AuthLabel htmlFor="email">Your Email</AuthLabel>
            <Input ref={userEmailRef} type="email" id="email" required />
          </AuthCardContent>
          <AuthCardContent>
            <AuthLabel htmlFor="password">Your Password</AuthLabel>
            <Input
              ref={userPasswordRef}
              type="password"
              id="password"
              required
            />
          </AuthCardContent>
          <Actions>
            {!isAuthLoading && (
              <Button type="submit" variant="contained">
                {isLogin ? "Login" : "Signup"}
              </Button>
            )}
            {isAuthLoading && <Loading />}
            <ToggleButton onClick={switchAuthModeHandler}>
              {isLogin ? "Switch to Signup" : "Switch to Login"}
            </ToggleButton>
          </Actions>
        </form>
      </AuthCard>
    </>
  );
};

export default AuthForm;
