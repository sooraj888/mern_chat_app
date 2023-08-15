import React, { useReducer, useRef, useState } from "react";

import InputText from "../../miscellaneous/InputText/InputText";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../../firebase/connect";
import axios, { AxiosRequestConfig } from "axios";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.scss";
import useCustomToast from "../../../hooks/useCustomToast/useCustomToast";

type input = string | number | readonly string[] | undefined;

type initialSignUpType = {
  signUp: {
    name: input;
    email: input;
    password: input;
    confirmPassword: input;
    pic: "";
  };
};

const reducer = (state: initialSignUpType, action: any): any => {
  const updateState = { ...state };

  switch (action.type) {
    case "NAME":
      updateState.signUp.name = action.payload;
      return updateState;
    case "EMAIL":
      updateState.signUp.email = action.payload;
      return updateState;
    case "PASSWORD":
      updateState.signUp.password = action.payload;
      return updateState;

    case "CONFIRM_PASSWORD":
      updateState.signUp.confirmPassword = action.payload;
      return updateState;

    case "PICTURE":
      updateState.signUp.pic = action.payload;
      return updateState;

    case "CLEAR_ALL_DATA":
      return action.payload;

    default:
      return state;
  }
};

function SignUp(): JSX.Element {
  const initialSignUpState: initialSignUpType = {
    signUp: { name: "", email: "", password: "", confirmPassword: "", pic: "" },
  };

  const navigation = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);

  const inputRef = useRef<any>(null);

  const [signUpInput, dispatch]: any = useReducer<any>(
    reducer,
    initialSignUpState
  );

  const {
    signUp: { name, email, password, confirmPassword, pic },
  }: initialSignUpType = signUpInput;

  const [file, setFile] = useState<any>("");

  const toast = useCustomToast();

  const callSignUpApi = async () => {
    try {
      setIsLoading(true);

      const configuration: AxiosRequestConfig<any> = {
        headers: { "Content-type": "application/json" },
      };

      const postData = {
        name,
        email,
        password,
        pic,
      };
      const { data } = await axios.post("api/user", postData, configuration);

      if (data) {
        toast({ title: "Account Created", status: "success" });

        localStorage.setItem("userInfo", JSON.stringify(data));

        dispatch({ type: "CLEAR_ALL_DATA", payload: initialSignUpState });
        navigation("/chats");
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

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Password Not Matching", status: "error" });
      return;
    }
    callSignUpApi();
  };

  const handleOnImageUpload = () => {
    try {
      if (file) {
        setIsImageUploading(true);

        const storageRef = ref(storage, `/files/${file?.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.warn(percent);
            // setPercent(percent);
          },
          (err) => {
            toast({ title: "Image not Uploaded", status: "error" });
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setIsImageUploading(false);
              dispatch({ type: "PICTURE", payload: url });
              toast({
                title: "Image Successfully Uploaded",
                status: "success",
              });
            });
          }
        );
      } else {
        toast({ title: "Select an Image", status: "warning" });
      }
    } catch (e) {
      console.error(e);
      setIsImageUploading(false);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    switch (e.target.id) {
      case "name":
        dispatch({ type: "NAME", payload: e.target.value });
        break;
      case "email":
        dispatch({ type: "EMAIL", payload: e.target.value });
        break;
      case "password":
        dispatch({ type: "PASSWORD", payload: e.target.value });
        break;
      case "confirmPassword":
        dispatch({
          type: "CONFIRM_PASSWORD",
          payload: e.target.value,
        });
        break;

      case "file":
        setFile(e?.target?.files?.[0]);
        break;
      default:
        break;
    }
  };

  function handleFileChange(event: any) {
    setFile(event.target.files[0]);
  }

  return (
    <form onSubmit={handleOnSubmit} autoComplete="off">
      <InputText
        inputRef={inputRef}
        value={name}
        label={"Name"}
        id={"name"}
        required={true}
        placeHolder={"Enter your name"}
        onChange={handleOnChange}
      />
      <InputText
        value={email}
        label={"Email Address"}
        id={"email"}
        type={"email"}
        required={true}
        placeHolder={"Enter your email address"}
        onChange={handleOnChange}
      />
      <InputText
        value={password}
        label={"Password"}
        id={"password"}
        required={true}
        type={"password"}
        placeHolder={"Enter your password"}
        onChange={handleOnChange}
      />
      <InputText
        value={confirmPassword}
        label={"Confirm Password"}
        id={"confirmPassword"}
        required={true}
        type={"password"}
        placeHolder={"Enter confirm password"}
        onChange={handleOnChange}
      />
      <div>
        <label className={`${styles.label}`} htmlFor="uploadImage">
          Select an image
        </label>
        <br />
        <div className={`${styles.fileContainer}`}>
          <input
            id={"uploadImage"}
            accept="/image/*"
            type={"file"}
            onChange={handleFileChange}
          />

          <Button
            colorScheme="orange"
            isLoading={isImageUploading}
            onClick={handleOnImageUpload}
            className={`${styles.uploadBtn}`}
          >
            Upload
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        onSubmit={handleOnSubmit}
        className={`${styles.signUpButton}`}
      >
        Sign Up
      </Button>
    </form>
  );
}

export default SignUp;
