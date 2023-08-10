import React, { useReducer, useRef, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import useCustomToast from "../../../hooks/useCustomToast/useCustomToast";
import { InputText } from "../../miscellaneous";

import styles from "./Login.module.scss";

type input = string | number | readonly string[] | undefined;

type initialLogInType = {
  login: {
    email: input;
    password: input;
  };
};

const reducer = (state: initialLogInType, action: any): any => {
  const updateState = { ...state };

  switch (action.type) {
    case "EMAIL":
      updateState.login.email = action.payload;
      return updateState;

    case "PASSWORD":
      updateState.login.password = action.payload;
      return updateState;

    case "GUEST_USER":
      updateState.login.email = action.payload.email;
      updateState.login.password = action.payload.password;
      return updateState;

    case "CLEAR_ALL_DATA":
      return action.payload;

    default:
      return state;
  }
};

function Login(): JSX.Element {
  const initialLogInState: initialLogInType = {
    login: {
      email: "",
      password: "",
    },
  };
  const [loginInput, dispatch]: any = useReducer<any>(
    reducer,
    initialLogInState
  );

  const inputRef = useRef<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login }: initialLogInType = loginInput;

  const navigate = useNavigate();

  const toast = useCustomToast();

  const callLoginApi = async (payload: any) => {
    try {
      setIsLoading(true);
      const axiosConfig: AxiosRequestConfig<any> = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        payload,
        axiosConfig
      );
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({ type: "CLEAR_ALL_DATA", payload: initialLogInState });
        navigate("/chats");
      }
    } catch (e: any) {
      if (e?.response?.data?.message) {
        toast({ title: e?.response?.data?.message, status: "error" });
      } else {
        toast({ title: e?.response?.statusText, status: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    switch (e.target.id) {
      case "email":
        dispatch({ type: "EMAIL", payload: e.target.value });
        break;
      case "password":
        dispatch({ type: "PASSWORD", payload: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    callLoginApi(login);
  };

  return (
    <form onSubmit={handleOnSubmit} autoComplete="off">
      <InputText
        inputRef={inputRef}
        value={login?.email}
        label={"Email Address"}
        id={"email"}
        type={"email"}
        required={true}
        placeHolder={"Enter your email address"}
        onChange={handleOnChange}
      />
      <InputText
        value={login?.password}
        label={"Password"}
        id={"password"}
        required={true}
        type={"password"}
        placeHolder={"Enter your password"}
        onChange={handleOnChange}
      />
      <div className={`${styles.buttonContainer}`}>
        <Button
          className={`${styles.button} ${styles.bgColorBlue} `}
          isLoading={isLoading}
          type={"submit"}
          children={"Login"}
        />
        <Button
          className={`${styles.button} ${styles.bgColorRed}`}
          onClick={() => {
            dispatch({
              type: "GUEST_USER",
              payload: { email: "guest@user.com", password: "12345678" },
            });
          }}
          type={"button"}
          children={"Guest Credential"}
        />
      </div>
    </form>
  );
}

export default Login;
